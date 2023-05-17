CREATE TABLE authors(
	author_id text,
	author_name text,
	author_affiliations text,
	author_email text,
	author_website text,
	author_thumbnail text,
	PRIMARY KEY(author_id)

)
CREATE TABLE author_interest(
	author_interest_id text,
	interest_title text,
	interest_link text,
	interest_serpapi_link text,
	author_id text,
	PRIMARY KEY(author_interest_id),
	CONSTRAINT fk_author FOREIGN KEY(author_id) REFERENCES authors(author_id)

)

CREATE TABLE author_articles(
	author_article_id text,
	article_title text,
	article_link text,
	article_citation_id text,
	article_authors text,
	article_publication text,
	article_year integer,
	author_id text,
	PRIMARY KEY (author_article_id),
	CONSTRAINT fk_author FOREIGN KEY(author_id) REFERENCES authors(author_id)
	
	
)

CREATE TABLE article_cited_by(
	article_cited_by_id text,
	cited_by_value integer,
	cited_by_link text,
	cited_by_serpapi_link text,
	cited_by_cites_id text,
	author_article_id text,
	PRIMARY KEY(article_cited_by_id),
	CONSTRAINT fk_author_article FOREIGN KEY(author_article_id) REFERENCES author_articles(author_article_id)
)
-- New table
CREATE TABLE coAuthors(
	coAuthors_name text,
	coAuthors_link text,
	coAuthors_id text,
	coAuthors_photo text,
	coAuthors_affilations text,
	coAuthors_email text,
	author_id text,
	PRIMARY KEY(coAuthors_id),
	CONSTRAINT fk_author FOREIGN KEY(author_id) REFERENCES authors(author_id)

)