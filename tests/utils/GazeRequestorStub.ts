class GazeRequestorStub {

    public methodCalls: string[] = [];
    public subscriptionsRequests: SubscribeRequestData[] = [];

    public sseStub = {
        "_onopen" : null,
        "onmessage" : null,
        "onOpenSetCallback" : null,
        set onopen(x) {
            this._onopen = x;
            if (this.onOpenSetCallback) this.onOpenSetCallback();
        },
        get onopen() {
            return this._onopen
        }
    };

    public async getToken(): Promise<void> {

    }

    public async ping(): Promise<void>{
        this.methodCalls.push('ping');
    }

    public connect(){
        return this.sseStub;
    }

    public async subscibe(data: SubscribeRequestData): Promise<void>{
        this.subscriptionsRequests.push(data);
    }

    public async unsubscibe(data: SubscribeRequestData): Promise<void>{
        
    }
}

export { GazeRequestorStub };