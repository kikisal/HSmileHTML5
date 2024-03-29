import SocketManager from "../SocketManager";
import IServerMessage from "./IServerMessage";

export default class ServerMessage implements IServerMessage {
    
    data: ArrayBuffer;

    dataView: DataView;

    offset: number = 0;
    
    sizePacket: number = 0;
    
    packetId: number = 0; // packet header id


    constructor( data: ArrayBuffer ) {
        this.data = data;
        this.dataView = new DataView(data);

        this.sizePacket = this.popInt();
        this.packetId = this.popShort();

    }
    clone(): IServerMessage {
        const arrayBuffer = new ArrayBuffer(this.data.byteLength);
        const dataView = new DataView(arrayBuffer);
        for ( let i = 0; i < this.data.byteLength; ++i )
            dataView.setInt8(i * Int8Array.BYTES_PER_ELEMENT, this.dataView.getInt8(i * Int8Array.BYTES_PER_ELEMENT));

        const serverMessage = new ServerMessage(arrayBuffer);
        return serverMessage;
    }


    popInt(): number {
        const r = this.dataView.getInt32(this.offset);
        this.offset += Int32Array.BYTES_PER_ELEMENT;
        return r;
    }


    popString(): string {
        const strLen = this.popShort();
        let str = '';
        for ( let i = 0; i < strLen; ++i )
            str += String.fromCharCode(this.popByte());

        return str;
    }

    popDouble(): number {
        throw new Error("Method not implemented.");
    }

    popShort(): number {
        const r = this.dataView.getInt16(this.offset);
        this.offset += Int16Array.BYTES_PER_ELEMENT;
        return r;
    }

    popBoolean(): boolean {
        const r = this.dataView.getInt8(this.offset);
        this.offset += Int8Array.BYTES_PER_ELEMENT;
        return r ? true : false;
    }

    
    popByte(): number {
        const r = this.dataView.getInt8(this.offset);
        this.offset += Int8Array.BYTES_PER_ELEMENT;
        return r;
    }


}
