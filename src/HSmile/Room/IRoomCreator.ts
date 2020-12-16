export interface IRoomCreator {
    initializeRoom(): void;
    // getRoom(roomId: number): IRoomInstance;
    disposeRoom(roomId: number): void;
    
}