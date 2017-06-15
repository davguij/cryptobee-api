'use strict';

const Hapi = require('hapi');
const balance = require('./balance/balance');
const rates = require('./exchange-rates/exchange-rates')
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
	path: '/balance/{coin}',
	handler: function (request, reply) {
		reply(balance.getBalance(encodeURIComponent(request.params.coin), request.payload.addresses));
	}
});

server.route({
	method: 'GET',
	path: '/rates/{coin}',
	handler: function (request, reply) {
		reply(rates.getRates(encodeURIComponent(request.params.coin)));
	}
})

// Start the server
server.start((err) => {
	if (err) {
		throw err;
	}
	// eslint-disable-next-line no-console
	console.log('Server running at:', server.info.uri);
});
