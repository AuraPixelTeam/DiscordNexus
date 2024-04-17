import { Client, GatewayIntentBits, Partials } from "discord.js";
import { configDotenv } from "dotenv";

class DiscordNexus {

    client;

    constructor() {
        configDotenv()
        // TODO: clean intents, partials
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates
            ],
            partials: [
                Partials.User,
                Partials.Channel,
                Partials.Reaction,
                Partials.Message,
                Partials.GuildMember
            ]
        })
        this.client.login(process.env.CLIENT_TOKEN)
    }
}

new DiscordNexus()