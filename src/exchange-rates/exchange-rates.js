const http = require('../common/http');

function getRates(currency) {
	if (currency === 'btc' || currency === 'ltc' || currency === 'eth') {
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
	} else {
		return http.get(`https://api.cryptonator.com/api/ticker/${currency}-usd`).then((rate) => {
			return [{
				rate: rate.ticker.price,
				currency: 'USD'
			}];
		});
	}
}

module.exports = { getRates };