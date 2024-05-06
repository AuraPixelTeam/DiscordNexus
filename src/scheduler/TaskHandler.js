import { PluginBase } from "../plugin/PluginBase.js";
import { CancelTaskException } from "./CancelTaskException.js";
import { Task } from "./Task.js";

export class TaskHandler {

    cancelled = false;
    delay = -1;
    repeating = false;
    owner = undefined;
    /**
     * 
     * @param {Task} task 
     * @param {int} delay 
     * @param {int} priod 
     * @param {PluginBase|undefined} owner
     */
    constructor(task, delay, isRepeating, owner) {
        this.task = task;
        this.delay = delay;
        this.repeating = isRepeating;
        this.owner = owner;
    }

    isCancelled() {
        return this.cancelled;
    }

    /**
     * @returns {int}
     */
    getDelay() {
        return this.delay;
    }
    
    getOwner() {
        return this.owner;
    }

    /**
     * @returns {boolean}
     */
    isDelayed() {
        return this.delay > 0;
    }

    /**
     * @returns {boolean}
     */
    isRepeating() {
        return this.isRepeating;
    }

    cancel() {
        try {
            if (!this.isCancelled()) {
                this.task.onCancel();
            }
        } finally {
            this.remove();
        }
    }

    remove() {
        this.cancelled = true;
        if (this.isDelayed() && !this.isRepeating()) {
            clearTimeout(this.task.getTaskId());
        } else {
            clearInterval(this.task.getTaskId());
        }
    }

    run() {
        let id = -1;
        if (this.isDelayed() && !this.isRepeating()) {
            id = setTimeout(() => {
                try {
                    this.task.onRun()
                } catch(error) {
                    if (error instanceof CancelTaskException) {
                        this.cancel();
                    }
                    throw error;
                } 
            }, this.getDelay());
        }
        if (this.isDelayed() && this.isRepeating()) {
            id = setInterval(() => {
                try {
                    this.task.onRun()
                } catch(error) {
                    if (error instanceof CancelTaskException) {
                        this.cancel();
                    }
                    throw error;
                } 
            }, this.getDelay());
        }
        this.task.setTaskId(id);
    }
}