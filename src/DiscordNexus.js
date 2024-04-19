import { Client, GatewayIntentBits, Partials } from "discord.js";
import { configDotenv } from "dotenv";
import {
    existsSync,
    readFileSync,
    writeFileSync
} from "fs";
import { SetupWizard } from "./application/SetupWizard.js";
import { VersionInfo } from "./VersionInfo.js";
import path from "path";

class DiscordNexus {

    client;

    constructor() {
        global.dataPath = "./";
        this.start();

        const DiscordNexusJSON = "nexus.yml";
        if (!existsSync(DiscordNexusJSON)) {
            const content = readFileSync(path.join(this.getDataPath(), "src", "resources", "nexus.yml"), 'utf-8');
            if (VersionInfo.IS_DEVELOPMENT_BUILD) {
                // TODO: Change to branch dev
            }
            writeFileSync(DiscordNexusJSON, content);
        }
    }

    getDataPath() {
        return dataPath;
    }

    start = async () => {
        if (!existsSync("nexus.properties")) {
            const installer = new SetupWizard()
            if (!await installer.run()) {
                return;
            }
        }

        configDotenv()

        this.client = new Client({
            intents: Object.keys(GatewayIntentBits).map((a) => {
                return GatewayIntentBits[a]
            }),
            partials: Object.keys(Partials).map((a) => {
                return Partials[a]
            }),
        })
        this.client.login(process.env.CLIENT_TOKEN)
            .then(() => {
                console.log(`Logged as ${this.client.user.username}`)
            })
    }
}

new DiscordNexus()