import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GameGridComponent } from './game-grid/game-grid.component';
import { GameService } from './game.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [GameGridComponent],
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

  it('should render game grid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-game-grid')).toBeTruthy();
  });

  it('should render reset button', () => {
    const resetButton = fixture.debugElement.query(
      By.css("button[data-test='reset-button']")
    )?.nativeElement;
    expect(resetButton.textContent).toContain('Reset game');
  });

  it('should call the resetGame method on GameService when reset button is clicked', () => {
    const gameService = TestBed.inject(GameService);
    const spy = spyOn(gameService, 'resetGame');
    const resetButton = fixture.debugElement.query(
      By.css("button[data-test='reset-button']")
    )?.nativeElement;
    resetButton.click();

    expect(spy).toHaveBeenCalled();
  });
});
