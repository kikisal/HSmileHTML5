import { AnimationStates, AvatarParts, AvatarRotations } from "./AvatarTypes";

export default interface IAvatarPart {
    animationState?: AnimationStates;
    avatarPart?: AvatarParts;
    stylePart?: number;
    rotation?: number;
    styleRotation?: AvatarRotations;

}