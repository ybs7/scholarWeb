from serpapi import GoogleSearch
from urllib.parse import urlsplit, parse_qsl
import pandas as pd
import os, json
from json import JSONEncoder
from uuid import UUID
import uuid

JSONEncoder_olddefault = JSONEncoder.default
def JSONEncoder_newdefault(self, o):
    if isinstance(o, UUID): return str(o)
    return JSONEncoder_olddefault(self, o)
JSONEncoder.default = JSONEncoder_newdefault

def scrape_google_scholar_author():
    from serpapi import GoogleSearch

    params = {
        "api_key": "3123940f5057559598689527ddaa958fec30e00c5b98241487c3c6b55e4ccc06",
        "engine": "google_scholar_author",
        "hl": "en",
        "author_id": "xhHbbOsAAAAJ&hl"
    }

    search = GoogleSearch(params)
    results = search.get_dict()

    author_results_data = {
        "author_data": {},
        "author_articles": []
    }

    author_results_data["author_data"]["name"] = results.get("author").get("name")
    author_results_data["author_data"]["email"] = results.get("author").get("email")
    author_results_data["author_data"]["website"] = results.get("author").get("website")
    author_results_data["author_data"]["interests"] = results.get("author").get("interests")
    author_results_data["author_data"]["affiliations"] = results.get("author").get("affiliations")
    author_results_data["author_data"]["thumbnail"] = results.get("author").get("thumbnail")

    author_results_data["author_data"]["cited_by_table"] = results.get("cited_by", {}).get("table")
    author_results_data["author_data"]["cited_by_graph"] = results.get("cited_by", {}).get("graph")

    author_results_data["author_data"]["public_access_link"] = results.get("public_access", {}).get("link")
    author_results_data["author_data"]["public_access_available"] = results.get("public_access", {}).get("available")
    author_results_data["author_data"]["public_access_not_available"] = results.get("public_access", {}).get("not_available")
    author_results_data["author_data"]["co_authors"] = results.get("co_authors")

    
    # extracting all author articles
    while True:
        results = search.get_dict()

        for article in results.get("articles", []):

            print(f"Extracting article: {article.get('title')} ")            
            author_results_data["author_articles"].append({
                "article_id": uuid.uuid4(),
                "article_title": article.get("title"),
                "article_link": article.get("link"),
                "article_citation_id": article.get("citation_id"),
                "article_authors": article.get("authors"),
                # "article_publication": article.get("publication"),
                # "article_cited_by_value": article.get("cited_by", {}).get("value"),
                # "article_cited_by_link": article.get("cited_by", {}).get("link"),
                # "article_cited_by_cites_id": article.get("cited_by", {}).get("cites_id"),
                "article_year": int(article.get("year")),
                "author_id": params["author_id"]

            })

        if "next" in results.get("serpapi_pagination", []):
            search.params_dict.update(dict(parse_qsl(urlsplit(results.get("serpapi_pagination").get("next")).query)))
        else:
            break

    print(json.dumps(author_results_data, indent=2, ensure_ascii=False))
    print(f"Done. Extracted {len(author_results_data['author_articles'])-1} articles.") # counts extra empty line, that's why -1.

    # masatoshi_nei_author_articles.csv
    pd.DataFrame(data=author_results_data["author_articles"]).to_csv(
        f"{author_results_data['author_data']['name'].lower().replace(' ', '_')}_author_articles.csv",
        encoding="utf-8"
    )

    return author_results_data


scrape_google_scholar_author()