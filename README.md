# GazeJS

## Example

```js

// setup gaze
let gaze = new Gaze({
    'hubUrl' : 'https://localhost:8000',
    'tokenUrl': '/token.php'
});

// subscribe single selector
gaze.on("ProductCreated", ["id = 1", "name = Shirt"], product => {

});

// subscribe single selector
gaze.on("ProductCreated", [
    {
        'field': 'id',
        'operator': '=',
        'value': 1
    }
], product => {

});

// subscribe many selectors
gaze.on("ProductCreated", [
    "id = 1",
    {
        'field': 'id',
        'operator': '=',
        'value': 1
    }
], product => {

});
```