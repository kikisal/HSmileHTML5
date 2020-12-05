export default interface IClientMessage {
        
    /**
     * @description write a 32 bit integer into buffer.
     */
    writeInt(num: number): void;

    /**
     * @returns write 8 bit integer into buffer.
     */
    writeByte(num: number): void;

    writeString(string: string): void;
    writeDouble(num: number): void;

    /**
     * @returns number short 16 bit
     */
    writeShort(num: number): void;

    /**
     * @returns 8 bit true or false
     */
    writeBoolean(bool: boolean): void;
}