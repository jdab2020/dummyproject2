const db = require("../models");
const fetch = require('node-fetch');

module.exports = function (app) {
    let search;

    app.get("/", function (req, res) {
        db.Stock.findAll()
            // grab symbols from seed database
            .then(function (result) {
                search = { symbols: result };
                // loop query
                // console.log(search, "get from database ==================");
                // console.log(result, "result ===========");
                // console.log(search.symbols.length, "search.symbols.length =====================");
                // console.log(result.length, "result.length ===============");
                let queriesNews = [];
                let queriesStocks = [];
                // console.log(result[0], "result[0]=================");
                // console.log(result[0].dataValues.symbol,"result[0].dataValues.symbol==============")

                for (let i = 0; i < result.length; i++) {
                    
                    let queryURL_news = "https://stocknewsapi.com/api/v1?tickers=" + result[i].dataValues.symbol.toUpperCase() + "&items=10&token=" + process.env.apiKeyStockNews;
                    queriesNews.push(fetch(queryURL_news));
                    let queryURL_stocks = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + result[i].dataValues.symbol.toUpperCase() + "&apikey=" + process.env.apiKeyAlphaVantage1;
                    queriesStocks.push(fetch(queryURL_stocks));
                }

                return Promise.all( queriesNews,queriesStocks );
                // return Promise.all(queriesNews);
                // return Promise.all(queriesStocks);


            }).then(results => { 
                results.forEach(result => {
                    result.json().then(json=> console.log(json))
                })

                // console.log(results)

                // results.forEach(result => {
                //     result.forEach(res => {
                //         // res.json().then(json => console.log(json))
                //         console.log(res.json(),"res=============")
                //     })
                // })
            }).catch((err) => { if (err) throw err });
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