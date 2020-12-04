import PacketManager from "./Communication/PacketManager";
import ServerMessage from "./Messages/ServerMessage";

export default class SocketManager {
    
    socket?: WebSocket;
    host: string;
    packetManager: PacketManager = new PacketManager;
    
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

    onOpen(e: any): void {
        console.log('ws conn opened');
        setTimeout(() => {
            this.socket?.send("a");
        }, 1000);
    }

    onMessage(e: any): void {
        const data = e.data;
        if ( !(data instanceof ArrayBuffer) )
            return;

        console.log(new Int8Array(data));

        const serverMessage = new ServerMessage(data);
        
        
    }

    onClose(e: any): void {
        console.log('connection closed.');
    }
}