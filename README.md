# GazeClient

## Installation

```
npm install git+ssh://git@gitlab.isaac.local/study/php-chapter/real-time-ui-updates/gazeclient.git#master
```

## Building

```bash
npm install
npm run build # to build
npm run watch # to watch
```

## Example Usecase

```js
const GazeClient = require("GazeClient");

let gaze = await new GazeClient("<HUB_URL>" , "<TOKEN_URL>").connect();

let products = [1,2,3];

let sub = await gaze.on(() => products.map(id => `ProductCreated/${id}`), payload => {
    console.log(payload);
});

setTimeout(() => {
    products = [2,3,4];
    sub.update();
})

```