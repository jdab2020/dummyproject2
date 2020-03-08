const db = require("../models");
const fetch = require('node-fetch');

module.exports = function (app) {
    let queriesNews = [];
    let queriesStocks = [];
    let newsResults=[];
    let stocksResults=[];

    app.get("/", function (req, res) {
        db.Stock.findAll()
            // grab symbols from seed database
            .then(function (result) {
                for (let i = 0; i < result.length; i++) {

                    let queryURL_news = "https://stocknewsapi.com/api/v1?tickers=" + result[i].dataValues.symbol.toUpperCase() + "&items=3&token=" + process.env.apiKeyStockNews;
                    queriesNews.push(fetch(queryURL_news));
                    let queryURL_stocks = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + result[i].dataValues.symbol.toUpperCase() + "&apikey=" + process.env.apiKeyAlphaVantage1;
                    queriesStocks.push(fetch(queryURL_stocks));
                }

                return Promise.all(queriesNews);
            })
            .then(results => {
                results.forEach(result => {
                    result.json().then(json => {
                        newsResults.push(json);
                    })
                })
                return Promise.all(queriesStocks)
            })
            .then(results => {
                results.forEach(result => {
                    result.json().then(json => stocksResults.push(json))
                })               
            })
            .catch((err) => { if (err) throw err });
       
        let hbs = {
            stocks: stocksResults,
            news: newsResults
        }

        console.log(hbs);
        
        res.render("index",hbs);


    });
    // posting into database works
    app.post("/api/symbols", function (req, res) {
        db.Stock.create({
            symbol: req.body.symbol
        })
            .then(function (result) {
                res.json(true);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
}