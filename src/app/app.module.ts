import {BrowserModule} from '@angular/platform-browser';
import {CellsService} from './services/cells.service';
import {DfsService} from './services/dfs.service';
import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    CellsService,
    DfsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
