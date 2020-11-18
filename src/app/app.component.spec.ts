import {TestBed, async, ComponentFixture, tick, fakeAsync} from '@angular/core/testing';
import {CellsService} from './services/cells/cells.service';
import {DfsService} from './services/dfs/dfs.service';
import {AppComponent} from './app.component';
import {Cell} from './models/cell/cell';
import {Subject} from 'rxjs';

const dfsAlgorithmVisitsTheNode: Subject<Cell> = new Subject<Cell>();
const dfsAlgorithmFinished: Subject<void> = new Subject<void>();

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  let cellsService: CellsService;
  let dfsService: DfsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: CellsService, useValue: cellsServiceStub()},
        {provide: DfsService, useValue: dfsServiceStub()}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    cellsService = TestBed.inject(CellsService);
    dfsService = TestBed.inject(DfsService);
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should not init dfs algorithm when it\'s in progress', () => {
    app.ngOnInit();
    spyOn(dfsService, 'start').and.callThrough();
    app.start();
    expect(dfsService.start).toHaveBeenCalledTimes(1);
    app.start();
    expect(dfsService.start).toHaveBeenCalledTimes(1);
  });

  it('should correctly toggle algorithmInProgress flag', fakeAsync(() => {
    app.ngOnInit();
    expect(app.algorithmIsInProcess).toBeFalsy();
    const promise: Promise<void> = new Promise<void>((resolve, reject) => {
      resolve();
    });
    spyOn(dfsService, 'start').and.returnValue(promise);
    app.start();
    expect(app.algorithmIsInProcess).toBeTrue();
    dfsAlgorithmFinished.next();
    tick(app.timeoutAfterFinishInSeconds * 1000);
    expect(app.algorithmIsInProcess).toBeFalsy();
  }));

  it('should return generated cells', () => {
    spyOn(cellsService, 'generate').and.returnValue([new Cell(1, 1, 1, 1, 1)]);
    app.ngOnInit();
    expect(app.cells.length).toEqual(1);
  });

  it('should remove visited borders once new node is visited', () => {
    const node: any = {
      removeBordersForVisitedSiblings: () => {
      }
    };
    const cell: Cell = new Cell(1, 1, 1, 1, 1);
    const visitedCell: Cell = new Cell(1, 1, 1, 1, 2);
    spyOn(cellsService, 'generate').and.returnValue([cell, visitedCell]);
    spyOn(node, 'removeBordersForVisitedSiblings').and.callThrough();
    app.ngOnInit();
    visitedCell.markVisited();
    dfsAlgorithmVisitsTheNode.next(node);
    expect(node.removeBordersForVisitedSiblings).toHaveBeenCalledWith([visitedCell.id]);
  });

});

function cellsServiceStub(): CellsService {
  const service: any = {};
  service.generate = () => [];
  return service;
}

function dfsServiceStub(): DfsService {
  const service: any = {};
  Object.defineProperty(service, 'nodeVisited$', {
    get() {
      return dfsAlgorithmVisitsTheNode.asObservable();
    }
  });
  service.start = (params: any) => dfsAlgorithmFinished.toPromise();
  service.fill = () => {
  };
  return service;
}
