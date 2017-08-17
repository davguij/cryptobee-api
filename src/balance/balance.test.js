jest.mock('../common/http');

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
		totalBalance: 0.001,
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
		"totalBalance": 17.36917974,
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
});

test('gets ETH balance in the proper format', () => {
	const request = {
		"payload": {
			"addresses": [
				"0x738d145fAAbb1E00Cf5A017588A9C0F998318012"
			]
		}
	};
	const expected = {
		totalBalance: 1,
		addresses:
		[{
			address: '0x738d145fAAbb1E00Cf5A017588A9C0F998318012',
			balance: 1000000000000000000
		}]
	};
	return expect(balance.getBalance('eth', request.payload.addresses)).resolves.toEqual(expected);	
});