import ProgramSource from "./ProgramSource";

export default class Program {

    program: WebGLProgram;
    source: ProgramSource;

    constructor(program: WebGLProgram, source: ProgramSource) {
        this.program = program;
        this.source = source;
    }

    compile(): void {
        
    }
}