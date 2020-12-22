import * as math from 'mathjs';
import IWebGLContext from './IWebGLContext';
import ProgramHelper from './ProgramHelper';
import ProgramSource from './ProgramSource';
import DefaultVertexShader from './shaders/DefaultVertexShader';
import DefaultFragmentShader from './shaders/DefaultFragmentShader';


export default class WebGLContext implements IWebGLContext {


    static readonly DEFAULT_BUFFER_WIDTH_SIZE = 1280;

    canvas?: HTMLCanvasElement;
    rootElement: HTMLElement;
    context: WebGL2RenderingContext | null = null;

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement;
        this.initializeWebGLContext();
        this.demo();
    }

    demo(): void {
        const programHelper = new ProgramHelper(this);
        programHelper.createProgram('default', new ProgramSource(new DefaultVertexShader(), new DefaultFragmentShader()));
        
    }

    resize(): void {
        if ( !this.canvas || !this.context )
            return;

        const aspectRatio = 16 / 9;
        const width = WebGLContext.DEFAULT_BUFFER_WIDTH_SIZE;
        const height = width / aspectRatio;


        this.canvas.width = width;
        this.canvas.height = height;

        this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    initializeWebGLContext(): void {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('webgl2');

        this.resize();


        if ( !this.context )
            throw new Error('no context webgl2 could be initialized.');

        this.rootElement.appendChild(this.canvas);
    }
}