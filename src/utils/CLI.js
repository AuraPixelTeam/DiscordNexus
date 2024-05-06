

export class CLI {

    static setTerminalTitle(text) {
        process.stdout.write(
            String.fromCharCode(27) + "]0;" + text + String.fromCharCode(7)
          );
    }
}