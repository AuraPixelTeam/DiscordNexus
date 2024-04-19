import {
    existsSync,
    writeFileSync
} from "fs";
import properties from "properties";
import { parse, stringify } from 'yaml'

export class LocalData {

    file;
    type;
    data;

    constructor(file, type, defaultValue = {}) {
        this.file = file;
        this.type = type;

        if (!existsSync(file)) {
            this.data = defaultValue;
            this.save()
        } else {

        }
    }

    set = (name, value) => {
        this.data[name] = value;
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