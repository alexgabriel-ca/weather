const request = require("request");

var getWeather = (latitude, longitude, callback) => {
	request({
		url: `https://api.forecast.io/forecast/5f8d0e6ecb635a4e8bfbdc01b27105bf/${latitude},${longitude}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback("Unable to connect to the weather server.");
		} else if (response.statusCode === 400) {
			callback("Unable to connect to the weather server.");
		} else if (response.statusCode === 200) {
			callback(undefined, {
				temperature: body.currently.temperature,
				apparentTemp: body.currently.apparentTemperature
			})
		}
	});
};
module.exports.getWeather = getWeather;