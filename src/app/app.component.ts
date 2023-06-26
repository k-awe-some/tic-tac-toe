import { Component } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cells$ = this.gameService.cells$;
  winner$ = this.gameService.winner$;
  verdict$ = this.gameService.verdict$;

  constructor(private gameService: GameService) {}

  resetGame() {
    this.gameService.resetGame();
  }

  resetGameBotFirst() {
    this.gameService.resetGameBotFirst();
  }
}
