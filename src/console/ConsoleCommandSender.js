import { DiscordNexus } from "../DiscordNexus.js";
import { TextFormat } from "../utils/TextFormat.js";

export class ConsoleCommandSender {

    nexus;

    /**
     * @param {DiscordNexus} nexus 
     */
    constructor(nexus) {
        this.nexus = nexus;
    }

    getNexus() {
        return this.nexus;
    }

    getName() {
        return "CONSOLE";
    }

    getUsername() {
        return "console";
    }

    /**
     * @param {string} content 
     */
    reply({content}) {
        this.send(content)
    }

    /**
     * @param {string} content 
     */
    send({content}) {
        for (const line of content.trim().split("\n")) {
            console.log(`${TextFormat.format("Command output", TextFormat.colors.green)} | ${TextFormat.format(line, TextFormat.colors.white)}`)
        }
    }
}