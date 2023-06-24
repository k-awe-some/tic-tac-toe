import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { areAllValuesPresent } from './game.util';

export enum Mark {
  X = 'X',
  O = 'O',
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cells$ = new BehaviorSubject<(Mark | '')[]>([...Array(9).fill('')]);
  verdict$ = new BehaviorSubject<string>('');
  isBotTurn$ = new BehaviorSubject<boolean>(false);
  private winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  get cells() {
    return this.cells$.value;
  }

  resetGame() {
    this.cells$.next(Array(9).fill(''));
    this.verdict$.next('');
  }

  registerMove(index: number, value: Mark) {
    // only register if cell @ index is empty
    if (!this.cells[index]) {
      const updatedCells = [...this.cells];
      updatedCells[index] = value;
      this.cells$.next(updatedCells);
    }

    // check for winner
    const winner = this.getWinner();
    if (winner) {
      this.verdict$.next(
        `${
          winner === Mark.X
            ? 'Congratulations, you won!'
            : 'Good luck next time!'
        }`
      );
      this.isBotTurn$.next(false);
      return;
    }

    if (areAllValuesPresent(this.cells)) {
      return;
    }

    // register bot move
    if (value === Mark.X) {
      console.log('bot thinking...');
      this.isBotTurn$.next(true);
      setTimeout(() => {
        this.registerBotMove();
        this.isBotTurn$.next(false);
      }, 2000);
    }
  }

  private registerBotMove() {
    const emptyCellIndexes = this.cells
      .map((item, index) => !item && index)
      .filter(Boolean) as number[];
    const randomizedIndex =
      emptyCellIndexes[Math.floor(Math.random() * emptyCellIndexes.length)];

    this.registerMove(randomizedIndex, Mark.O);
  }

  private getWinner(): Mark | '' {
    // check against each winning line
    for (const [index, line] of this.winningLines.entries()) {
      const [x, y, z] = line;

      // if cell values exist at these indexes
      if (areAllValuesPresent([this.cells[x], this.cells[y], this.cells[z]])) {
        // if matching, return winner
        if (
          this.cells[x] === this.cells[y] &&
          this.cells[x] === this.cells[z]
        ) {
          return this.cells[x];
        }

        // else, remove non-matching line
        this.winningLines = this.winningLines.filter((_, i) => i !== index);
      }
    }

    return '';
  }
}
