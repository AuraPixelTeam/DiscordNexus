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

export class SetupWizard {

    run = async () => {
        this.message("DiscordNexus setup-wizard!")
        const value = await this.showLicense();
        if (!value) {
            return false;
        }

        const localData = new LocalData("bot.properties", LocalDataTypes.PROPERTIES);
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
        console.log(`Trước khi bắt đầu thiết lập bot Discord của mình, bạn phải chấp nhận giấy phép.\nDiscordNexus được cấp phép theo Giấy phép LGPL,\nmà bạn có thể đọc được khi mở tệp LICENSE trên thư mục này.`)
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
                rl.question('[?] Bạn có chấp nhận Giấy phép không? (y/N): ', resolve);
            });
    
            if (answer.trim().toLowerCase() !== "y") {
                console.error('[!] Bạn phải chấp nhận giấy phép LGPL để tiếp tục sử dụng DiscordNexus');
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
                rl.question('[?] Nhập TOKEN bot của bạn: ', resolve);
            });
            lines = lines.map(line => {
                if (line.startsWith('CLIENT_TOKEN=')) {
                    return `CLIENT_TOKEN=${token}`;
                }
                return line;
            });
            
            const id = await new Promise((resolve) => {
                rl.question('[?] Nhập ID bot của bạn: ', resolve);
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
                rl.question('[?] Bạn có muốn bật Cron không? (y/N): ', resolve);
            });
            localData.set(BotProperties.ENABLE_CRON, (cron == "y"))
            
            if (cron == "y") {
                const cronPort = await new Promise((resolve) => {
                    rl.question('[?] Nhập port cho cron: ', resolve);
                });
                const cronPortExtract = parseInt(cronPort);
                localData.set(BotProperties.CRON_PORT, cronPortExtract)
                localData.save();

                this.message("Đang lấy IP bên ngoài của bạn");
                const IPv4 = this.getIPv4Address();
                this.error(`IP bên ngoài của bạn là ${IPv4}`);
                this.error(`Bạn có thể kết nối tới cron qua ${IPv4}:${cronPort}`);
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