const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("3123940f5057559598689527ddaa958fec30e00c5b98241487c3c6b55e4ccc06");

const params = {
  engine: "google_scholar_author",
  hl: "en",
  author_id: "EicYvbwAAAAJ"
};

const callback = function(data) {
  console.log(data);
};

// Show result as JSON
search.json(params, callback);