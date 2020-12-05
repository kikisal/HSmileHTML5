import IServerMessage from "../../Messages/IServerMessage";

export default interface IPacketEvent {
    name: string;
    Parse(serverPacket: IServerMessage): void;
}