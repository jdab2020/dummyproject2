const db = require("../models");
module.exports = function (app) {
    let search;

    app.get("/", function (req, res) {
        db.Stock.findAll()
            // grab symbols from seed database
            .then(function (result) {
                search = { symbols: result };
                // loop query
                console.log(search);
                let queriesNews = [];
                let queriesStocks = [];
                for (let i = 0; i < search.length; i++) {
                    let queryURL_news = "https://stocknewsapi.com/api/v1?tickers=" + tickers + "&items=10&token=" + process.env.apiKeyStockNews;
                    fetch(queryURL_news)
                        .then((response) => {
                            console.log(response);
                            queriesNews.push(response.json());
                        });
                    let queryURL_stocks = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=" + process.env.apiKeyAlphaVantage1;
                    fetch(queryURL_stocks)
                        .then((response)=>{
                            console.log(response);
                            queriesStocks.push(response.json());
                        })
                }
                return Promise.all(queriesNews,queriesStocks);
            }).then(function (results) {
                console.log(results)
                res.render("index", {search: results})
            });
    });
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