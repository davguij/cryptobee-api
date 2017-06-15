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
	}
};

const ratesMock = [
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

function get(url) {
	return new Promise((resolve) => {
		process.nextTick(() => {
			if (url.includes("115HrrVServkAJCftWsBMPLb6S3jBAQM7y")) {
				return resolve(balanceMock["115HrrVServkAJCftWsBMPLb6S3jBAQM7y"]);
			} else if (url.includes("1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX")) {
				return resolve(balanceMock["1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX"]);
			} else if (url.includes('/ticker/')) {
				return resolve(ratesMock);
			}
		})
	});
}

module.exports = {
	get
}