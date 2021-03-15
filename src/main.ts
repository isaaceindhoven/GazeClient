import Gaze from "./Gaze";

(async () => {
    const gaze = await new Gaze("http://localhost:3333" , "http://localhost:8001/token.php").connect();

    let products = [1,2,3];

    let sub = await gaze.on(() => products.map(id => `ProductCreated/${id}`), (payload: any) => {
        console.log(payload);
    });

    products = [2,3,4];
    sub.update();

    products = [10,11,12];
    sub.update();

    products = [22,33,33];
    sub.update();

})();
