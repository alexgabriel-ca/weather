const yargs = require("yargs");
const axios = require("axios");
const argv = yargs
	   .options({
		   a: {
			   demand: true,
			   alias: "address",
			   describe: "Enter an address",
			   string: true
		   }
	   })
	   .help()
	   .alias("help", "h")
	   .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geoCodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=dRJAA6WB2fOZpkdtdbFw6TeQChE2F23x&location=${encodedAddress}`;

axios.get(geoCodeURL).then((response) => {
	if (response.data.info.statuscode === 0) {
		var latitude = response.data.results[0].locations[0].latLng.lat;
		var longitude = response.data.results[0].locations[0].latLng.lng;
		console.log(`Your latitude and longitude are ${latitude}, ${longitude}`);
		var weatherURL = `https://api.forecast.io/forecast/5f8d0e6ecb635a4e8bfbdc01b27105bf/${latitude},${longitude}?units=si`;

		return axios.get(weatherURL);
	} else {
		throw new Error("Cannot connect to the server.  Please try again.");
	}
}).then((response) => {
	//console.log(`Your latitude and longitude is ${latitude}, ${longitude}`);	
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	var precipitation = response.data.currently.precipProbability;
	var conditions = response.data.currently.summary;
	var windSpeed = response.data.currently.windSpeed;
	var windGusts = response.data.currently.windGust;
	console.log(`The temperature is ${temperature}, but it feels like ${apparentTemperature}.  We have ${conditions} conditions right now with wind speed expected at ${windSpeed} km/h and gusts up to ${windGusts} km/h.  There is a ${precipitation}% chance of precipitation.`);
}).catch((e) => {
	console.log(e.message);
});