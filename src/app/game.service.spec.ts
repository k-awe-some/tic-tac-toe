import { TestBed } from '@angular/core/testing';

import { GameService, Mark } from './game.service';
import { areAllValuesPresent } from './game.util';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#registerMove', () => {
    const currentCells: (Mark | '')[] = [
      '',
      Mark.O,
      Mark.O,
      '',
      Mark.X,
      Mark.O,
      '',
      '',
      Mark.X,
    ];

    it('should add mark value into the correct cell', () => {
      service.registerMove(5, Mark.O);
      expect(service.cells$.value[5]).toEqual('O');
    });

    it('should define winner if a matching line is found', () => {
      service.cells$.next(currentCells);
      service.registerMove(0, Mark.X);
      expect(service.verdict$.value).toEqual('Congratulations, you won!');
    });

    it('should not define winner if no matching line is found', () => {
      service.cells$.next(currentCells);
      service.registerMove(7, Mark.X);
      expect(service.verdict$.value).toEqual('Bot is thinking... (O)');
    });

    it('should register bot move after human move', () => {
      service.cells$.next(currentCells);
      service.registerMove(7, Mark.X);
      expect(service.isBotTurn$.value).toBeTrue();
    });

    it('should not register bot move after human move if no empty cell is left', () => {
      service.cells$.next([
        Mark.X,
        Mark.O,
        '',
        Mark.X,
        Mark.X,
        Mark.O,
        Mark.O,
        Mark.X,
        Mark.O,
      ]);
      service.registerMove(2, Mark.X);
      expect(service.isBotTurn$.value).toBeFalse();
    });
  });

  describe('#resetGame', () => {
    it('should reset cell values', () => {
      service.resetGame();
      expect(areAllValuesPresent(service.cells$.value)).toBeFalse();
    });

    it('should reset verdict value', () => {
      service.resetGame();
      expect(service.verdict$.value).toEqual('Your turn (X)');
    });

    it('should reset winner value', () => {
      service.resetGame();
      expect(service.winner$.value).toEqual('');
    });

    it('should reset winning line value', () => {
      service.resetGame();
      expect(service.winningLineResult$.value.length).toEqual(0);
    });

    it('should reset bot turn value', () => {
      service.resetGame();
      expect(service.isBotTurn$.value).toBeFalse();
    });
  });
});
