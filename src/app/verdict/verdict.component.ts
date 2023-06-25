import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-verdict',
  templateUrl: './verdict.component.html',
  styleUrls: ['./verdict.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class VerdictComponent {
  isBotTurn$ = this.gameService.isBotTurn$;
  verdict$ = this.gameService.verdict$;

  constructor(private gameService: GameService) {}
}
