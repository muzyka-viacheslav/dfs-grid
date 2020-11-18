import {async, TestBed} from '@angular/core/testing';
import {DfsService} from './dfs.service';
import {Cell} from '../../models/cell/cell';

describe('DfsService', () => {

  let dfsService: DfsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        DfsService
      ]
    });
    dfsService = TestBed.inject(DfsService);
  });

  it('should be created', () => {
    expect(dfsService).toBeTruthy();
  });

  it('should visit all the nodes', async(() => {
    const node: Cell = new Cell(1, 1, 1, 1, 0);
    const child: Cell = new Cell(2, 1, 2, 1, 1);
    const child2: Cell = new Cell(1, 2, 3, 1, 2);
    const grandChild: Cell = new Cell(4, 4, 4, 1, 3);
    node.setBorders(null, null, null, [{cell: child}, {cell: child2, partPercent: 25}]);
    child.setBorders(null, [{cell: node}], null, [{cell: grandChild}]);
    child2.setBorders(null, [{cell: node}], null, null);
    grandChild.setBorders(null, [{cell: child}], null, null);
    dfsService.fill();
    dfsService.start(node).then(() => {
      expect(node.visited).toEqual(true);
      expect(child.visited).toEqual(true);
      expect(child2.visited).toEqual(true);
      expect(grandChild.visited).toEqual(true);
    });
  }));

  it('should trigger each time node visit event', async(() => {
    let count = 0;
    const node: Cell = new Cell(1, 1, 1, 1, 0);
    const child: Cell = new Cell(2, 1, 2, 1, 1);
    const child2: Cell = new Cell(1, 2, 3, 1, 2);
    const grandChild: Cell = new Cell(4, 4, 4, 1, 3);
    node.setBorders(null, null, null, [{cell: child}, {cell: child2, partPercent: 25}]);
    child.setBorders(null, [{cell: node}], null, [{cell: grandChild}]);
    child2.setBorders(null, [{cell: node}], null, null);
    grandChild.setBorders(null, [{cell: child}], null, null);
    dfsService.fill();
    dfsService.nodeVisited$.subscribe(() => count++);
    dfsService.start(node).then(() => {
      expect(count).toEqual(4);
    });
  }));

});
