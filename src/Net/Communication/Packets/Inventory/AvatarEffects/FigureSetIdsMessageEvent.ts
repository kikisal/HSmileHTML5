import IServerMessage from "../../../../Messages/IServerMessage";
import IPacketEvent from "../../IPacketEvent";

export default class FigureSetIdsMessageEvent  implements IPacketEvent {
    name = 'FigureSetIdsMessageEvent';
    
    Parse( serverPacket: IServerMessage ): void {
     
        const clothingParts = serverPacket.popInt();
        console.log('clothing parts: ', clothingParts);
        for ( let i = 0; i < clothingParts; ++i ) {
            const partId = serverPacket.popInt();
            console.log(partId);
        }

        const clothingParts_parts = serverPacket.popInt();
        for ( let i = 0; i < clothingParts_parts; ++i ) {
            const part = serverPacket.popString();
            console.log(part);
        }
    }
}