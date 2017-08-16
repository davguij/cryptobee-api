const http = require('../common/http');
const axios = require('axios');

function getBalance(coin, addresses) {
	let allReqs = [];
	addresses.forEach((address) => {
		let request = http.get(`https://api.blockcypher.com/v1/${coin}/main/addrs/${address}/balance`)
			.then(data => {
				return {
					address: data.address,
					balance: data.final_balance
				};
			});
		allReqs.push(request);
	}, this);
	return axios.all(allReqs).then((addressBalances) => {
		let balanceResponse = {};
		balanceResponse.totalBalance = 0;
		addressBalances.forEach((balanceForAddress) => {
			// the API returns always the lowest indivisible unit for each coin, but we want whole coins to display
			if (coin === 'eth') {
				balanceResponse.totalBalance += (balanceForAddress.balance / 1000000000000000000);
			} else {
				balanceResponse.totalBalance += (balanceForAddress.balance / 100000000);
			}
		}, this);
		balanceResponse.addresses = addressBalances;
		return balanceResponse;
	});
}

module.exports = { getBalance };