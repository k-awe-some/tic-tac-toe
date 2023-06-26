import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GameGridComponent } from './game-grid/game-grid.component';
import { GameService } from './game.service';
import { ButtonComponent } from './shared/button/button.component';
import { VerdictComponent } from './verdict/verdict.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [GameGridComponent, VerdictComponent, ButtonComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render game title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('TIC TAC TOE');
  });

  it("should render game grid after game level's been picked", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const gameService = TestBed.inject(GameService);
    gameService.resetGame();
    fixture.detectChanges();
    expect(compiled.querySelector('app-game-grid')).toBeTruthy();
  });

  it('should render reset button when game is reset', () => {
    const gameService = TestBed.inject(GameService);
    gameService.resetGame();
    fixture.detectChanges();

    const resetButton = fixture.debugElement.query(
      By.css("app-button[data-test='reset-human-first-button']")
    )?.nativeElement;
    expect(resetButton.textContent).toContain('Reset');
  });

  it('should call the resetGame method on GameService when reset button is clicked', () => {
    const gameService = TestBed.inject(GameService);
    gameService.resetGame();
    fixture.detectChanges();

    const resetButton: DebugElement = fixture.debugElement.query(
      By.css("app-button[data-test='reset-human-first-button']")
    );
    const spy = spyOn(gameService, 'resetGame');
    resetButton.triggerEventHandler('click');

    expect(spy).toHaveBeenCalled();
  });

  it("should render human's turn first button on load", () => {
    fixture.detectChanges();
    const humanFirstButton = fixture.debugElement.query(
      By.css("app-button[data-test='human-first-button']")
    )?.nativeElement;

    expect(humanFirstButton.textContent).toContain("I'll go first");
  });

  it("should render bot's turn first button on load", () => {
    fixture.detectChanges();
    const botFirstButton = fixture.debugElement.query(
      By.css("app-button[data-test='bot-first-button']")
    )?.nativeElement;

    expect(botFirstButton.textContent).toContain(
      'I feel like being challenged'
    );
  });
});
