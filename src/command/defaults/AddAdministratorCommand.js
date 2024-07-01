import { BaseInteraction, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../Command.js";
import { ConsoleCommandSender } from "../../console/ConsoleCommandSender.js";
import { TextFormat } from "../../utils/TextFormat.js";

export class AddAdministratorCommand extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("addadministrator")
                .setDescription("Add Administrator")
                .addUserOption(option => option
                    .setName("user")
                    .setDescription("User")
                    .setRequired(true)
                )
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
            return interaction.reply("This cmd only use in discord!")
        }

        const target = args.getUser("user")
        const targetId = target.id
        const userId = sender.id
        
        if (this.getNexus().isAdministrator(userId)) {
            if (!this.getNexus().isAdministrator(targetId)) this.getNexus().addAdministrator(targetId)
                
            interaction.reply(`Added ${target} to administrator list!`);
        } else {
            interaction.reply("You don't have permission to do this!")
        }
    }
}