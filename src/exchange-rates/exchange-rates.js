const http = require('../common/http');

function getRates(currency) {
	return http.get(`https://api.uphold.com/v0/ticker/${currency.toUpperCase()}`)
		.then((rawRates) => {
			let rates = [];
			rawRates.forEach(function (rawRate) {
				let currencyCode = rawRate.pair.replace(currency.toUpperCase(), '');
				let newRate = {
					rate: rawRate.bid,
					currency: currencyCode
				};
				rates.push(newRate);
			}, this);
			return rates;
		});
}

module.exports = { getRates };