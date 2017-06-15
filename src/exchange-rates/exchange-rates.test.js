jest.mock('../common/http');
const exchangeRates = require('./exchange-rates');

test('gets exchange rates for BTC', () => {
	const expected = [
		{
			"rate": "0.0001227",
			"currency": "AED"
		},
		{
			"rate": "0.00002828",
			"currency": "ARS"
		},
		{
			"rate": "0.00034183",
			"currency": "AUD"
		}
	];

	return expect(exchangeRates.getRates('btc')).resolves.toEqual(expected);
})