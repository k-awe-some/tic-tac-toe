import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService, Mark } from '../game.service';

@Component({
  selector: 'app-game-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.scss'],
})
export class GameGridComponent {
  cells$ = this.gameService.cells$;
  winner$ = this.gameService.winner$;
  isBotTurn$ = this.gameService.isBotTurn$;
  winningLineResult$ = this.gameService.winningLineResult$;

  readonly Mark = Mark;

  constructor(private gameService: GameService) {}

  registerHumanMove(index: number) {
    this.gameService.registerMove(index, Mark.X);
  }
}
