import Vector from "./Vector";

export default class Transform {
    /**
     * 
     * @param point point to be transformed 
     */
    static toIso(point: Vector): Vector {
        return new Vector( 
            (point.x - point.y),
            (point.x + point.y),
            -point.z
        );

    }


}