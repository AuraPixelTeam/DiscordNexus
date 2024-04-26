import { BaseInteraction, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../Command.js";
import { ConsoleCommandSender } from "../../console/ConsoleCommandSender.js";

export class Ping extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("ping")
            .setDescription("ping command")
        )
    }

    /**
     * Execute the command
     * @param {User|ConsoleCommandSender} sender 
     * @param {BaseInteraction} interaction
     * @param {Object|undefined} args
     */
    execute(sender, interaction, args) {
        if (sender instanceof ConsoleCommandSender) {
            return sender.send({
                content: "This cmd only use in discord!"
            })
        }
        interaction.reply("Pong!")
    }
}