'use strict';

const Hapi = require('hapi');
const http = require('axios');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
	// host: 'localhost',
	port: process.env.PORT || 8888
});

// Add the route
server.route({
	method: 'GET',
	path: '/hello',
	handler: function (request, reply) {
		return reply({ msg: 'hello world!' });
	}
});

server.route({
	method: 'POST',
	path: '/balance',
	handler: function (request, reply) {
		const btcAddresses = request.payload.btc;
		let allBTCRequests = [];
		btcAddresses.forEach((address) => {
			let request = http.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`);
			allBTCRequests.push(request);
		}, this);
		http.all(allBTCRequests).then((results) => {
			return reply(results);
		});
	}
});

// Start the server
server.start((err) => {
	if (err) {
		throw err;
	}
	// eslint-disable-next-line no-console
	console.log('Server running at:', server.info.uri);
});
