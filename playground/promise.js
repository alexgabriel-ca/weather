var asyncAdd = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (typeof (a) === "number" && typeof (b) === "number") {
				resolve(a + b);
			} else {
				reject("Please provide two numbers to add");
			}
		}, 1500)
	});
};

asyncAdd(5, 7).then((res) => {
	console.log("Result: ", res);
	return asyncAdd(res, 33);
}).then((res) => {
	console.log("Result: ", res);
}).catch((errorMessage) => {
	console.log(errorMessage);
});

//var somePromise = new Promise((resolve, reject) => {
//	/* Promises can either be resolved (successful) or rejected (unsuccessful)
//	 * Until a promise is resolved, it's considered pending. */
//	/*Call setTimeout with two args: Function to execute after delay, and delay*/
//	setTimeout(() => {
//		/* Resolve is only triggered when successful. */
//		resolve("Hey. It worked!");
//		/* Reject is only triggered when unsuccessful. */
//		reject("Sorry dude, couldn't get this done.");
//	}, 2500);
//});
//
//somePromise.then((message) => {
//	/* This function executes only on success.  Message is passed by the resolve function. */
//	console.log("Success: ", message);
//}, (errorMessage) => {
//	/* This function executes only on failure.  errorMessage is passed by the reject function. */
//	console.log("Error: ", errorMessage);
//});