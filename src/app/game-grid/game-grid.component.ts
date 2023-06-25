import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GameService, Mark } from '../game.service';

@Component({
  selector: 'app-game-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.scss'],
})
export class GameGridComponent implements OnInit {
  cells$ = this.gameService.cells$;
  winner$ = this.gameService.winner$;
  isBotTurn$ = this.gameService.isBotTurn$;
  winningLineResult$ = this.gameService.winningLineResult$;

  readonly Mark = Mark;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.resetGame();
  }

  registerHumanMove(index: number) {
    this.gameService.registerMove(index, Mark.X);
  }
}
