(function Ticker(symbols) {
    const exampleStocks = ['APPL', 'AGFS', 'FB', 'F', 'CRON', 'ACB', 'DIS'];
    const stocks = [];
    const apiBaseUrl = 'https://api.iextrading.com/1.0/stock/';
    const apiTypeDef = '/chart/1m';

    function init() {
        stocks = stocks ? stocks : exampleStocks;
        fetchStockValues(stocks);
    }

    function fetchStockValues(symbols) {
        const promises = [];
        symbols.forEach((value) => {
            var promise = new Promise((resolve, reject) => {
                fetch(apiBaseUrl + value + apiTypeDef)
                .then((resp) => {
                    resolve(resp.json());
                })
                .catch((error) => {
                    reject(error);
                });
            });
            promises.push(promise);
        });
        return promises;
    }

    function setupStockObjects(promises) {
        return Promise.all(promises).then((values) => {

        });
    }
})();