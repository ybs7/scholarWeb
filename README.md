# Scholarea
* Web App Graduation Project


## Group Members
| Name  | Student ID |
| ------------- | ------------- |
|Ahmet Musa Çatak|18290088|
|Yahya Baturay Saraçoğlu|18290121|

## Require applications to run:
* Node Js Version: v18.16.0
* PostgreSQL Version: PostgreSQL 15.2, compiled by Visual C++ build 1914, 64-bit
* npm Version: 9.5.1
* Dependencies
	* React
	* ...

### Front-End Setup
* Console Directory : `scholarea-master/front`  In this directory you have to open terminal.
* npm install dependecyName@dependencyVersion
* Example: `npm install @headlessui/react@1.7.14`
```
"dependencies": {
    "@headlessui/react": "^1.7.14",
    "@heroicons/react": "^2.0.18",
    "@material-tailwind/react": "^2.0.1",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "autoprefixer": "^10.4.14",
    "axios": "^1.4.0",
    "bootstrap": "^5.3.0",
    "google-search-results-nodejs": "^2.1.0",
    "https-browserify": "^1.0.0",
    "mdb-react-ui-kit": "^6.1.0",
    "postcss": "^8.4.23",
    "querystring-es3": "^0.2.1",
    "react": "^18.2.0",
    "react-bootstrap": "^2.7.4",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.11.2",
    "react-scripts": "^5.0.1",
    "tailwindcss": "^3.3.2",
    "web-vitals": "^2.1.4"
  }
```

### Back-End Setup
* Console Directory : `scholarea-master/back` In this directory you have to open terminal.
* `npm install dependecyName@dependencyVersion`
* Example: `npm install @headlessui/react@1.7.14`
```
"dependencies": {
    "axios": "^1.4.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "google-search-results-nodejs": "^2.1.0",
    "nodemon": "^2.0.22",
    "papaparse": "^5.4.1",
    "pg": "^8.11.0",
    "serpapi": "^1.1.1",
    "uuid": "^9.0.0"
  }
```

### PostgreSQL Settings
* PostgreSQL version : `PostgreSQL 15.2, compiled by Visual C++ build 1914, 64-bit`

#### .env File
`DB_CONNECTION_STRING = "postgresql://postgres:1071@localhost:5432/scholar"`
`PORT = 9999`
`API_KEY = "3123940f5057559598689527ddaa958fec30e00c5b98241487c3c6b55e4ccc06"`


#### Database Table Queries
```
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
-- New table
CREATE TABLE profiles(
	name text,
	link text,
	serpapi_link text,
	cited_by integer,
	affilations text,
	email text,
	author_id text,
	thumbnail text,
	PRIMARY KEY(author_id),
	CONSTRAINT fk_author FOREIGN KEY(author_id) REFERENCES authors(author_id)

)
CREATE TABLE users_auth(
	uesr_id text,
	user_email text,
	user_password text,
	user_token text DEFAULT 'standart',
	PRIMARY KEY(user_id),

)
```

## RUN
* Console Directory : `scholarea-master/front`  In this directory you have to open terminal.
* Enter this command : `npm start`

* Console Directory : `scholarea-master/back`  In this directory you have to open terminal.
* Enter this command : `npm start`
