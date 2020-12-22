import IWebGLContext from "./IWebGLContext";
import Program from "./Program";
import ProgramSource from "./ProgramSource";
import ShaderHelper from "./ShaderHelper";

type ProgramType = {
    [name: string]: Program | null;
}

export default class ProgramHelper {
    

    programs: ProgramType = {};
    context: IWebGLContext;

    constructor(ctx: IWebGLContext) {
        this.context = ctx;
    }

    contains(name: string): boolean {
        return name in this.programs;
    }

    /**
     * @description remove and destroy a program in the list.
     * @param name program name.
     */
    remove(name: string): void {
        const program = this.programs[name];
        if ( !program )
            return;

        const gl = this.context.context;
        if ( !gl )
            return;

        gl.deleteProgram(program);
        this.programs[name] = null;
    }

    createProgram(name: string, source: ProgramSource): void {


        const gl = this.context.context;
        if ( !gl )
            throw new Error('webgl was null');


        const shaderHelper = new ShaderHelper(this.context);
        shaderHelper.set(gl.VERTEX_SHADER, source.vertexShader);
        shaderHelper.set(gl.FRAGMENT_SHADER, source.fragmentShader);

        // compile shaders.
        shaderHelper.compile();


        const program = gl.createProgram();
        

        if ( !program )
            throw new Error('could not create a new program.');

        const vertexShader = shaderHelper.get(gl.VERTEX_SHADER);
        const fragmentShader = shaderHelper.get(gl.FRAGMENT_SHADER);
        

        if ( !vertexShader || !fragmentShader ) {
            console.log(vertexShader, fragmentShader);
            throw new Error (`vertex or fragment shader null.`);
        }
        
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        const linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);

        if ( !linkStatus ) {
            gl.deleteProgram(program);
            throw new Error(`could not link program: ${name}`);
        }

        if ( this.contains(name) )
            this.remove(name); // destroy current program.


        this.programs[name] = new Program(program, source);
    }
}