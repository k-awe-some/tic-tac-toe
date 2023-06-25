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
  verdict$ = new BehaviorSubject<string>('You are player X');
  isBotTurn$ = new BehaviorSubject<boolean>(false);
  winner$ = new BehaviorSubject<Mark | ''>('');
  winningLineResult$ = new BehaviorSubject<number[]>([]);

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

  private get cells() {
    return this.cells$.value;
  }

  resetGame(): void {
    this.cells$.next(Array(9).fill(''));
    this.winner$.next('');
    this.verdict$.next('You are player X');
    this.winningLineResult$.next([]);
    this.isBotTurn$.next(false);
  }

  registerMove(index: number, value: Mark): void {
    // only register if cell @ index is empty
    if (!this.cells[index]) {
      const updatedCells = [...this.cells];
      updatedCells[index] = value;
      this.cells$.next(updatedCells);
    }

    this.checkGameProgress(value);
  }

  private checkGameProgress(value: Mark): void {
    const winner = this.getWinner();

    // if winner
    if (winner) {
      this.setWinner(winner);
      return;
    }

    // if no moves left
    if (areAllValuesPresent(this.cells)) {
      this.verdict$.next(`It's a draw!`);
      return;
    }

    // if next turn should be bot's
    if (value === Mark.X) {
      this.registerBotMove();
    }
  }

  private registerBotMove(): void {
    this.isBotTurn$.next(true);
    this.verdict$.next('Bot is thinking... (O)');

    setTimeout(() => {
      this.registerMove(this.getRandomizedIndex(), Mark.O);
      this.isBotTurn$.next(false);

      if (!this.winner$.value) {
        this.verdict$.next('Your turn (X)');
      }
    }, 2000);
  }

  private getRandomizedIndex(): number {
    const emptyCellIndexes = this.cells
      .map((item, index) => !item && index)
      .filter(Boolean) as number[];
    return emptyCellIndexes[
      Math.floor(Math.random() * emptyCellIndexes.length)
    ];
  }

  private getWinner(): Mark | '' {
    for (const line of this.winningLines) {
      const [x, y, z] = line;

      // if cell values exist at these indexes
      if (areAllValuesPresent([this.cells[x], this.cells[y], this.cells[z]])) {
        // if matching, return winner
        if (
          this.cells[x] === this.cells[y] &&
          this.cells[x] === this.cells[z]
        ) {
          this.winningLineResult$.next(line);
          return this.cells[x];
        }
      }
    }

    return '';
  }

  private setWinner(winner: Mark): void {
    this.winner$.next(winner);
    this.verdict$.next(
      `${
        winner === Mark.X ? 'Congratulations, you won!' : 'Good luck next time!'
      }`
    );
  }
}
