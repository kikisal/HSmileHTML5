import { Prepare } from "pixi.js";
import { AnimationStates, AvatarParts, AvatarRotations } from "./AvatarTypes";

export default interface IAvatarPart {
    animationState?: AnimationStates;
    avatarPart?: AvatarParts;
    tint?: number;
    stylePart?: number;
    rotation?: number;
    styleRotation?: AvatarRotations;
    currentAnimationFrame?: number;

    prepareSprites(): void;
    update(): void;
    draw(): void;
}