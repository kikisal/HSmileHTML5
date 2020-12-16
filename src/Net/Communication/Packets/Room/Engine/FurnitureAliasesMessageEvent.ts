import IServerMessage from "../../../../Messages/IServerMessage";
import Incoming from "../../../Events/Incoming";
import IPacketEvent from "../../IPacketEvent";

export default class FurnitureAliasesMessageEvent implements IPacketEvent {
    name: string = 'FurnitureAliasesMessageEvent';
    packetId = Incoming.FurnitureAliasesMessageComposer;


    Parse(serverPacket: IServerMessage): void {
        const num = serverPacket.popInt();
    }
}