import { BaseInteraction, SlashCommandBuilder, User } from "discord.js";
import { ConsoleCommandSender } from "../console/ConsoleCommandSender.js";

export class Command {

    data;

    /**
     * @param {SlashCommandBuilder} options 
     */
    constructor(options) {
        if (!options instanceof SlashCommandBuilder) {
            throw new Error("Options must be SlashCommandBuilder!")
        }

        this.data = options;
    }

    /**
     * Execute the command
     * @param {User|ConsoleCommandSender} sender 
     * @param {BaseInteraction|undefined} interaction
     * @param {Object|undefined} args
     */
    execute(sender, interaction, args) {}

    getName() {
        return this.data.name;
    }

    getDescription() {
        return this.data.description;
    }
}