import IServerMessage from "../../../../Messages/IServerMessage";
import IPacketEvent from "../../IPacketEvent";

export default class AvatarEffectsMessageEvent implements IPacketEvent {
    name = 'AvatarEffectsMessageEvent';
    
    Parse( serverPacket: IServerMessage ): void {
        const effects = serverPacket.popInt(); // total effects in inventory
        for ( let i = 0; i < effects; ++i ) {
            const effectId = serverPacket.popInt();
            const type = serverPacket.popInt();
            const duration = serverPacket.popInt();
            const quantity = serverPacket.popInt();
            const timeLeeft = serverPacket.popInt();
            const permanent = serverPacket.popBoolean();
        }
        
    }
}