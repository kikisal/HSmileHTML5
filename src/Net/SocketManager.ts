import PacketManager from "./Communication/PacketManager";
import IConnectionHandler from "./IConnectionHandler";
import ClientMessage from "./Messages/ClientMessage";
import ServerMessage from "./Messages/ServerMessage";


class DataHolder {
    packetId: number;

    static readonly HEADER_OFFSET: number = 6;

    packetManager: PacketManager;


    completed = false;
    // buffer[0] must contain body size and packetyId
    bodyBuffer: ArrayBuffer[] = [];

    firstPacket: boolean = true;

    fullBodyDataSize: number = 0; // body data size.
    currentDataLoaded: number = 0;

    constructor(packetId: number, packetManager: PacketManager) {
        this.packetId = packetId;
        this.packetManager = packetManager;
    }

    // buffer.slice(6);
    handle(buffer: ArrayBuffer): void {
        const dataView = new DataView(buffer);
        
        if ( this.firstPacket )
        {
            this.fullBodyDataSize = dataView.getInt32(0) - 2;
            this.firstPacket = false;
        } else {
            const bodySize = dataView.getInt32(0) - 2;
       
            if ( bodySize === 0 ) {
                this.completed = true;
                // end packet.
                const exportedBuffer = this.exportBuffer();


                this.packetManager.execute(this.packetId, new ServerMessage(exportedBuffer));
            } else {
                this.bodyBuffer.push(buffer.slice(DataHolder.HEADER_OFFSET));
            }
        }

    }

    isCompleted(): boolean {
        return this.completed;
    }

    exportBuffer(): ArrayBuffer {
        const buffer = new ArrayBuffer(this.fullBodyDataSize + DataHolder.HEADER_OFFSET);
        const dataView = new DataView(buffer);

        let offset = DataHolder.HEADER_OFFSET;

        dataView.setInt32(0, this.fullBodyDataSize);
        dataView.setInt16(Int32Array.BYTES_PER_ELEMENT, this.packetId);

        for ( let i = 0; i < this.bodyBuffer.length; ++i ) {
            const bodyBuffer = new DataView(this.bodyBuffer[i]);

            for ( let j = 0; j < bodyBuffer.byteLength; ++j ) {
                if ( offset + j >= buffer.byteLength )
                    break;

                dataView.setInt8(offset + j, bodyBuffer.getInt8(j));
            }

            offset += bodyBuffer.byteLength;
        }

        this.bodyBuffer = [];

        return dataView.buffer;
    }

}

export default class SocketManager {
    
    socket?: WebSocket;
    host: string;
    packetManager: PacketManager = new PacketManager;
    
    static readonly BODY_SIZE_TRESHOLD = 10000;
    
    handler?: IConnectionHandler;

    // For more data from server
    pendingServerMessages: DataHolder[] = [];
    
    
    constructor(host: string) {
        this.host = host;
    }

    init() {
        this.socket = new WebSocket(this.host);
        this.socket.binaryType = 'arraybuffer';


        
        this.socket.addEventListener('open', this.onOpen.bind(this));
        this.socket.addEventListener('message', this.onMessage.bind(this));
        this.socket.addEventListener('close', this.onClose.bind(this));
    }

    setCallBack(handler: IConnectionHandler): void {
        this.handler = handler;
    }

    onOpen(e: any): void {
        this.handler?.onConnect(e);
    }

    onMessage(e: any): void {
        const data = e.data;

        if ( !(data instanceof ArrayBuffer) )
            return;

        // console.log(new Int8Array(data));

        // this method should work synchronized.
        
        this.managePacket(data);
    }

    /*
        [body-size]
        [packetId]

        [body-size]
        [packet-id]
        [...body-content...]
        [0]
        [packet-id]
    */
    managePacket(data: ArrayBuffer): void {
        const dataView = new DataView(data);
        const packetId = dataView.getInt16(Int32Array.BYTES_PER_ELEMENT);

        const packetHandling = this.getPending(packetId);


        if ( packetHandling ) {
            packetHandling.handle(data);

            if ( packetHandling.isCompleted() )
                this.pendingServerMessages.splice(this.pendingServerMessages.indexOf(packetHandling), 1);

        } else {
            const dataHolder = new DataHolder(packetId, this.packetManager);

            this.pendingServerMessages.push( dataHolder );
            dataHolder.handle(data);
        }

        
    }

    getPending(packetId: number): DataHolder | null {
        for ( let i = 0; i < this.pendingServerMessages.length; ++i ) {
            if ( this.pendingServerMessages[i].packetId === packetId )
                return this.pendingServerMessages[i];
        }

        return null;
    }

    

    onClose(e: any): void {
        if ( e.code === 1006 )
            this.init(); // re load client.
    }

    Send( clientMessage: ClientMessage ): void {
        this.socket?.send(clientMessage.getBuffer());
    }
}