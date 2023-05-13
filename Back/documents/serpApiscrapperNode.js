import SerpApi from 'google-search-results-nodejs'
const search = new SerpApi.GoogleSearch("3123940f5057559598689527ddaa958fec30e00c5b98241487c3c6b55e4ccc06");

const params = {
    engine: "google_scholar_author",
    author_id: "xhHbbOsAAAAJ",
    hl: "en"
};

const callback = function(data) {
    console.log(data);
};

// Show result as JSON
search.json(params, callback);



const scrapeGoogleScholarAuthorProfiles = async () => {
    const val1 = parseInt(prompt("enter 1 for authorName or enter 2 for authorid"));

    let str1 = "";
    let str2 = "";

    if (val1 === 1) {
        str1 = "mauthors";
    } else {
        str1 = "author_id";
    }

    str2 = prompt("a");

    const params = {
        engine: "google_scholar_profiles",
        hl: "en",
    }

    if (val1 === 1) {
        params.mauthors = str2;
    } else {
        params.author_id = "xhHbbOsAAAAJ&hl";
    }

    const search = new serpApi.GoogleSearch(params);
    const results = await search.getJson();

    const authorProfilesData = {
        search_data: {},
        profiles: []
    }

    authorProfilesData.search_data[str1] = results.search_parameters[str1];

    while (true) {
        const results = await search.getJson();

        for (const profile of results.profiles) {
            console.log(`Extracting profile: ${profile.name}`);

            authorProfilesData.profiles.push({
                name: profile.name,
                link: profile.link,
                author_id: profile.author_id,
                affiliations: profile.affiliations,
                email: profile.email,
                cited_by: profile.cited_by,
                interests: profile.interests
            });
        }

        if (results.serpapi_pagination && results.serpapi_pagination.next) {
            search.params_dict = querystring.parse(new URL(results.serpapi_pagination.next).search);
        } else {
            break;
        }
    }

    console.log(JSON.stringify(authorProfilesData, null, 2));
    console.log(`Done. Extracted ${authorProfilesData.profiles.length - 1} profiles.`);

    // masatoshi_nei_author_articles.csv
    fs.writeFileSync(`${authorProfilesData.search_data.mauthors.toLowerCase().replace(' ', '_')}_author_profiles_new.csv`,
        JSON.stringify(authorProfilesData.profiles), 'utf-8'
    );

    return authorProfilesData;
}

scrapeGoogleScholarAuthorProfiles();