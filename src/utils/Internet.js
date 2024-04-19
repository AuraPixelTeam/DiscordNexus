
export class Internet {
    
    static async getIP() {
        let ip = await (await this.getURL("http://api.ipify.org/")).text();
        return ip ?? null;
    }

    static async getURL(url) {
        const res = await fetch(url);
        return res;
    }
}