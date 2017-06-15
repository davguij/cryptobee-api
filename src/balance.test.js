jest.mock('./common/http');

const balance = require('./balance');

test('gets BTC balance from one address', () => {
	const request = {
		"payload": {
			"addresses": [
				"115HrrVServkAJCftWsBMPLb6S3jBAQM7y"
			]
		}
	};

	const expected = {
		totalBalance: 100000,
		addresses:
		[{
			address: '115HrrVServkAJCftWsBMPLb6S3jBAQM7y',
			balance: 100000
		}]
	};

	return expect(balance.getBalance('btc', request.payload.addresses)).resolves.toEqual(expected);
});

test('gets BTC balance from several addresses', () => {
	const request = {
		"payload": {
			"addresses": [
				"115HrrVServkAJCftWsBMPLb6S3jBAQM7y",
				"1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX"
			]
		}
	};
	const expected = {
		"totalBalance": 1736917974,
		"addresses": [
			{
				"address": "115HrrVServkAJCftWsBMPLb6S3jBAQM7y",
				"balance": 100000
			},
			{
				"address": "1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX",
				"balance": 1736817974
			}
		]
	};

	return expect(balance.getBalance('btc', request.payload.addresses)).resolves.toEqual(expected);
})