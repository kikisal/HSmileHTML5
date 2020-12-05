import IClientMessage from "./IClientMessage";

export default class ClientMessage implements IClientMessage {


    static MAX_BUFFER_SIZE: number = 65536;
    dataView: DataView = new DataView(new ArrayBuffer(ClientMessage.MAX_BUFFER_SIZE));

    header: number = 0;
    byteWrote: number = 0;
    offsetMessageLength: number = Int32Array.BYTES_PER_ELEMENT;

    constructor(header: number) {
        this.header = header;
        this.writeShort(header);
    }

    getBuffer(): ArrayBuffer {
        //this.dataView.setInt32(0, this.byteWrote);
        return this.dataView.buffer.slice(0, this.byteWrote);
    }

    checkByteMaximum(nextSize: number): void {
        if ( this.byteWrote + nextSize > ClientMessage.MAX_BUFFER_SIZE )
            throw new Error('buffer full.');
    }
    
    writeInt(num: number): void {
        this.checkByteMaximum(Int32Array.BYTES_PER_ELEMENT);

        this.dataView.setInt32(this.byteWrote, num);
        this.byteWrote += Int32Array.BYTES_PER_ELEMENT;
    }

    writeByte(num: number): void {
        this.checkByteMaximum(Int8Array.BYTES_PER_ELEMENT);

        this.dataView.setInt8(this.byteWrote, num);
        this.byteWrote += Int8Array.BYTES_PER_ELEMENT;       
    }

    writeString(string: string): void {
        this.checkByteMaximum(string.length + Int16Array.BYTES_PER_ELEMENT);

        if ( string.length > 2**(8*(Int8Array.BYTES_PER_ELEMENT * Int16Array.BYTES_PER_ELEMENT)) )
            throw new Error('string too long.');

        this.writeShort(string.length); // str length

        for ( let i = 0; i < string.length; ++i )
            this.writeByte(string.charCodeAt(i)); // chars        
    }

    writeDouble(num: number): void {
        throw new Error("Method not implemented.");
    }

    writeShort(num: number): void {
        this.checkByteMaximum(Int16Array.BYTES_PER_ELEMENT);

        this.dataView.setInt16(this.byteWrote, num);
        this.byteWrote += Int16Array.BYTES_PER_ELEMENT;
    }

    writeBoolean(bool: boolean): void {
        throw new Error("Method not implemented.");
    }

}