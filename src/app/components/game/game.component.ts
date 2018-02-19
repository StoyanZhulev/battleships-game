import { Component, OnInit } from '@angular/core';
import { GameState,  InitialGameState } from '../../state/initial-state';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Ship } from '../../models/ship.model';

const EMPTY_STRING = '';
const A_ASCII_CODE = 65;
const HIT_INVALID_LOCATION = 'You tried to hit invalid location!';
const ALREADY_HIT_LOCATION = 'You already hit that location'
const YOU_MISSED = 'You missed!';
const YOU_SUNK = 'You sunk ';
const YOU_HIT = 'You hit ';
const SHIP = ' ship';
const SHOW_COMMAND = 'show';

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
  private shotsTaken: number;

  public messageForUser: string;

  public initialShips: Ship[];
  public shipsSunk: Ship[];

  public fireLocation: string;

  public youWon: boolean;

  public showCheat: boolean;

  constructor(
    private router: Router
  ) {
  
  }

  ngOnInit() {
    this.gameState = new InitialGameState();
    this.rows = [];
    this.cols = [];
    this.coordinates = {};
    this.shotsTaken = 0;
    this.youWon = false;
    this.messageForUser = EMPTY_STRING;
    this.initialShips = {...this.gameState}.ships;
    this.shipsSunk = [];
    this.showCheat = false;
  
    this.setCoordinates();
    this.setShipLocations();


  }


  setCoordinates(){
    for (let i = A_ASCII_CODE; i < A_ASCII_CODE + this.gameState.boardHeight; i++) {
      let char = String.fromCharCode(i)
      this.rows.push(char);

    }
    for (let j = 1; j <= this.gameState.boardWidth; j++) {
      this.cols.push(j)
      let char = String.fromCharCode(64 + j)
      this.coordinates[char + j] = true;
    }
  }

  checkIfLocationIsTaken(locations) {
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
      } while (this.checkIfLocationIsTaken(locations));
      ship.locations = locations;
    }
  }

  getLocations(ship) {

    let direction = Math.floor(Math.random() * 2);

    let row = 0;
    let col = 0;
    if (direction === 1) { //horizontl
      row = Math.floor(Math.random() * (this.gameState.boardHeight - 1)) + 1;
      col = Math.floor(Math.random() * (this.gameState.boardWidth - (ship.size + 2))) + 1;

    } else { // vertical
      row = Math.floor(Math.random() * (this.gameState.boardHeight - (ship.size + 2))) + 1;
      col = Math.floor(Math.random() * (this.gameState.boardWidth - 1)) + 1;
    }

    let shipLocations = [];

    for (let i = 0; i < ship.size; i++) {
      if (direction === 1) {
        shipLocations.push(this.rows[row] + (col + i));
      } else {
        shipLocations.push((this.rows[row + i]) + col);
      }
    }

    return shipLocations
  }




  fire(coord) {


    if (!this.youWon) {

      let hit = false;
      let sunk = false;

      let location = EMPTY_STRING;

      this.showCheat = false;
      if (coord) {
        location = coord;
      } else {
        if(SHOW_COMMAND === this.fireLocation){
          this.showCheat = true;
        }
        if (this.fireLocation.length >= 2) {
          let letter = this.fireLocation[0];
          let l = letter.toUpperCase();
          let num = Number(this.fireLocation.substring(1, this.fireLocation.length));
          if (num > 0 && num <= 10) {
            location = l + num;
          }

        }
      }


      if (location.length >= 2 && location[0].charCodeAt(0) >= A_ASCII_CODE && location[0].charCodeAt(0) < A_ASCII_CODE + this.gameState.boardWidth) {
        this.shotsTaken++;
        let el = document.getElementById('' + location)

        if (el.getAttribute('class') === 'def') {
          for (let ship of this.gameState.ships) {
            if (!ship.isSunk) {
              for (let loc of ship.locations) {
                if (loc === location) {
                  hit = true;
                  ship.size = ship.size - 1;
                  if (ship.size < 1) {
                    sunk = true;
                    this.shipsSunk.push(ship);
                    this.gameState.shipsSunk = this.gameState.shipsSunk + 1;
                    ship.isSunk = true;
                    for (let i = 0; i < ship.locations.length; i++) {
                      document.getElementById(ship.locations[i]).setAttribute('class', 'sunk');
                    }
                    this.messageForUser = YOU_SUNK + ship.name + SHIP
                  } else {
                    this.messageForUser = YOU_HIT + ship.name + SHIP
                  }
                  break
                }
              }
            }
          }
          if (sunk) {
            el.setAttribute('class', 'sunk');
          } else if (hit) {
            el.setAttribute('class', 'hit');
          } else if (!sunk) {
            this.messageForUser = YOU_MISSED;
            el.setAttribute('class', 'miss');
          }
        } else {
          this.messageForUser = ALREADY_HIT_LOCATION;
        }

       
      } else {
        if(!this.showCheat){
          this.messageForUser = HIT_INVALID_LOCATION;
        }
      }



      if (this.gameState.shipsSunk === this.gameState.shipsCount) {
        let obj = new InitialGameState();
        console.log(obj)
        this.youWon = true;
      }

      this.fireLocation = EMPTY_STRING

    }
  }


  playAgain() {
      this.router.navigateByUrl('')

  }

}


