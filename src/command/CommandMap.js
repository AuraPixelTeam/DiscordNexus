import { Command } from "./Command.js";
import { Test } from "./defaults/Test.js";

export class CommandMap {

    knownCommands = [];
    nexus;

    constructor(nexus) {
        this.nexus = nexus;
        this.#setDefaultCommands();
    }
    
    #setDefaultCommands() {
        this.registerAll([
            new Test()
        ])
    }

    /**
     * @param {Command[]} commands 
     */
    registerAll(commands) {
        for (const command of commands) {
            this.register(command);
        }
    }

    /**
     * @param {Command} command 
     */
    register(command) {
        const commandName = command.getName();
        
        const isRegisted = this.getCommand(commandName);
        if (isRegisted) {
            throw new Error(`Command "${commandName}" is registed!`);
        }

        this.knownCommands[commandName] = command;
    }

    /**
     * @param {string} name
     * @returns {Command|undefined}
     */
    getCommand(name) {
        return this.knownCommands[name] ?? undefined;
    }

    /**
     * @returns {Command[]}
     */
    getCommands() {
        return this.knownCommands;
    }
}