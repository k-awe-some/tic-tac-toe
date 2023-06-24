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
  verdict$ = this.gameService.verdict$;
  isBotTurn$ = this.gameService.isBotTurn$;

  constructor(private gameService: GameService) {}

  registerHumanMove(index: number) {
    console.log(`Register X into cells @ index ${index}!`);
    this.gameService.registerMove(index, Mark.X);
  }
}
