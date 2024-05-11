import { Event } from "../Event.js";
import { Events } from "../Events.js";


export class ShardErrorEvent extends Event {

    error;
    shardId

    /**
     * 
     * @param {Error} error 
     * @param {number} shardId 
     */
    constructor(error, shardId) {
        super(Events.ShardError);
        this.error = error;
        this.shardId = shardId;
    }

    /**
     * @returns {Error}
     */
    getError() {
        return this.error;
    }

    /**
     * @returns {number}
     */
    getShardId() {
        return this.shardId;
    }
}