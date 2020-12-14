import IServerMessage from "../Messages/IServerMessage";
import IPacketEvent from "./Packets/IPacketEvent";

type PacketMap = {
    id: number;
    packetEvent: IPacketEvent;
    callback?: PacketCallback
};

type PacketCallback = (e: IPacketEvent) => void;

export default class PacketManager {

    packetList: PacketMap[] = [];

    addMessageEvent(packetId: IPacketEvent, callback: PacketCallback): void {
        this.registerPacket(packetId, callback);
    }

    getPackets(id: number): PacketMap[] {
        const packets = [];
        for ( let i = 0; i < this.packetList.length; ++i ) {
            const packet = this.packetList[i];
            if ( packet.id === id )
                packets.push(packet);
        }

        return packets;
    }

    getPacket(id: number): PacketMap | null {
        for ( let i = 0; i < this.packetList.length; ++i ) {
            if ( this.packetList[i].id === id )
                return this.packetList[i];
        }

        return null;
    }

    execute( id: number, serverMessage: IServerMessage ): void {
        const packets = this.getPackets(id);
        if ( packets.length < 1 )
            throw new Error(`could not find packet id: ${id}`);
        
        for ( let i = 0; i < packets.length; ++i ) {
            const packet = packets[i];

            if ( true ) // debug === true
                console.log("Handling packet: ", packet.packetEvent.name || 'Unknown', id);

            packet.packetEvent.Parse(i === 0 ? serverMessage : serverMessage.clone());
            if ( !packet.callback )
                continue;
            
            packet.callback(packet.packetEvent);
        }

    }

    
    registerPacket(packetEvent: IPacketEvent, callback?: PacketCallback): void {
        this.packetList.push({
            id: packetEvent.packetId, 
            packetEvent: packetEvent, 
            callback: callback
        });
    }
}