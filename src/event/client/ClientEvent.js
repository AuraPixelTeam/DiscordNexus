import { Client } from "discord.js";
import { Event } from "../Event.js";
import { Events } from "../Events.js";

export class ClientEvent extends Event {

    client;

    /**
     * @param {Client} client 
     */
    constructor(eventName, client) {
        super(eventName);
        this.client = client;
    }

    /**
     * @returns {Client}
     */
    getClient() {
        return this.client;
    }
}