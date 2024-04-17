const { Client } = require("discord.js");
const { configDotenv } = require("dotenv");

class DiscordNexus {

    client;

    constructor() {
        configDotenv({
            path: ""
        })
        this.client = new Client({
            
        })
    }
}