import IWebGLContext from "./IWebGLContext";
import Program from "./Program";
import ProgramSource from "./ProgramSource";
import ShaderHelper from "./ShaderHelper";
import DefaultFragmentShader from "./shaders/DefaultFragmentShader";
import DefaultVertexShader from "./shaders/DefaultVertexShader";

type ProgramType = {
    [name: string]: Program | null;
}

export default class ProgramHelper {
    

    programs: ProgramType = {};
    context: IWebGLContext;

    constructor(ctx: IWebGLContext) {
        this.context = ctx;
        this.createProgram('default', new ProgramSource(new DefaultVertexShader(), new DefaultFragmentShader()));
        this.use('default');
    }

    use( name: string ): void {

        const gl = this.context.context;

        if ( !gl )
            throw new Error('use() ProgramHelper: no webgl context found.');

        if ( !this.contains(name) ) {
            if ( true ) // debug true
                console.warn(`no program called '${name}' has been found; setting default one.`);

            gl.useProgram( this.programs['default']!.program );
            return;
        }

        if ( name === 'default' && true /* debug true */ )
            console.warn('[ProgramHelper] use(): no program specified, using default one.');

        gl.useProgram(this.programs[name]!.program);        
    }

    contains(name: string): boolean {
        return name in this.programs && this.programs[name]!.program !== null;
    }

    /**
     * @description remove and destroy a program in the list.
     * @param name program name.
     */
    remove(name: string): void {
        const program = this.programs[name];
        if ( !program || !program.program )
            return;

        const gl = this.context.context;
        if ( !gl )
            return;

        gl.deleteProgram(program.program);
        this.programs[name] = null;
    }
    

    size(): number {
        let size = 0;
        for ( let program in this.programs ) {
            if ( this.programs[program] && this.programs[program]!.program )
                size++;
        }

        return size;
    }


    createProgram(name: string, source: ProgramSource): void {


        if ( this.contains(name) )
            this.remove(name); // destroy current program.

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


        this.programs[name] = new Program(program, source);
    }
}