import { Client } from "discord.js";
import { Events } from "../Events.js";
import { ClientEvent } from "./ClientEvent.js";

export class ClientReadyEvent extends ClientEvent {
    /**
     * @param {Client} client 
     */
    constructor(eventName, client) {
        super(Events.ClientReady, client);
    }
}