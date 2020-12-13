import IServerMessage from "../../Messages/IServerMessage";

export default interface IPacketEvent {
    name: string;
    packetId: number;
    
    Parse(serverPacket: IServerMessage): void;

}