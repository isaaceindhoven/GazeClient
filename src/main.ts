import Gaze from "./Gaze";

(async () => {
    const gaze = await new Gaze("http://localhost:8000" , "http://localhost:8001/token.php").connect();

    const topics = () => {
        return ['ProductCreated']
    };

    await gaze.on(topics, (payload: any) => {
        console.log(payload);
    });
})();
