var StateStream = require("../");
var StreamArray = require("stream-array");
var stdout = require("stdout")();

var array = [{
	load: "10",
	heat: "20 degrees"
}, {
	smell: "bad"
}, {
	load: "100%",
	heat: "50 degrees",
	warning: true
}, {
	load: "30%",
	heat: "30 degrees",
	warning: false,
	smell: "good"
}]

var state = StateStream();
var input = StreamArray(array);

input.pipe(state).pipe(stdout);
