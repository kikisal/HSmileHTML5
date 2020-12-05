import Outcoming from "./Communication/Events/Outcoming";
import PacketManager from "./Communication/PacketManager";
import IConnectionHandler from "./IConnectionHandler";
import ClientMessage from "./Messages/ClientMessage";
import ServerMessage from "./Messages/ServerMessage";

export default class SocketManager {
    
    socket?: WebSocket;
    host: string;
    packetManager: PacketManager = new PacketManager;
    handler?: IConnectionHandler;
    
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

        const serverMessage = new ServerMessage(data);
        this.packetManager.execute(serverMessage.packetId, serverMessage);
    }

    onClose(e: any): void {
        if ( e.code === 1006 )
            this.init(); // re load client.
    }

    Send( clientMessage: ClientMessage ): void {
        this.socket?.send(clientMessage.getBuffer());
    }
}