import SerpApi from 'google-search-results-nodejs'
import fs from 'fs'
// const fs = require("fs");
// const SerpApi = require("google-search-results-nodejs");
  const API_KEY = process.env.API_KEY;
  const search = new SerpApi.GoogleSearch("3123940f5057559598689527ddaa958fec30e00c5b98241487c3c6b55e4ccc06");

  const user = "xhHbbOsAAAAJ";

const params = {
  engine: "google_scholar_author", //props.engine google_scholar_profiles or google_scholar_author 
  author_id: user, //props.userScholarID; authorId or authourProfilName
  hl: "en",
  num: "100",
};

const getArticlesFromPage = ({ articles }) => {
    return articles?.map((article) => {
      const { title, link = "link not available", authors, publication, cited_by, year } = article;
      return {
        title,
        link,
        authors,
        publication,
        citedBy: {
          link: cited_by.link,
          cited: cited_by.value,
        },
        year,
      };
    });
  };

  const getScholarAuthorData = function ({ author, articles, cited_by, public_access: publicAccess, co_authors }) {
    const { name, thumbnail: photo, affiliations, website = "website not available", interests } = author;
    const { table, graph } = cited_by;
    return {
      name,
      photo,
      affiliations,
      website,
      interests:
        interests?.map((interest) => {
          const { title, link = "link not available" } = interest;
          return {
            title,
            link,
          };
        }) || "no interests",
      articles: getArticlesFromPage({articles}),
      table: {
        citations: {
          all: table[0].citations.all,
          since2017: table[0].citations.since_2017,
        },
        hIndex: {
          all: table[1].h_index.all,
          since2017: table[1].h_index.since_2017,
        },
        i10Index: {
          all: table[2].i10_index.all,
          since2017: table[2].i10_index.since_2017,
        },
      },
      graph,
      publicAccess,
      coAuthors: co_authors?.map((result) => {
        const { name, link = "link not available", thumbnail: photo, affiliations, email = "no email info", author_id } = result;
        return {
          name,
          link,
          author_id,
          photo,
          affiliations,
          email,
        };
      }),
    };
  };

  const getJson = () => {
    return new Promise((resolve) => {
      search.json(params, resolve);
    })
  }

  const getResults = async () => {
    const json = await getJson(params);
    const scholarAuthorData = getScholarAuthorData(json);
    let nextPage = json.serpapi_pagination?.next;
    if (nextPage) params.start = 0;
    while (nextPage) {
      params.start += 100;
      const json = await getJson(params);
      nextPage = json.serpapi_pagination?.next;
      scholarAuthorData.articles.push(...getArticlesFromPage(json));
    }
    return scholarAuthorData;
  };

  
  getResults().then((result) => {fs.writeFile(`${result.name}.json`, JSON.stringify(result), err => {
	
    // Checking for errors
    if (err) throw err;
  
    console.log("Done writing"); // Success
  })})

  