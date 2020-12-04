import IServerMessage from "../Messages/IServerMessage";
import Incoming from "./Events/Incoming";
import AuthenticationOKMessageEvent from "./Packets/Handshake/AuthenticationOKMessageEvent";
import PongMessage from "./Packets/Handshake/PongMessageEvent";
import IPacketEvent from "./Packets/IPacketEvent";

type PacketMap = {
    id: number;
    packetEvent: IPacketEvent;
};

export default class PacketManager {

    packetList: PacketMap[] = [];

    constructor() {
        this.initPackets();
    }

    initPackets(): void {
        this.registerHandshakePackets();
    }

    registerPacket(id: number, packetEvent: IPacketEvent): void {
        this.packetList.push({id: id, packetEvent: packetEvent});
    }

    registerHandshakePackets(): void {
        this.registerPacket(Incoming.AuthenticationOKMessageComposer, new AuthenticationOKMessageEvent());
        this.registerPacket(Incoming.PongMessageComposer, new PongMessage());
    }

    getPacket(id: number): IPacketEvent | null {
        for ( let i = 0; i < this.packetList.length; ++i ) {
            if ( this.packetList[i].id === id )
                return this.packetList[i].packetEvent;
        }

        return null;
    }

    execute( id: number, serverMessage: IServerMessage ): void {
        const packet = this.getPacket(id);
        if ( !packet )
            throw new Error(`could not find packet id: ${id}`);
        
        
        packet.Parse(serverMessage);        
    }
}