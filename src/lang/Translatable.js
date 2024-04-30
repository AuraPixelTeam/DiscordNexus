
export class Translatable {

    text;
    params;
    constructor(text, params) {
        this.text = text;
        this.params = params;
    }

    getText() {
        return this.text;
    }

    getParams() {
        return this.params;
    }
}