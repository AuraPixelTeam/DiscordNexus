import { BaseInteraction, SlashCommandBuilder, User } from "discord.js";
import { Command } from "../Command.js";
import { ConsoleCommandSender } from "../../console/ConsoleCommandSender.js";
import { TextFormat } from "../../utils/TextFormat.js";
import { platform } from "os";
import { versions } from "process";
import { VersionInfo } from "../../VersionInfo.js";
import { Translatable } from "../../lang/Translatable.js";
import { TranslationKeys } from "../../lang/TranslationKeys.js";

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
        const discordNexusVersion = VersionInfo.VERSION;
        const nodeJSVersion = versions.node;
        const platformName = platform;
        
        sender.reply(
            `${this.getNexus().getLanguage().translate(new Translatable(TranslationKeys.NEXUS_VERSION_INFO, [discordNexusVersion]))}\n` +
            `${this.getNexus().getLanguage().translate(new Translatable(TranslationKeys.NEXUS_NODE_INFO, [nodeJSVersion]))}\n` +
            `${this.getNexus().getLanguage().translate(new Translatable(TranslationKeys.NEXUS_PLATFORM_INFO, [platformName]))}`
        )
    }
}