import { Component } from '@angular/core';
import { GameService, Mark } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isBotTurn$ = this.gameService.isBotTurn$;
  winner$ = this.gameService.winner$;
  readonly Mark = Mark;

  constructor(private gameService: GameService) {}

  resetGame() {
    this.gameService.resetGame();
  }
}
