import { TaskHandler } from "./TaskHandler.js";

export class Task {
    
    id = -1;
    taskHandler;

    constructor() {}

    onRun() {}

    onCancel() {}

    getTaskId() {
        return this.id;
    }

    setTaskId(id) {
        if (this.id != -1) {
            throw new Error(`setTaskId() can only be run once time.`)
        }
        this.id = id;
    }
}