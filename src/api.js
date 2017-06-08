'use strict';

const Hapi = require('hapi');
const http = require('axios');
const httpConfig = {
	timeout: 1000
}

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

async function getBalance(coins) {
	let r;
	try {
		r = await http.get('https://api.blockcypher.com/v1/btc/main/addrs/115HrrVServkAJCftWsBMPLb6S3jBAQM7y/balance', httpConfig);
	} catch (err) {
		console.log('Error!');
		console.log(err);
		r = err;
	}
	return await r;
}

server.route({
	method: 'POST',
	path: '/balance',
	handler: async function (request, reply) {
		const payload = request.payload;
		let serviceResp = await getBalance(payload);
		return reply(serviceResp);
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
