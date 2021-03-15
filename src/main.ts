import Gaze from "./Gaze";

const getInputVal = (selector: string) : string => (document.querySelector(selector)! as any).value as string
const genUuid = () : string => Math.random().toString(36).substring(7);

(window as any).main = function() : any {
    return {
        connected: false,
        gaze: null,
        listeners: {},
        
        async init(){
            this.gaze = await new Gaze("http://localhost:8000" , "http://localhost:8001/token.php").connect();

            this.connected = true;
        },

        async subscribe(){

            let topics = getInputVal("#topics");
            topics = JSON.parse(topics);

            let uuid = genUuid();
            this.listeners[uuid] = {
                meta: { topics },
                recieved: []
            };

            this.gaze.on(topics, (payload: any) => {
                this.listeners[uuid].recieved.push(payload);
            });

        },
        async emit(){
            let topic = getInputVal("#emit-topic");
            let payload = JSON.parse(document.querySelector("#emit-payload")!.innerHTML);
            let roles = JSON.parse(getInputVal("#emit-roles"));

            await fetch('http://localhost:8001/emit.php', {
                method: 'POST',
                body: JSON.stringify(
                    { topic, payload, roles }
                )
            });
        }
    }
}