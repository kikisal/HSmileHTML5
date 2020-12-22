import IShader from "../IShaderSource";
import ShaderWrapper from "../ShaderWrapper";

export default class DefaultVertexShader extends ShaderWrapper {
    label: string = 'VertexShader';

    getText(): string {
        return `
            attribute vec2 a_position;

            void main() {
                gl_Position = vec4(a_position, 0, 1);
            }
        `;
    }
}