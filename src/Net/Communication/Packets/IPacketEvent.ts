import IServerMessage from "../../Messages/IServerMessage";

export default interface IPacketEvent {
    Parse(serverPacket: IServerMessage): void;
}