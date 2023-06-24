import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameGridComponent } from './game-grid/game-grid.component';

const COMPONENTS = [GameGridComponent];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ...COMPONENTS],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
