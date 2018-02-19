import { Ship } from "../models/ship.model";
import { Injectable } from "@angular/core";

const INITIAL_SHIP_COUNT: number = 3;
const INITIAL_BOARD_WIDTH: number = 10;
const INITIAL_BOARD_HEIGHT: number = 10;
const INITIAL_SHIPS_SUNK: number = 0;

const BATTLESHIP_SIZE: number = 5;
const DESTROYER_SIZE: number = 4;

let battleship = new Ship('Battleship', BATTLESHIP_SIZE);
let destroyer1 = new Ship('Destroyer', DESTROYER_SIZE);
let destroyer2 = new Ship('Destroyer', DESTROYER_SIZE);


export class GameState {
    ships: Ship[];
    shipsSunk: number;
    shipsCount: number;
    boardWidth: number;
    boardHeight: number;
}

@Injectable()
export class InitialGameState {
    ships: Ship[]
    shipsSunk: number
    shipsCount: number
    boardWidth: number
    boardHeight:number

    constructor(){
        this.ships = [new Ship('Battleship', BATTLESHIP_SIZE), new Ship('Destroyer', DESTROYER_SIZE), new Ship('Destroyer', DESTROYER_SIZE)];
        this.shipsSunk = INITIAL_SHIPS_SUNK;
        this.shipsCount = INITIAL_SHIP_COUNT;
        this.boardWidth = INITIAL_BOARD_WIDTH;
        this.boardHeight = INITIAL_BOARD_HEIGHT;
    }
} 



