import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameService, Mark } from '../game.service';
import { GameGridComponent } from './game-grid.component';

describe('GameGridComponent', () => {
  let component: GameGridComponent;
  let fixture: ComponentFixture<GameGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GameGridComponent],
    });
    fixture = TestBed.createComponent(GameGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 09 cells', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('button')?.length).toEqual(9);
  });

  it('should call the registerMove method on GameService when a cell is clicked', () => {
    const gameService = TestBed.inject(GameService);
    const spy = spyOn(gameService, 'registerMove');
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelectorAll('button')?.[3];
    button.click();

    expect(spy).toHaveBeenCalledOnceWith(3, Mark.X);
  });
});
