export class Ship {
    public name: string;
    public size: number;
    public locations: Array<string>;
    public isSunk: boolean;

    constructor(name: string, size: number){
        this.name = name;
        this.size = size;
        this.locations = [];
        this.isSunk = false;
    }
}