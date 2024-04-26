import { Client, GatewayIntentBits, Partials } from "discord.js";
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

class DiscordNexus extends Client {

    baseConsole;
    configuration;
    pluginManager;
    nexusProperties;
    language;
    
    supportLanguages = {
        "eng": {
            "name": "English",
            "file": "en-US"
        },
        "vie": {
            "name": "Tiếng Việt",
            "file": "vi-VN"
        }
    };

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
                console.log(`Logged as ${this.user.username}`)
            })

        global.dataPath = "./";
        this.baseConsole = new BaseConsole();
        this.pluginManager = new PluginManager(this);
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
        })

        new ConsoleReader();
        process.on('SIGINT', () => {
            this.shutdown();
            process.exit();
        });
    }

    getDataPath() {
        return dataPath;
    }

    getBaseConsole() {
        return this.baseConsole;
    }

    getPluginManager() {
        return this.pluginManager;
    }

    getNexusConfig() {
        return this.configuration;
    }

    getNexusProperties() {
        return this.nexusProperties;
    }

    getLanguage() {
        return this.language;
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
        this.language = new LocalData(`./src/lang/${this.supportLanguages[languageSelected]["file"]}.yml`, LocalDataTypes.YAML);

        if (this.getNexusProperties().get("cron-enable")) {
            const currentIP = await Internet.getIP();
            const cronPort = this.getNexusProperties().get("cron-port");

            this.getBaseConsole().info(Translatable.translate(this.language.get(TranslationKeys.NEXUS_START_CRON_INFO), [currentIP, cronPort]))
        }
        
        return true;
    }

    shutdown() {
        this.getPluginManager().disablePlugins();
        this.destroy();
    }
}

new DiscordNexus()