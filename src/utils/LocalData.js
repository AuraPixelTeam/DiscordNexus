import {
    existsSync,
    readFileSync,
    writeFileSync
} from "fs";
import properties from "properties";
import { parse, stringify } from 'yaml'

export class LocalData {

    file;
    type;
    data;
    nestedCache = [];

    constructor(file, type, defaultValue = {}) {
        this.file = file;
        this.type = type;

        if (!existsSync(file)) {
            this.data = defaultValue;
            this.save()
        } else {
            const content = readFileSync(file, 'utf-8');
            switch (this.type) {
                case LocalDataTypes.PROPERTIES:
                    this.data = properties.parse(content);
                    break;
                case LocalDataTypes.JSON:
                    this.data = JSON.parse(content);
                    break;
                case LocalDataTypes.YAML:
                    this.data = parse(content);
                    break;
            }
        }
    }

    get = (name) => {
        return this.data[name];
    }

    set = (name, value) => {
        this.data[name] = value;
    }

    getAll() {
        return this.data;
    }

    getNested(key, defaultValue = null) {
        if (this.nestedCache[key]) {
            return this.nestedCache[key];
        }
    
        const vars = key.split(".");
        let base = vars.shift();
    
        if (this.data[base] !== undefined) {
            base = this.data[base];
        } else {
            return defaultValue;
        }
    
        while (vars.length > 0) {
            const baseKey = vars.shift();
            if (base[baseKey] !== undefined) {
                base = base[baseKey];
            } else {
                return defaultValue;
            }
        }
    
        this.nestedCache[key] = base;
        return base;
    }
    
    setNested(key, value) {
        const vars = key.split(".");
        let base = vars.shift();
    
        if (!this.data[base]) {
            this.data[base] = {};
        }
    
        base = this.data[base];
    
        while (vars.length > 0) {
            const baseKey = vars.shift();
            if (!base[baseKey]) {
                base[baseKey] = {};
            }
            base = base[baseKey];
        }
    
        base = value;
        this.nestedCache = {};
    }

    save = () => {
        let content = undefined;
        switch (this.type) {
            case LocalDataTypes.PROPERTIES:
                content = properties.stringify(this.data);
                break;
            case LocalDataTypes.JSON:
                content = JSON.stringify(this.data);
                break;
            case LocalDataTypes.YAML:
                content = stringify(this.data);
                break;
        }
        writeFileSync(this.file, content)
    }
}

export const LocalDataTypes = {
    PROPERTIES: 0,
    JSON: 1,
    YAML: 2
}