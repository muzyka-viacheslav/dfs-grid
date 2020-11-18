import {BrowserModule} from '@angular/platform-browser';
import {CellsService} from './services/cells/cells.service';
import {DfsService} from './services/dfs/dfs.service';
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
