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
     * @returns number short 16 bit
     */
    popShort(): number;

    /**
     * @returns 8 bit true or false
     */
    popBoolean(): boolean;
}