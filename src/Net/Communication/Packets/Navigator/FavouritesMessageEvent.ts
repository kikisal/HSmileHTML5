import IServerMessage from "../../../Messages/IServerMessage";
import IPacketEvent from "../IPacketEvent";

export default class FavouritesMessageEvent implements IPacketEvent {
    
    name = 'FavouritesMessageEvent';
    
    Parse( serverPacket: IServerMessage ): void {
        
        const num = serverPacket.popInt();
        const favouriteIDs = serverPacket.popInt();

        for ( let i = 0; i < favouriteIDs; ++i ) {
            const id = serverPacket.popInt();
            // do something with the id.
        }
    }
}