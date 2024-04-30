import { BotProperties } from "../BotProperties.js";
import { LocalData, LocalDataTypes } from "../utils/LocalData.js"
import * as readline from 'readline';
import {
    readFileSync,
    writeFileSync
} from "fs";
import {
    networkInterfaces
} from 'os';
import { Translatable } from "../lang/Translatable.js";
import { TranslationKeys } from "../lang/TranslationKeys.js";
import { Language } from "../lang/Language.js";

export class SetupWizard {

    nexus;
    language;

    constructor(nexus) {
        this.nexus = nexus;
    }

    run = async () => {
        this.message("DiscordNexus setup-wizard!");

        const supportLanguages = Language.getLanguages();

        this.message("[*] Please select a language");
        for (let language in supportLanguages) {
            console.log(`   ${language} => ${supportLanguages[language]}`)
        }

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        let languageSelected = undefined;
        try {
            languageSelected = (await new Promise((resolve) => {
                rl.question('[?] Language (eng): ', resolve);
            })).trim().toLowerCase();
            if (!supportLanguages[languageSelected]) {
                this.error("Couldn't find the language");
            }

            this.language = new Language(languageSelected);
            this.message(this.language.get(TranslationKeys.NEXUS_LANGUAGE_SELECTED));

            const value = await this.showLicense();
            if (!value) {
                return false;
            }

        } finally {
            rl.close();
        }

        const localData = new LocalData("nexus.properties", LocalDataTypes.PROPERTIES);
        localData.set(BotProperties.LANGUAGE, languageSelected);
        localData.save();

        this.generateBaseSettings(localData);
        await this.botFunctions();
        await this.botProperties(localData);
        return true;
    }

    generateBaseSettings = (localData) => {
        localData.set(BotProperties.ENABLE_CRON, false);
        localData.set(BotProperties.CRON_PORT, 203);
        localData.save();
    }

    showLicense = async () => {
        console.log(this.language.get(TranslationKeys.NEXUS_LICENSE_INFO))
        console.log(`
            This program is free software: you can redistribute it and/or modify
            it under the terms of the GNU Lesser General Public License as published by
            the Free Software Foundation, either version 3 of the License, or
            (at your option) any later version.

        `);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        try {
            const answer = await new Promise((resolve) => {
                rl.question(`[?] ${this.language.get(TranslationKeys.NEXUS_QUESTION_LICENSE)}`, resolve);
            });
    
            if (answer.trim().toLowerCase() !== "y") {
                this.error(this.language.get(TranslationKeys.NEXUS_LICENSE_REQUIRED));
                return false;
            }
            return true;
        } finally {
            rl.close();
        }
    }

    botFunctions = async () => {
        const envFilePath = '.env';
        const envData = readFileSync(envFilePath, 'utf8');
        let lines = envData.split('\n');

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        try {
            const token = await new Promise((resolve) => {
                rl.question(`[?] ${this.language.get(TranslationKeys.NEXUS_INPUT_TOKEN)}`, resolve);
            });
            lines = lines.map(line => {
                if (line.startsWith('CLIENT_TOKEN=')) {
                    return `CLIENT_TOKEN=${token}`;
                }
                return line;
            });
            
            const id = await new Promise((resolve) => {
                rl.question(`[?] ${this.language.get(TranslationKeys.NEXUS_INPUT_ID)}`, resolve);
            });
            lines = lines.map(line => {
                if (line.startsWith('CLIENT_ID=')) {
                    return `CLIENT_ID=${id}`;
                }
                return line;
            });

            writeFileSync(envFilePath, lines.join('\n'));
        } finally {
            rl.close();
        }
    }

    botProperties = async (localData) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        try {
            const cron = await new Promise((resolve) => {
                rl.question(`[?] ${this.language.get(TranslationKeys.NEXUS_QUESTION_CRON)}`, resolve);
            });
            localData.set(BotProperties.ENABLE_CRON, (cron == "y"))
            
            if (cron == "y") {
                const cronPort = await new Promise((resolve) => {
                    rl.question(`[?] ${this.language.get(TranslationKeys.NEXUS_INPUT_CRON_PORT)}`, resolve);
                });
                const cronPortExtract = parseInt(cronPort);
                localData.set(BotProperties.CRON_PORT, cronPortExtract)
                localData.save();

                this.message(this.language.get(TranslationKeys.NEXUS_LOADING_IP_GETTING));
                const IPv4 = this.getIPv4Address();
                this.error(this.language.translate(new Translatable(TranslationKeys.NEXUS_LOADING_IP_INFO, [IPv4])))
                this.error(this.language.translate(new Translatable(TranslationKeys.NEXUS_LOADING_CRON_INFO, [IPv4, cronPort])))
            }
        } finally {
            rl.close();
        }
    }

    getIPv4Address = () => {
        const interfaces = networkInterfaces();
        for (const interfaceName of Object.keys(interfaces)) {
            const addresses = interfaces[interfaceName];
            for (const address of addresses) {
                if (address.family === 'IPv4' && !address.internal) {
                    return address.address;
                }
            }
        }
        return undefined;
    }

    message = (text) => {
        console.log(`[*] ${text}`)
    }

    error = (text) => {
        console.log(`[!] ${text}`)
    }
}