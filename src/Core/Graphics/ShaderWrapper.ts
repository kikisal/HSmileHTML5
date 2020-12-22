import IShaderSource from "./IShaderSource";

export default class ShaderWrapper implements IShaderSource {
    label: string = 'unknown';

    getText(): string {
        throw new Error("Method not implemented.");
    }
}