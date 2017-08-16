'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

const balance = require('./balance/balance');
const rates = require('./exchange-rates/exchange-rates')
// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
	// host: 'localhost',
	port: process.env.PORT || 8888
});

server.register({
	register: require('hapi-cors'),
	options: {
		origins: ['http://localhost:8080']
	}
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
	},
	config: {
		validate: {
			params: {
				coin: Joi.string().only(['btc', 'ltc', 'eth', 'doge', 'dash'])
			},
			payload: {
				addresses: Joi.array().items(Joi.string().min(34).max(42)).unique()
			}
		}
	}
});

server.route({
	method: 'GET',
	path: '/rates/{coin}',
	handler: function (request, reply) {
		reply(rates.getRates(encodeURIComponent(request.params.coin)));
	},
	config: {
		validate: {
			params: {
				coin: Joi.string().only(['btc', 'ltc', 'eth', 'doge', 'dash'])
			}
		}
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
