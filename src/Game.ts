import RoomManager from "./HSmile/Room/RoomManager";

export default class Game {

    roomManager: RoomManager;

    constructor() {
        this.roomManager = new RoomManager();
    }

    gameLoop(): void {

    }
}