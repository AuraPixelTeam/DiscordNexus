
export class TextFormat {

    static colors = {
        reset: "\x1b[0m",
        green: "\x1b[38;5;34m",
        white: "\x1b[37m",
        red: "\x1b[31m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        gray: "\x1b[90m"
    };

    static format(text, color) {
        return `${color}${text}${this.colors.reset}`;
    }
}