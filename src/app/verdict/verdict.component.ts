import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService, Mark } from '../game.service';

@Component({
  selector: 'app-verdict',
  templateUrl: './verdict.component.html',
  styleUrls: ['./verdict.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class VerdictComponent {
  winner$ = this.gameService.winner$;
  verdict$ = this.gameService.verdict$;

  readonly Mark = Mark;

  constructor(private gameService: GameService) {}
}
