export default interface IServerMessage {
    
    /**
     * @returns number 32 bit
     */
    popInt(): number;

    /**
     * @returns number 8 bit
     */
    popByte(): number;
    popString(): string;
    popDouble(): number;

    /**
     * @returns number short 32 bit
     */
    popShort(): number;

    /**
     * @returns 1 byte true or false
     */
    popBoolean(): boolean;
}