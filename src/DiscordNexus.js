import { Client, GatewayIntentBits, Partials } from "discord.js";
import { configDotenv } from "dotenv";
import {
    existsSync
} from "fs";
import { SetupWizard } from "./application/SetupWizard.js";

class DiscordNexus {

    client;

    constructor() {
        this.start();
    }

    start = async () => {
        if (!existsSync("bot.properties")) {
            const installer = new SetupWizard()
            if (!await installer.run()) {
                return;
            }
        }

        configDotenv()

        this.client = new Client({
            intents: Object.keys(GatewayIntentBits).map((a)=>{
                return GatewayIntentBits[a]
            }),
            partials: Object.keys(Partials).map((a)=>{
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