import { PluginBase } from "../plugin/PluginBase.js";
import { CancelTaskException } from "./CancelTaskException.js";
import { Task } from "./Task.js";

export class TaskHandler {

    cancelled = false;
    delay = -1;
    priod = -1;
    owner = undefined;
    /**
     * 
     * @param {Task} task 
     * @param {int} delay 
     * @param {int} priod 
     * @param {PluginBase|undefined} owner
     */
    constructor(task, delay, priod, owner) {
        this.task = task;
        this.delay = delay;
        this.priod = priod;
        this.owner = owner
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

    /**
     * @return {int}
     */
    getPriod() {
        return this.priod;
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
        return this.priod > 0;
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
        clearInterval(this.task.getTaskId());
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
                } 
            }, this.getDelay());
        }
        this.task.setTaskId(id);
    }
}