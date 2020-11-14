export default class Vector {

    x: number;
    y: number;
    z: number;

    constructor(x?: number, y?: number, z?: number) {
        if ( !x && !y && !z )
            this.collapse();

        this.x = x ? x : 0;
        this.y = y ? y : 0;
        this.z = z ? z : 0;
    }

    set(x: number, y: number, z?: number) {
        this.x = x;
        this.y = y;
        if ( z )  
            this.z = z;
    }

    collapse() {
        [this.x, this.y, this.z] = [0, 0, 0];
    }
}