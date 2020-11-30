type FunctionRunnable = (e?: any) => void;

export interface Runnable {
    run(): void;
}

export interface ITask {
    start(): void;
    destroy(): void;
}

export default class Task implements ITask {
    
    task: number; 
    runnable?: Runnable | FunctionRunnable;
 
    
    constructor() {
        this.task = 0;
    }

    start(): void {
        if ( !this.runnable )
            throw new Error('no tasks bound');

        this.getRunnable()();
    }

    destroy(): void {
        throw new TypeError('Not implemented yet.');
    }

    getRunnable(): FunctionRunnable {
        return typeof this.runnable === 'function' ? this.runnable : this.runnable ? this.runnable.run : (e?: any) => void {};
    }

}

// make a new 'thread'
export class LoopTask extends Task {
    
    delay: number;

    

    constructor(delay: number) {
        super();
        this.delay = delay;

       
    }

    start(): void {
        this.task = setInterval( this.getRunnable(), this.delay );
    }

    destroy(): void {
        clearInterval(this.task);
        this.task = -1;
    }

}