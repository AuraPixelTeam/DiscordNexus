import { BaseInteraction, SlashCommandBuilder, User } from "discord.js";
import { ConsoleCommandSender } from "../console/ConsoleCommandSender.js";
import { DiscordNexus } from "../DiscordNexus.js";

export class Command {

    data;
    nexus;

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
    async execute(sender, interaction, args) {}

    /**
     * @returns {DiscordNexus}
     */
    getNexus() {
        return this.nexus;
    }

    /**
     * @param {DiscordNexus} nexus
     */
    setNexus(nexus) {
        this.nexus = nexus;
    }

    getName() {
        return this.data.name;
    }

    getDescription() {
        return this.data.description;
    }

    toJSON() {
        return this.data.toJSON();
    }
}