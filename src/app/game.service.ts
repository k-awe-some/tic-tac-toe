import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { areAllValuesPresent, getRandomItem } from './game.util';

export enum Mark {
  X = 'X',
  O = 'O',
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cells$ = new BehaviorSubject<(Mark | '')[]>([]);
  verdict$ = new BehaviorSubject<string>('');
  isBotTurn$ = new BehaviorSubject<boolean>(false);
  winner$ = new BehaviorSubject<Mark | ''>('');
  winningLineResult$ = new BehaviorSubject<number[]>([]);

  private firstMoveIndex: number | undefined;
  private cornerIndexes = [0, 2, 6, 8];
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

  resetGameBotFirst(): void {
    this.resetProps();
    this.registerBotMove();
  }

  resetGame(): void {
    this.resetProps();
    this.verdict$.next('Your turn (X)');
    this.isBotTurn$.next(false);
  }

  private resetProps() {
    this.cells$.next(Array(9).fill(''));
    this.winner$.next('');
    this.winningLineResult$.next([]);
    this.cornerIndexes = [0, 2, 6, 8];
  }

  registerMove(index: number, value: Mark): void {
    // only register if cell @ index is empty
    if (!this.cells[index]) {
      const updatedCells = [...this.cells];
      updatedCells[index] = value;
      this.cells$.next(updatedCells);

      if (this.cornerIndexes.includes(index)) {
        this.cornerIndexes = this.cornerIndexes.filter(
          (item) => item !== index
        );
      }
    }

    if (!this.isBotTurn$.value && this.cells.filter(Boolean).length === 1) {
      this.firstMoveIndex = this.cells.indexOf(value);
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
      const nextIndex = this.getOptimalIndex();
      this.registerMove(nextIndex, Mark.O);
      this.isBotTurn$.next(false);

      if (!this.winner$.value && !areAllValuesPresent(this.cells)) {
        this.verdict$.next('Your turn (X)');
      }
    }, 2000);
  }

  private getOptimalIndex(): number {
    return (
      this.getSecondMoveIndex() ??
      this.getLastIndexOfNearWin(Mark.O) ??
      this.getLastIndexOfNearWin(Mark.X) ??
      this.getRandomCornerIndex() ??
      this.getRandomizedIndex()
    );
  }

  private getSecondMoveIndex(): number | null {
    if (this.firstMoveIndex !== undefined) {
      const secondMoveIndex =
        this.firstMoveIndex === 4 ? this.getRandomCornerIndex() : 4;
      this.firstMoveIndex = undefined;
      return secondMoveIndex;
    }

    return null;
  }

  private getRandomCornerIndex(): number | null {
    const cornerIndex = getRandomItem(this.cornerIndexes);
    this.cornerIndexes = this.cornerIndexes.filter(
      (item) => item !== cornerIndex
    );
    return cornerIndex;
  }

  private getRandomizedIndex(): number {
    const emptyCellIndexes = this.cells
      .map((item, index) => !item && index)
      .filter(Boolean) as number[];
    return getRandomItem(emptyCellIndexes) as number;
  }

  private getLastIndexOfNearWin(value: Mark): number | null {
    for (const line of this.winningLines) {
      const [x, y, z] = line;
      const currentLine = [this.cells[x], this.cells[y], this.cells[z]];
      const existingValue = currentLine.filter(Boolean);

      if (
        existingValue.length === 2 &&
        existingValue[0] === value &&
        existingValue[1] === value
      ) {
        return line[currentLine.indexOf('')];
      }
    }

    return null;
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
