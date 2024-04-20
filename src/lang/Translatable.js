
export class Translatable {

    static translate(text, args = []) {
        for (let key in args) {
            const value = args[key];
            text = text.replace(`%${key}`, value);
        }
        return text;
    }
}