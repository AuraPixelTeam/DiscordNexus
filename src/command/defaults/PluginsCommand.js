import { BaseInteraction, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../Command.js";
import { ConsoleCommandSender } from "../../console/ConsoleCommandSender.js";
import { TextFormat } from "../../utils/TextFormat.js";

export class PluginsCommand extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("plugins")
            .setDescription("Plugins DiscordNexus")
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

        const plugins = Object.values(this.getNexus().getPluginManager().getPlugins());
        const pluginsName = plugins.map((plugin) => `${plugin.getDescription().getName()} v${plugin.getDescription().getVersion()}`);

        sender.reply(TextFormat.format(`plugins(${pluginsName.length}): ${pluginsName.join(", ")}`, TextFormat.colors.green))
    }
}