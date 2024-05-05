import { TaskHandler } from "./TaskHandler.js";

export class TaskScheduler {

    owner;
    constructor(owner) {
        this.owner = owner;
    }

    scheduleDelayedTask(task, delay) {
        this.#addTask(task, delay, false);
    }

    scheduleDelayedRepeatingTask(task, delay) {
        this.#addTask(task, delay, true);
    }

    #addTask(task, delay, isRepeating) {
        this.#handle(new TaskHandler(task, delay, isRepeating, this.owner));
    }

    /**
     * @param {TaskHandler} task 
     * @param {int} delay 
     * @param {int} priod 
     */
    #handle(task) {
        task.run();
    }
}