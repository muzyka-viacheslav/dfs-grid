import {Component, OnDestroy, OnInit} from '@angular/core';
import {CellsService} from './services/cells.service';
import {DfsService} from './services/dfs.service';
import {takeUntil} from 'rxjs/operators';
import {Subject, timer} from 'rxjs';
import {Cell} from './models/cell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly _timeoutAfterFinishInSeconds = 2;

  private _unsubscribe: Subject<void> = new Subject();
  private _algorithmIsInProcess: boolean;
  private _cells: Cell[];

  constructor(private cellsService: CellsService,
              private dfsService: DfsService) {
  }

  public ngOnDestroy(): void {
    this._unsubscribe.next();
  }

  public ngOnInit(): void {
    this.dfsService.fill();
    this.dfsService.nodeVisited$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((cell: Cell) => {
        cell.removeBordersForVisitedSiblings(this._cells
          .filter((x: Cell) => x.visited)
          .map((x: Cell) => x.id));
      });
    this._cells = this.cellsService.generate();
  }

  public start(cell: Cell = null): void {
    if (this._algorithmIsInProcess) {
      return;
    }
    this._algorithmIsInProcess = true;
    if (!cell) {
      cell = this._cells[this.getRandomIntInRange(0, this._cells.length - 1)];
    }
    this.dfsService.start(cell).then(() => {
      timer(this._timeoutAfterFinishInSeconds * 1000).subscribe(() => {
        this.ngOnInit();
        this._algorithmIsInProcess = false;
      });
    });
  }

  public get timeoutAfterFinishInSeconds(): number {
    return this._timeoutAfterFinishInSeconds;
  }

  public get algorithmIsInProcess(): boolean {
    return this._algorithmIsInProcess;
  }

  public get cells(): Cell[] {
    return this._cells;
  }

  private getRandomIntInRange(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }


}
