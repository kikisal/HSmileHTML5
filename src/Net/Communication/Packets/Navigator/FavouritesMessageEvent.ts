import IServerMessage from "../../../Messages/IServerMessage";
import Incoming from "../../Events/Incoming";
import IPacketEvent from "../IPacketEvent";

export default class FavouritesMessageEvent implements IPacketEvent {
    
    name = 'FavouritesMessageEvent';
    packetId = Incoming.FavouritesMessageComposer;
    
    Parse( serverPacket: IServerMessage ): void {
        
        const num = serverPacket.popInt();
        const favouriteIDs = serverPacket.popInt();

        for ( let i = 0; i < favouriteIDs; ++i ) {
            const id = serverPacket.popInt();
            // do something with the id.
        }
    }
}