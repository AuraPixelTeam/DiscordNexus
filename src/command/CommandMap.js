import { REST, Routes } from "discord.js";
import { Command } from "./Command.js";
import { StopCommand } from "./defaults/StopCommand.js";
import { PluginsCommand } from "./defaults/PluginsCommand.js";
import { VersionCommand } from "./defaults/VersionCommand.js";
import { AddAdministratorCommand } from "./defaults/addAdministratorCommand.js";
import { RemoveAdministratorCommand } from "./defaults/RemoveAdministratorCommand.js";

export class CommandMap {

    knownCommands = [];
    nexus;

    constructor(nexus) {
        this.nexus = nexus;
        this.#setDefaultCommands();
    }
    
    #setDefaultCommands() {
        this.registerAll([
            new StopCommand(),
            new PluginsCommand(),
            new VersionCommand(),
            new AddAdministratorCommand(),
            new RemoveAdministratorCommand()
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

        command.setNexus(this.nexus);

        this.knownCommands[commandName] = command;
    }

    /**
     * @param {Command} command 
     */
    unregister(command) {
        Object.keys(this.knownCommands).forEach(key => {
            if (this.knownCommands[key] === command) {
              delete this.knownCommands[key];
            }
        });
    }

    registerAllForClient() {
        const commands = Object.values(this.getCommands())
            .filter(cmd => !cmd.isConsoleCommand)
            .map(cmd => cmd.toJSON());

        try {
            const rest = new REST({version: '10'}).setToken(process.env.CLIENT_TOKEN);
            try {
                rest.put(
                    Routes.applicationCommands(process.env.CLIENT_ID),
                    {body: commands},
                )
            } catch (e) {
                console.log(e.message);
            }
        } catch (e) {
            console.log(e.message)
        }
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