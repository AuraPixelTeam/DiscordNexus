import { Event } from "../Event.js";
import { Events } from "../Events.js";


export class ShardReadyEvent extends Event {

    id;
    unavailableGuilds;

    /**
     * @param {number} id 
     * @param {Set} unavailableGuilds 
     */
    constructor(id, unavailableGuilds) {
        super(Events.ShardReady);
        this.id = id;
        this.unavailableGuilds = unavailableGuilds;
    }

    /**
     * @returns {number}
     */
    getId() {
        return this.id;
    }

    /**
     * @returns {Set}
     */
    getUnavailableGuilds() {
        return this.unavailableGuilds;
    }
}