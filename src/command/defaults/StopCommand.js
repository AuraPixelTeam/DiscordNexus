import { BaseInteraction, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../Command.js";
import { ConsoleCommandSender } from "../../console/ConsoleCommandSender.js";

export class StopCommand extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("stop")
            .setDescription("Stop DiscordNexus")
        )
        this.setOnlyConsole(true)
    }

    /**
     * Execute the command
     * @param {User|ConsoleCommandSender} sender 
     * @param {BaseInteraction} interaction
     * @param {Object|undefined} args
     */
    execute(sender, interaction, args) {
        if (sender instanceof User) {
            return interaction.reply("This cmd only use in console!")
        }

        sender.send("Stopping DiscordNexus...");
        this.getNexus().shutdown();
    }
}