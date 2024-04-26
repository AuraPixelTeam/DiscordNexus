import readline from "readline";
import { DiscordNexus } from "../DiscordNexus.js";
import { ConsoleCommandSender } from "./ConsoleCommandSender.js";

export class ConsoleReader {

    nexus;
    stdin;

    /**
     * @param {DiscordNexus} nexus 
     */
    constructor(nexus) {
        this.nexus = nexus;
        this.initStdin();
    }

    getNexus() {
        return this.nexus;
    }

    initStdin() {
        this.stdin = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.stdin.on('line', (input) => {
            input = input.trim().split(" ");
            const commandName = input.shift();
            const command = this.getNexus().getCommandMap().getCommand(commandName);

            if (command) {
                command.execute(new ConsoleCommandSender(this.getNexus()), undefined, input);
            }
        });

        this.stdin.on('close', () => {
            this.close();
        });
    }

    close() {
        this.stdin.close();
    }
}