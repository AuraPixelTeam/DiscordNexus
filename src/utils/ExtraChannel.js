import { Collection } from "discord.js";

export class ExtraChannel {

    channel;

    constructor(channel) {
        this.channel = channel;
    }

    async getMessages(limit = 100) {
        let sum_messages = [];
        let last_id;
    
        while (true) {
            const options = { limit: 100 };
            if (last_id) {
                options.before = last_id;
            }
    
            const messages = await this.channel.messages.fetch(options);
            sum_messages.push(...messages.toJSON())
            last_id = messages.last().id;
    
            if (messages.size != 100 || sum_messages >= limit) {
                break;
            }
        }
    
        return sum_messages;
    }
}