
export class TextFormat {

    static colors = {
        reset: "\x1b[0m",
        green: "\x1b[32m",
        white: "\x1b[37m"
    };

    static format(text, color) {
        return `${color}${text}${this.colors.reset}`;
    }
}