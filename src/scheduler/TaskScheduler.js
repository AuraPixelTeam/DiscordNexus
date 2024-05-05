import { TaskHandler } from "./TaskHandler.js";

export class TaskScheduler {

    owner;
    constructor(owner) {
        this.owner = owner;
    }

    scheduleDelayedTask(task, delay) {
        this.#addTask(task, delay, -1);
    }

    scheduleDelayedRepeatingTask(task, delay) {
        this.#addTask(task, delay, 1);
    }

    #addTask(task, delay, priod) {
        if (delay <= 0) delay = -1;

        if (priod <= -1) {
            priod = -1;
        } else if (priod < 1) {
            priod = 1;
        }

        this.#handle(new TaskHandler(task, delay, priod));
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