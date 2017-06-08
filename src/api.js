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
		const payload = request.payload;
		http.get('https://api.blockcypher.com/v1/btc/main/addrs/115HrrVServkAJCftWsBMPLb6S3jBAQM7y/balance')
			.then((resp) => {
				return reply(resp.data);
			})
			.catch((err) => {
				return reply(err);
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
