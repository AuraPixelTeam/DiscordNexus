import { User } from "discord.js";
import { Event } from "../Event.js";
import { Events } from "../Events.js";


export class UserUpdateEvent extends Event {

    oldUser;
    newUser;

    /**
     * @param {User} oldUser 
     * @param {User} newUser 
     */
    constructor(oldUser, newUser) {
        super(Events.UserUpdate);
        this.oldUser = oldUser;
        this.newUser = newUser;
    }

    /**
     * @returns {User}
     */
    getOldUser() {
        return this.oldUser;
    }
    
    /**
     * @returns {User}
     */
    getNewUser() {
        return this.newUser;
    }
}