import { BaseInteraction, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../Command.js";
import { ConsoleCommandSender } from "../../console/ConsoleCommandSender.js";
import { TextFormat } from "../../utils/TextFormat.js";
import { platform } from "os";
import { versions } from "process";
import { VersionInfo } from "../../VersionInfo.js";
import { Translatable } from "../../lang/Translatable.js";
import { TranslationKeys } from "../../lang/TranslationKeys.js";
import { PluginBase } from "../../plugin/PluginBase.js";

export class VersionCommand extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("version")
            .setDescription("Get Info of DiscordNexus")
        )
    }

    /**
     * Execute the command
     * @param {User|ConsoleCommandSender} sender 
     * @param {BaseInteraction} interaction
     * @param {Object|undefined} args
     */
    execute(sender, interaction, args) {
        if (args.length == 0) {
            const discordNexusVersion = VersionInfo.VERSION;
            const nodeJSVersion = versions.node;
            const platformName = platform;
            
            sender.reply(
                `${this.getNexus().getLanguage().translate(new Translatable(TranslationKeys.NEXUS_VERSION_INFO, [TextFormat.format(`v${discordNexusVersion}`, TextFormat.colors.green)]))}\n` +
                `${this.getNexus().getLanguage().translate(new Translatable(TranslationKeys.NEXUS_NODE_INFO, [TextFormat.format(nodeJSVersion, TextFormat.colors.green)]))}\n` +
                `${this.getNexus().getLanguage().translate(new Translatable(TranslationKeys.NEXUS_PLATFORM_INFO, [TextFormat.format(platformName, TextFormat.colors.green)]))}`
            )
        } else {
            const pluginName = args.join(" ");
            const plugin = this.getNexus().getPluginManager().getPlugin(pluginName);
            if (plugin instanceof PluginBase) {
                const desc = plugin.getDescription();
                sender.reply(
                    `${TextFormat.format(`${desc.getName()} v${desc.getVersion()}`, TextFormat.colors.green)}\n` +
                    `Author: ${TextFormat.format(`${desc.getAuthor()}`, TextFormat.colors.green)}`
                );
            } else {
                sender.reply(this.getNexus().getLanguage().get(TranslationKeys.NEXUS_PLUGIN_NOSUCH));
            }
        }
    }
}