# GazeJS

## Example

```js

let gaze = await new Gaze("<HUB_URL>" , "<TOKEN_URL>").connect();

let products = [1,2,3];

let sub = await gaze.on(() => products.map(id => `ProductCreated/${id}`), payload => {
    console.log(payload);
});

products = [2,3,4];
sub.update();

products = [10,11,12];
sub.update();

products = [22,33,33];
sub.update();

```

## Installation

```js
// JavaScript Import
import GazeJs from "GazeJs";
const GazeJs = require("GazeJs");
```