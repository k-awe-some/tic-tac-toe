import { Component } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isBotTurn$ = this.gameService.isBotTurn$;
  verdict$ = this.gameService.verdict$;

  constructor(private gameService: GameService) {}

  resetGame() {
    this.gameService.resetGame();
  }
}
