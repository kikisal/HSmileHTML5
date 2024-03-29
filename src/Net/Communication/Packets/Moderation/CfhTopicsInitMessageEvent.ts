import IServerMessage from "../../../Messages/IServerMessage";
import Incoming from "../../Events/Incoming";
import IPacketEvent from "../IPacketEvent";

export default class CfhTopicsInitMessageEvent implements IPacketEvent {
    name = 'CfhTopicsInitMessageEvent';
    packetId = Incoming.CfhTopicsInitMessageComposer;

    Parse(serverPacket: IServerMessage): void {

        /*
            base.WriteInteger(6);
            base.WriteString("sex_and_pii");
            base.WriteInteger(8);
            base.WriteString("sexual_webcam_images");
            base.WriteInteger(1);
            base.WriteString("mods");
            base.WriteString("sexual_webcam_images_auto");
            base.WriteInteger(2);
            base.WriteString("mods");
            base.WriteString("explicit_sexual_talk");
            base.WriteInteger(3);
            base.WriteString("mods");
            base.WriteString("cybersex");
            base.WriteInteger(4);
            base.WriteString("mods");
            base.WriteString("cybersex_auto");
            base.WriteInteger(5);
            base.WriteString("mods");
            base.WriteString("meet_some");
            base.WriteInteger(6);
            base.WriteString("mods");
            base.WriteString("meet_irl");
            base.WriteInteger(7);
            base.WriteString("mods");
            base.WriteString("email_or_phone");
            base.WriteInteger(8);
            base.WriteString("mods");
            base.WriteString("scamming");
            base.WriteInteger(3);
            base.WriteString("stealing");
            base.WriteInteger(9);
            base.WriteString("mods");
            base.WriteString("scamsites");
            base.WriteInteger(10);
            base.WriteString("mods");
            base.WriteString("selling_buying_accounts_or_furni");
            base.WriteInteger(11);
            base.WriteString("mods");
            base.WriteString("trolling");
            base.WriteInteger(11);
            base.WriteString("hate_speech");
            base.WriteInteger(12);
            base.WriteString("mods");
            base.WriteString("violent_roleplay");
            base.WriteInteger(13);
            base.WriteString("mods");
            base.WriteString("swearing");
            base.WriteInteger(14);
            base.WriteString("auto_reply");
            base.WriteString("drugs");
            base.WriteInteger(15);
            base.WriteString("mods");
            base.WriteString("gambling");
            base.WriteInteger(16);
            base.WriteString("mods");
            base.WriteString("self_threatening");
            base.WriteInteger(17);
            base.WriteString("mods");
            base.WriteString("mild_staff_impersonation");
            base.WriteInteger(18);
            base.WriteString("mods");
            base.WriteString("severe_staff_impersonation");
            base.WriteInteger(19);
            base.WriteString("mods");
            base.WriteString("habbo_name");
            base.WriteInteger(20);
            base.WriteString("mods");
            base.WriteString("minors_access");
            base.WriteInteger(21);
            base.WriteString("mods");
            base.WriteString("bullying");
            base.WriteInteger(22);
            base.WriteString("guardians");
            base.WriteString("interruption");
            base.WriteInteger(2);
            base.WriteString("flooding");
            base.WriteInteger(23);
            base.WriteString("mods");
            base.WriteString("doors");
            base.WriteInteger(24);
            base.WriteString("mods");
            base.WriteString("room");
            base.WriteInteger(1);
            base.WriteString("room_report");
            base.WriteInteger(25);
            base.WriteString("mods");
            base.WriteString("help");
            base.WriteInteger(2);
            base.WriteString("help_habbo");
            base.WriteInteger(26);
            base.WriteString("auto_reply");
            base.WriteString("help_payments");
            base.WriteInteger(27);
            base.WriteString("auto_reply");
        */

        console.log('caricando template di segnalazione.');
    }
    
}