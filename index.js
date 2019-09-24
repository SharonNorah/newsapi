//requiring some dependencies
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

//newsapi
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("aa8e3a704cb44fa2b99d0566d9e36c3d");

//requiring the files in lib
const files = require("./lib/files");

//clear the screen and then display a banner
clear();
console.log(chalk.blue(figlet.textSync("NEWS", { horizontalLayout: "full" })));

//synchronous readline
var readlineSync = require("readline-sync");

//prompting userinput
var standard_input = process.stdin;

//set character encoding to avoid changing it tostring()
standard_input.setEncoding("utf-8");

console.log(
  "\x1b[32m",
  "Enter 1 to see the sources and Enter 2 to get the  top headlines\n"
);
standard_input.on("data", function(data) {
  //get titles from articles
  function listarticles(prods) {
    let articlesarray = [];

    for (let i = 0; i < prods.length; i += 1) {
      //push item with color
      articlesarray.push("\x1b[36m", i + 1 + "." + prods[i].title);
      articlesarray.push("\x1b[37m", prods[i].description);
      articlesarray.push("\x1b[32m", prods[i].url);
    }
    return articlesarray.join("\r\n"); //each item on a new line
  }
  //get source names
  function listsources(prods) {
    let source_names = [];

    for (let i = 0; i < prods.length; i += 1) {
      source_names.push("\x1b[36m", "Source: " + prods[i].name);
      source_names.push("\x1b[37m", prods[i].description);
      source_names.push("\x1b[32m", prods[i].url);
    }
    return source_names.join("\r\n");
  }
  //to querry sources
  if (data == 1) {
    newsapi.v2
      .sources({
        category: "technology",
        language: "en",
        country: "us"
      })
      .then(function(result) {
        if (result.totalResults != 0) {
          console.log(listsources(result.sources));
          process.exit();
        } else {
          console.log("\x1b[32m", "No results found");
        }
      })
      .catch(function(error) {
        console.log("\x1b[42m", error);
      });
  } else if (data == 2) {
    let newsSource, selectedSource;
    console.log("\x1b[32m", "Top Headlines");
    newsSource = readlineSync.question(
      "\nSelect your preferred news source from the following options\na: ars-technica\nb: crypto-coins-news\nc: hacker-news\nd: the-next-web\n"
    );
    if (newsSource === "a") {
      selectedSource = "ars-technica";
    } else if (newsSource === "b") {
      selectedSource = "crypto-coins-news";
    } else if (newsSource === "c") {
      selectedSource = "hacker-news";
    } else if (newsSource == "d") {
      selectedSource = "the-next-web";
    } else {
      console.log(
        "\x1b[32m",
        "Invalid input! Enter a lowercase letter from a to d\n"
      );
      process.exit();
    }
    //To query /v2/top-headlines
    newsapi.v2
      .topHeadlines({
        sources: [selectedSource],
        language: "en",
        pageSize: 10
      })
      .then(function(result) {
        if (result.totalResults != 0) {
          console.log(listarticles(result.articles));
        } else {
          console.log("\x1b[32m", "invalid input, or try again");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    console.log("\x1b[32m", "Invalid input! Please choose between 1 and 2\n");
    process.exit();
  }
});
