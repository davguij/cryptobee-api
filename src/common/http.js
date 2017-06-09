const axios = require('axios');

function get(url) {
	return axios.get(url);
}

module.exports = {
	get
}