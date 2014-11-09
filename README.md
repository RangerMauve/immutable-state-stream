# immutable-state-stream

This module lets you stream changes toa  given state into a stream, and then
have that stream output the current state as an immutable object.

## Installing

```
npm install --save immutable-state-stream
```

## Usage

You can pipe one or more `objectMode` streams into a state stream, and it'll
merge any changes together and output new versions of the state

You can supply an initial state as the first argument, by default it is an empty object.

``` javascript
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
/** Should output
{ load: '10', heat: '20 degrees' }
{ load: '10', heat: '20 degrees', smell: 'bad' }
{ load: '100%', heat: '50 degrees', smell: 'bad', warning: true }
{ load: '30%', heat: '30 degrees', smell: 'good', warning: false }
**/
```
