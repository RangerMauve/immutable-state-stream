var Immutable = require("seamless-immutable");
var Transform = require("stream").Transform;

module.exports = StateStream;

function StateStream(state) {
	// Ensure that an initial state is defined
	state = state || {};
	// Convert the state into an immutable object
	state = Immutable(state);

	var stream = new Transform({
		objectMode: true
	});

	stream._transform = function (data, encoding, callback) {
		state = state.merge(data);
		callback(null, state);
	}

	stream._flush = function (callback) {
		callback();
	}

	return stream
}
