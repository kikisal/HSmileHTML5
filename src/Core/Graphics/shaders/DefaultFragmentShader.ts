import IShader from "../IShaderSource";
import ShaderWrapper from "../ShaderWrapper";

export default class DefaultFragmentShader extends ShaderWrapper {

    label: string = 'FragmentShader';

    getText(): string {
        return `
            precision mediump float;

            uniform vec4 u_color;

            void main() {
                gl_FragColor = u_color;
            }
        `;
    }
}