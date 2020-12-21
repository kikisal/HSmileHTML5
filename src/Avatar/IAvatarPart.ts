import Vector from "../Math/Vector";
import { AnimationStates, AvatarParts, AvatarRotations } from "./AvatarTypes";

export default interface IAvatarPart {
    animationState?: AnimationStates;
    avatarPart?: AvatarParts;
    tint?: number;
    alpha: number;
    stylePart?: number;
    rotation?: number;
    styleRotation?: AvatarRotations;
    currentAnimationFrame?: number;

    position: Vector;




    prepareSprites(): void;
    update(): void;
    draw(): void;
}