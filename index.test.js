const NewsAPI = require("./index.js");
//const NewsAPI = require("newsapi");
const apikey = "aa8e3a704cb44fa2b99d0566d9e36c3d";
const newsapi = new NewsAPI(apikey);
test("apikey", () => {
  //const newsapi = new NewsAPI(apikey);
  expect(apikey).toBe("aa8e3a704cb44fa2b99d0566d9e36c3d");
});

test("check get top headlines ", () => {
  return newsapi.v2
    .topHeadlines({
      sources: [selectedSource],
      language: "en",
      pageSize: 10
    })
    .then(function(result) {
      expect(result.status).toEqual("ok");
    });
});
test("check pick a source option ", () => {
  //expect
});
