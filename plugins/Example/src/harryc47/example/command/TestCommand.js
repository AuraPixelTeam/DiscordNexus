import { BaseInteraction, SlashCommandBuilder, User } from "discord.js"
import { Command } from "../../../../../../src/command/Command.js"
import { ConsoleCommandSender } from "../../../../../../src/console/ConsoleCommandSender.js"

export class TestCommand extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("test")
            .setDescription("test command")
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
            return sender.send("This cmd only use in discord!")
        }
        interaction.reply("Test!")
    }
}