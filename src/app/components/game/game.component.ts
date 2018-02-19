import { Component, OnInit } from '@angular/core';
import { GameState, INITIAL_GAME_STATE } from '../../state/initial-state';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 10;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public gameState: GameState;
  public rows: Array<string>;
  public cols: Array<number>;
  public coordinates;
  constructor() {
    this.gameState = INITIAL_GAME_STATE
    this.rows = [];
    this.cols = [];
    this.coordinates = {};
  }

  ngOnInit() {
    for (let i = 65; i <= 65 + this.gameState.boardHeight; i++) {
      let char = String.fromCharCode(i)
      this.rows.push(char);

    }
    for (let j = 1; j <= this.gameState.boardWidth; j++) {
      this.cols.push(j)
      let char = String.fromCharCode(64 + j)
      this.coordinates[char + j] = {
        hit: '',
        sunk: '',
        miss: ''
      }
    }

    this.setShipLocations();

    console.log(this.gameState.ships)

  }

  checkForCollision(locations){
    for (var i = 0; i < this.gameState.ships.length; i++) {
			let ship = this.gameState.ships[i];
			for (var j = 0; j < ship.locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
  }

  setShipLocations() {
    var locations = [];
    for (let ship of this.gameState.ships) {
      do {
        locations = this.getLocations(ship);
      } while (this.checkForCollision(locations));
      ship.locations = locations;
    }
  }

  getLocations(ship) {
    let direction = Math.floor(Math.random() * 2);

    let row = 0;
    let col = 0;
    if (direction === 1) { //horizontl
      row = Math.floor(Math.random() * this.gameState.boardHeight) + 1;
      col = Math.floor(Math.random() * (this.gameState.boardWidth - ship.size + 1)) + 1;

    } else { // vertical
      row = Math.floor(Math.random() * (this.gameState.boardHeight - ship.size + 1)) + 1;
      col = Math.floor(Math.random() * this.gameState.boardWidth) + 1;
    }

    let shipLocations = [];

    for (let i = 0; i < ship.size; i++) {
      if (direction === 1) {
        shipLocations.push(this.rows[row] + "" + (col + i));
      } else {
        shipLocations.push((this.rows[row + i]) + "" + col);
      }
    }

    return shipLocations
  }




  fire(coord) {
    let hit = false;
   for(let ship of this.gameState.ships){
      for( let loc of ship.locations){
        if(loc === coord){
          hit = true;
          break
        }
      }
   }
    let el = document.getElementById(coord)
    if(hit){
      el.setAttribute('class', 'hit');

    }else {
      el.setAttribute('class', 'miss');
    }
    console.log(el)
  }

  // getClass(coord){
  //   console.log(coord)
  //   console.log(this.coordinates['' + coord])
  //   // this.coordinates[coord].hit ? 'hit' : this.coordinates[coord].sunk ? 'sink' : 'def'
  // }
}
