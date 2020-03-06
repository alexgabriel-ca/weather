const request = require("request");
var geoCodeAddress = (address) => {
	return new Promise((resolve, reject) => {
		var encodedAddress = encodeURI(address);
		request({
			//Send query to MapQuest API
			url: `http://www.mapquestapi.com/geocoding/v1/address?key=dRJAA6WB2fOZpkdtdbFw6TeQChE2F23x&location=${encodedAddress}`,
			json: true
		}, (error, response, body) => {
			if (error) {
				reject("Cannot connect to the MapQuest server.  Please try again later.");
			} else {
				//Check for valida response from MapQuest by checking whether latitude and longitude have values.
				if (body.results[0].locations[0].latLng.lat !== "" && body.results[0].locations[0].latLng.lng !== "") {
					resolve({
						address: body.results[0].locations[0].street,
						city: body.results[0].locations[0].adminArea5,
						province: body.results[0].locations[0].adminArea3,
						country: body.results[0].locations[0].adminArea1,
						latitude: body.results[0].locations[0].latLng.lat,
						longitude: body.results[0].locations[0].latLng.lng
					});
				} else {
					reject("Invalid address information provided.  Check your input and try again.");
				}
			}
		}, 0);
	});
};

geoCodeAddress("19146").then((location) => {
	console.log(JSON.stringify(location, undefined, 5));
}, (errorMessage) => {
	console.log(errorMessage);
});