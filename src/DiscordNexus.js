import { Client, Events, GatewayIntentBits, Partials } from "discord.js";
import { configDotenv } from "dotenv";
import {
    existsSync,
    readFileSync,
    writeFileSync,
    mkdirSync
} from "fs";
import { SetupWizard } from "./application/SetupWizard.js";
import { VersionInfo } from "./VersionInfo.js";
import path from "path";
import { BaseConsole } from "./utils/BaseConsole.js";
import { LocalData, LocalDataTypes } from "./utils/LocalData.js";
import { PluginManager } from "./plugin/PluginManager.js";
import { Internet } from "./utils/Internet.js";
import { Translatable } from "./lang/Translatable.js";
import { TranslationKeys } from "./lang/TranslationKeys.js";
import { ConsoleReader } from "./console/ConsoleReader.js";
import { CommandMap } from "./command/CommandMap.js";
import { Language } from "./lang/Language.js";

global.LANGUAGE_PATH = "./src/lang";

export class DiscordNexus extends Client {

    baseConsole;
    configuration;
    pluginManager;
    nexusProperties;
    language;
    commandMap;

    constructor() {
        const options = {
            intents: Object.keys(GatewayIntentBits).map((a) => {
                return GatewayIntentBits[a]
            }),
            partials: Object.keys(Partials).map((a) => {
                return Partials[a]
            })
        };
        super(options);
        
        configDotenv()

        this.login(process.env.CLIENT_TOKEN)
            .then(() => {
                this.on(Events.InteractionCreate, async (interaction) => {
                    if (interaction.isChatInputCommand()) {
                        const command = this.getCommandMap().getCommand(interaction.commandName);
            
                        if (command) {
                            try {
                                await command.execute(interaction.user, interaction, interaction.options);
                            } catch (e) {}
                        }
                    }
                });
                console.log(`Logged as ${this.user.username}`)
            })

        global.dataPath = "./";
        this.instance = this;
        this.baseConsole = new BaseConsole();
        this.pluginManager = new PluginManager(this);
        this.commandMap = new CommandMap(this);
        this.start().then((OK) => {
            if (!OK) return this.shutdown();
            
            this.getBaseConsole().info(this.language.get(TranslationKeys.NEXUS_LOADING_CONFIGURATION));
            const DiscordNexusJSON = "nexus.yml";
            if (!existsSync(DiscordNexusJSON)) {
                const content = readFileSync(path.join(this.getDataPath(), "src", "resources", "nexus.yml"), 'utf-8');
                if (VersionInfo.IS_DEVELOPMENT_BUILD) {
                    // TODO: Change to branch dev
                }
                writeFileSync(DiscordNexusJSON, content);
            }
            this.configuration = new LocalData(DiscordNexusJSON, LocalDataTypes.YAML);
    
            const pluginsPath = "plugins";
            const pluginDataPath = "plugin_data"
            if (!existsSync(pluginDataPath)) {
                mkdirSync(pluginDataPath);
            }
            if (!existsSync(pluginsPath)) {
                mkdirSync(pluginsPath);
            } else {
                this.getPluginManager().loadPlugins(pluginsPath);
            }
            this.getCommandMap().registerAllForClient();
        })

        new ConsoleReader(this);
        process.on('SIGINT', () => {
            this.shutdown();
            process.exit();
        });
    }

    getDataPath() {
        return dataPath;
    }

    /**
     * @returns {BaseConsole}
     */
    getBaseConsole() {
        return this.baseConsole;
    }

    /**
     * @returns {PluginManager}
     */
    getPluginManager() {
        return this.pluginManager;
    }

    /**
     * @returns {LocalData}
     */
    getNexusConfig() {
        return this.configuration;
    }

    /**
     * @returns {LocalData}
     */
    getNexusProperties() {
        return this.nexusProperties;
    }

    /**
     * @returns {Language}
     */
    getLanguage() {
        return this.language;
    }

    /**
     * @returns {CommandMap}
     */
    getCommandMap() {
        return this.commandMap;
    }

    start = async () => {
        if (!existsSync("nexus.properties")) {
            const installer = new SetupWizard(this)
            if (!await installer.run()) {
                return false;
            }
        }
        this.nexusProperties = new LocalData("nexus.properties", LocalDataTypes.PROPERTIES);

        const languageSelected = this.nexusProperties.get("language");
        this.language = new Language(languageSelected);

        if (this.getNexusProperties().get("cron-enable")) {
            const currentIP = await Internet.getIP();
            const cronPort = this.getNexusProperties().get("cron-port");

            this.getBaseConsole().info(this.getLanguage().translate(new Translatable(TranslationKeys.NEXUS_START_CRON_INFO, [currentIP, cronPort])))
        }
        
        return true;
    }

    shutdown() {
        this.getPluginManager().disablePlugins();
        this.destroy();
        process.kill(process.pid, 'SIGINT');
    }
}

new DiscordNexus()