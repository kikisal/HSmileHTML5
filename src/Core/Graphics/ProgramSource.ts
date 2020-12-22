import IShader from "./IShaderSource";

export default class ProgramSource {
    vertexShader: IShader;
    fragmentShader: IShader;

    constructor( vertexShader: IShader, fragmentShader: IShader ) {
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
    }    
}