import { Client, GatewayIntentBits, Partials } from "discord.js";
import { configDotenv } from "dotenv";

class DiscordNexus {

    client;

    constructor() {
        configDotenv()
        this.client = new Client({
            intents: Object.keys(GatewayIntentBits).map((a)=>{
                return GatewayIntentBits[a]
            }),
            partials: [
                Partials.User,
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.Reaction,
                Partials.GuildScheduledEvent,
                Partials.ThreadMember
            ]
        })
        this.client.login(process.env.CLIENT_TOKEN)
    }
}

new DiscordNexus()