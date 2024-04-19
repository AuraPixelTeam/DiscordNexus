
export class PluginDescription {

    name;
    version;
    api;
    author;
    
    constructor(description) {
        this.name = description.name;
        this.version = description.version;
        this.api = description.api;
        this.author = description.author;
    }

    getName() {
        return this.name;
    }

    getVersion() {
        return this.version;
    }

    getAPI() {
        return this.api;
    }

    getAuthor() {
        return this.author;
    }
}