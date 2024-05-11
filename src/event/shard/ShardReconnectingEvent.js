import { Event } from "../Event.js";
import { Events } from "../Events.js";


export class ShardReconnectingEvent extends Event {

    id;

    /**
     * @param {number} id 
     */
    constructor(id, unavailableGuilds) {
        super(Events.ShardReconnecting);
        this.id = id;
    }

    /**
     * @returns {number}
     */
    getId() {
        return this.id;
    }
}