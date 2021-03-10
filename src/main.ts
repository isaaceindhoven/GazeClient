import Gaze from "./Gaze";

class Product {
    constructor(public name: string){}
}

(async () => {
    let gaze = await new Gaze("http://localhost:8000/" , "/token.php").connect();

    gaze.on<Product>("ProductCreated", [{
        field : "id",
        operator: "!=",
        value : "A"
    }], product => {
        console.log(product);
    });

})()