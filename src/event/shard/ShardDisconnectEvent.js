import { Event } from "../Event.js";
import { Events } from "../Events.js";



export class ShardDisconnectEvent extends Event {

    closeEvent;
    id;

    /**
     * @param {*} closeEvent 
     * @param {number} id 
     */
    constructor(closeEvent, id) {
        super(Events.ShardDisconnect);
        this.closeEvent = closeEvent;
        this.id = id;
    }

    getCloseEvent() {
        return this.closeEvent;
    }

    getId() {
        return this.id;
    }
}