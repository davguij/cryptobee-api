const balanceMock = {
	"115HrrVServkAJCftWsBMPLb6S3jBAQM7y": {
		"address": "115HrrVServkAJCftWsBMPLb6S3jBAQM7y",
		"total_received": 359280,
		"total_sent": 259280,
		"balance": 100000,
		"unconfirmed_balance": 0,
		"final_balance": 100000,
		"n_tx": 5,
		"unconfirmed_n_tx": 0,
		"final_n_tx": 5
	},
	"1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX": {
		"address": "1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX",
		"total_received": 2967617317974,
		"total_sent": 2965880500000,
		"balance": 1736817974,
		"unconfirmed_balance": 0,
		"final_balance": 1736817974,
		"n_tx": 1123,
		"unconfirmed_n_tx": 0,
		"final_n_tx": 1123
	},
	"0x738d145fAAbb1E00Cf5A017588A9C0F998318012": {
		"address": "0x738d145fAAbb1E00Cf5A017588A9C0F998318012",
		"total_received": 359280,
		"total_sent": 259280,
		"balance": 1000000000000000000,
		"unconfirmed_balance": 0,
		"final_balance": 1000000000000000000,
		"n_tx": 5,
		"unconfirmed_n_tx": 0,
		"final_n_tx": 5
	}
};

const btcRatesMock = [
	{
		"ask": "0.00012294",
		"bid": "0.0001227",
		"currency": "BTC",
		"pair": "AEDBTC"
	},
	{
		"ask": "0.00002833",
		"bid": "0.00002828",
		"currency": "BTC",
		"pair": "ARSBTC"
	},
	{
		"ask": "0.00034244",
		"bid": "0.00034183",
		"currency": "BTC",
		"pair": "AUDBTC"
	}
];

const dogeRatesMock = {
	"ticker": {
		"base": "DOGE", "target": "USD", "price": "0.00165559", "volume": "19439537.99648000", "change": "0.00002365"
	},
	"timestamp": 1502980921, "success": true, "error": ""
};

function get(url) {
	return new Promise((resolve) => {
		process.nextTick(() => {
			if (url.includes("115HrrVServkAJCftWsBMPLb6S3jBAQM7y")) {
				return resolve(balanceMock["115HrrVServkAJCftWsBMPLb6S3jBAQM7y"]);
			} else if (url.includes("1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX")) {
				return resolve(balanceMock["1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX"]);
			} else if (url.includes("0x738d145fAAbb1E00Cf5A017588A9C0F998318012")) {
				return resolve(balanceMock["0x738d145fAAbb1E00Cf5A017588A9C0F998318012"]);
			} else if (url.includes('/ticker/BTC')) {
				return resolve(btcRatesMock);
			} else if (url.includes('/ticker/doge-usd')) {
				return resolve(dogeRatesMock);
			}
		})
	});
}

module.exports = {
	get
}