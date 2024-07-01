import { BaseInteraction, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../Command.js";
import { ConsoleCommandSender } from "../../console/ConsoleCommandSender.js";
import { TextFormat } from "../../utils/TextFormat.js";

export class RemoveAdministratorCommand extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("deladministrator")
                .setDescription("Remove Administrator")
                .addUserOption(option => option
                    .setName("user")
                    .setDescription("User")
                    .setRequired(true)
                )
        )
        this.setAdministrator(true)
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

        this.getNexus().removeAdministrator(targetId)
        sender.reply(`Deleted ${target} from administrator list!`);
    }
}