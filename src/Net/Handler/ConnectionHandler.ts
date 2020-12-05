import { HSmile } from "../../HSmileMain";
import Outcoming from "../Communication/Events/Outcoming";
import IConnectionHandler from "../IConnectionHandler";
import ClientMessage from "../Messages/ClientMessage";

export default class ConnectionHandler implements IConnectionHandler {
        

    getSSOTicket(): string {
        return '123412345'; // Tonino SSOTicket.
    }

    onConnect(e: any): void {
        console.log('connection opened.');

        const hsmile = HSmile.get();

        // generate-sso ticket
        const ssoTicket = this.getSSOTicket();

        // start off by sending sso ticket to server.
        const clientMessage = new ClientMessage( Outcoming.SSOTicketMessageEvent );
        clientMessage.writeString(ssoTicket);

        hsmile.socketManager.Send(clientMessage);
    }
}