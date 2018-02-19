import { Ship } from "../models/ship.model";

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

export const INITIAL_GAME_STATE: GameState = {
    ships: [battleship, destroyer1, destroyer2],
    shipsSunk:INITIAL_SHIPS_SUNK,
    shipsCount: INITIAL_SHIP_COUNT,
    boardWidth: INITIAL_BOARD_WIDTH,
    boardHeight: INITIAL_BOARD_HEIGHT
} 



