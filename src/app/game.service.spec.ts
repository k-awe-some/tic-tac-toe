import { TestBed } from '@angular/core/testing';

import { GameService, Mark } from './game.service';

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
      expect(service.cells[5]).toEqual('O');
    });

    it('should define winner if a matching line is found', () => {
      service.cells$.next(currentCells);
      service.registerMove(0, Mark.X);
      expect(service.winner$.value).toEqual('X');
    });

    it('should not define winner if no matching line is found', () => {
      service.cells$.next(currentCells);
      service.registerMove(7, Mark.X);
      expect(service.winner$.value).toEqual('');
    });
  });
});
