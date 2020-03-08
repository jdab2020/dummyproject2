const db = require("../models");
module.exports = function (app) {
    let search;

    app.get("/", function (req, res) {
        db.Stock.findAll()
            // grab symbols from seed database
            .then(function (result) {
                search = { symbols: result };
                // loop query
                console.log(search, "get from database ==================");
                console.log(search.symbols.length, "search.symbols.length =====================")
                console.log(search.symbols.Stock, "search.symbols.stock ===============")
                let queriesNews = [];
                let queriesStocks = [];

                for (let symbols in search) (element => {
                    console.log(this.dataValues.symbol, "this.dataValues.symbol ===========")
                    let queryURL_news = "https://stocknewsapi.com/api/v1?tickers=" + this.dataValues.symbol + "&items=10&token=" + process.env.apiKeyStockNews;
                    fetch(queryURL_news)
                        .then((response) => {
                            console.log(response, "response news ===================");
                            queriesNews.push(response.json());
                        });
                    let queryURL_stocks = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + this.dataValues.symbol + "&apikey=" + process.env.apiKeyAlphaVantage1;
                    fetch(queryURL_stocks)
                        .then((response) => {
                            console.log(response, "response stocks ====================");
                            queriesStocks.push(response.json());
                        })
                })



                return Promise.all(queriesNews, queriesStocks);
            }).then(function (results) {
                console.log(results, "results =============")
                let search = { search: results }
                console.log(search, "search ==================")
                res.render("index", search)
            });
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