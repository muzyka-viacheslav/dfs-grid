import {TestBed} from '@angular/core/testing';
import {CellsService} from './cells.service';
import {Cell} from '../../models/cell/cell';

describe('CellsService', () => {

  let cellsService: CellsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CellsService
      ]
    });
    cellsService = TestBed.inject(CellsService);
  });

  it('should be created', () => {
    expect(cellsService).toBeTruthy();
  });

  it('should return not empty array', () => {
    let cells: Cell[] = [];
    expect(() => {
      cells = cellsService.generate();
    }).not.toThrow();
    expect(cells.length).toBeGreaterThan(0);
  });

});
