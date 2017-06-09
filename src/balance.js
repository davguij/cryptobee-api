const http = require('axios');

function getBalance(request, reply) {
	const btcAddresses = request.payload.btc;
	let allBTCRequests = [];
	let serviceResponse = {};
	btcAddresses.forEach((address) => {
		let request = http.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`)
			.then(response => {
				return {
					address: response.data.address,
					balance: response.data.final_balance
				};
			});
		allBTCRequests.push(request);
	}, this);
	http.all(allBTCRequests).then((addressBalances) => {
		serviceResponse.totalBalance = 0;
		addressBalances.forEach((balanceForAddress) => {
			serviceResponse.totalBalance += balanceForAddress.balance;
		}, this);
		serviceResponse.addresses = addressBalances;
		return reply(serviceResponse);
	});
}

module.exports = { getBalance };