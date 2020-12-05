import IServerMessage from "../../../Messages/IServerMessage";
import IPacketEvent from "../IPacketEvent";

export default class SoundSettingsMessageEvent implements IPacketEvent {
    name = 'SoundSettingsMessageEvent';

    Parse(serverPacket: IServerMessage): void {
        const clientVolumes = serverPacket.popInt();

        for ( let i = 0; i < clientVolumes; ++i ) {
            const volumeValue = serverPacket.popInt();
            console.log("volume value: ", volumeValue);
        }

        const chatPreference = serverPacket.popBoolean();
        const inviteStatus = serverPacket.popBoolean();
        const focusPreference = serverPacket.popBoolean();
        const friendBarState = serverPacket.popInt();
        const unknown1 = serverPacket.popInt();
        const unknown2 = serverPacket.popInt();

        console.log('volume settings got.', clientVolumes);
    }
}