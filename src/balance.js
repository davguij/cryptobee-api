const http = require('./common/http');
const axios = require('axios');

function getBalance(request) {
	const btcAddresses = request.payload.btc;
	let allBTCRequests = [];
	btcAddresses.forEach((address) => {
		let request = http.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`)
			.then(data => {
				return {
					address: data.address,
					balance: data.final_balance
				};
			});
		allBTCRequests.push(request);
	}, this);
	return axios.all(allBTCRequests).then((addressBalances) => {
		let serviceResponse = {};
		serviceResponse.totalBalance = 0;
		addressBalances.forEach((balanceForAddress) => {
			serviceResponse.totalBalance += balanceForAddress.balance;
		}, this);
		serviceResponse.addresses = addressBalances;
		return serviceResponse;
	});
}

module.exports = { getBalance };