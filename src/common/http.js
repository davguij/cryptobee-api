const axios = require('axios');

function get(url) {
	return axios.get(url).then((response) => response.data);
}

module.exports = {
	get
}