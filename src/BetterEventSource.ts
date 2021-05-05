import { SseClient } from './SseClient';

class BetterEventSource implements SseClient {

    onmessage: (data: { data: unknown; }) => unknown;
    onopen: (ev: Event) => unknown;

    constructor(
        private url: string, 
        private headers = {},
        private retryInterval = 2000
    ){
        this.init();
    }

    private async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private init(){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.url);
        let seenBytes = 0; 

        Object.keys(this.headers).forEach(k => {
            xhr.setRequestHeader(k, this.headers[k]);
        });

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 2){
                this.onopen(null);
            }

            if (xhr.readyState == 3) {
                var data = xhr.response.substr(seenBytes);
                seenBytes = xhr.responseText.length;
                this.onmessage({'data' : data.substr(6)});
            }
        };

        xhr.addEventListener('error', async error => {
            await this.sleep(this.retryInterval);
            this.init();
        });

        xhr.send();
    }
}

export { BetterEventSource };
