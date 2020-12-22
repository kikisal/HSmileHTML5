import { conjDependencies } from "mathjs";
import IShaderSource from "./IShaderSource";
import IShader from "./IShaderSource";
import IWebGLContext from "./IWebGLContext";

type ShaderType = {
    [name: number]: {
        source: IShaderSource,
        shader: WebGLShader | null
    } | null;
}

export default class ShaderHelper {

    ctx: IWebGLContext;
    shaders: ShaderType = {};


    constructor(context: IWebGLContext) {
        this.ctx = context;
    }

    contains(key: number): boolean {
        return key in this.shaders;
    }

    set(key: number, source: IShaderSource): void {
        if ( this.contains(key) )
            this.remove(key);

        this.shaders[key] = {
            source: source,
            shader: null
        };
    }

    get(key: number): WebGLShader | null {
        return !this.shaders[key] ? null : this.shaders[key]!.shader;
    }

    remove(shaderId: number): void {
        const shader = this.shaders[shaderId];
        if ( !shader )
            return;
        
        const gl = this.ctx.context;
        if (!gl)
            return;

        gl.deleteShader(shader.shader);
        shader.shader = null;
        this.shaders[shaderId] = null;
    }

    compile(): void {
        const gl = this.ctx.context;

        if ( !gl )
            throw new Error('[ShaderHelper.ts]: no webgl context found.');
        
        for ( let shader in this.shaders ) {
            const idShader = parseInt(shader);
            
            const holder = this.shaders[idShader];
            if ( !holder )
                continue;
            
            const shaderLabel = holder.source.label;

            const webGlShader = gl.createShader(idShader);

            if ( !webGlShader )
                throw new Error(`error in creating shader: ${shaderLabel}`);
            
            gl.shaderSource(webGlShader, holder.source.getText());
            gl.compileShader(webGlShader);

            const shaderCompiled = gl.getShaderParameter(webGlShader, gl.COMPILE_STATUS);
            if ( !shaderCompiled )
            {
                this.remove(idShader);
                throw new Error(`cannot compile shader: ${shaderLabel}`);
            }

            this.shaders[idShader]!.shader = webGlShader;
        }
    }
}