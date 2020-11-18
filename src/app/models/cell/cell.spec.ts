import {IBorderConfig} from '../../dto/border-config';
import {Cell} from './cell';

describe('Cell', () => {

  let cell: Cell;

  it('should be created', () => {
    cell = new Cell(1, 1, 1, 1, 0);
    expect(cell).toBeTruthy();
  });

  it('should set appropriate size fields', () => {
    const column = 1;
    const height = 1;
    const width = 1;
    const row = 1;
    const id = 0;
    cell = new Cell(width, height, row, column, id);
    expect(cell.gridColumn).toEqual(`${column} / span ${width}`);
    expect(cell.gridRow).toEqual(`${row} / span ${height}`);
    expect(cell.id).toEqual(id);
  });

  it('should have at least one border', () => {
    const column = 1;
    const height = 1;
    const width = 1;
    const row = 1;
    const id = 0;
    cell = new Cell(width, height, row, column, id);
    cell.setBorders();
    expect(cell.bottomBorders.length).toEqual(1);
    expect(cell.rightBorders.length).toEqual(1);
    expect(cell.leftBorders.length).toEqual(1);
    expect(cell.topBorders.length).toEqual(1);
  });

  it('should return correct partition and existing flags', () => {
    const column = 1;
    const height = 1;
    const width = 1;
    const row = 1;
    const id = 0;
    const partition = 50;
    cell = new Cell(width, height, row, column, id);
    const bottomBorders: IBorderConfig[] = [{cell: new Cell(1, 1, 2, 1, 1), partPercent: partition}, {cell: new Cell(1, 1, 3, 1, 2)}];
    bottomBorders[0].cell.setBorders(null, [{cell}], null, null);
    cell.setBorders(null, null, null, bottomBorders);
    const border = cell.bottomBorders[0];
    expect(border.partition).toEqual(`${partition}%`);
    expect(border.isExist).toEqual(true);
    cell.removeBordersForVisitedSiblings([bottomBorders[0].cell.id]);
    const borderAfterChanges = cell.bottomBorders[0];
    expect(borderAfterChanges.isExist).toEqual(false);
  });

  it('should return appropriate amount of siblings', () => {
    const column = 1;
    const height = 1;
    const width = 1;
    const row = 1;
    const id = 0;
    cell = new Cell(width, height, row, column, id);
    const leftBorders: IBorderConfig[] = [{cell: new Cell(1, 1, 1, 1, 1)}, {cell: new Cell(1, 1, 1, 2, 2)}];
    const bottomBorders: IBorderConfig[] = [{cell: new Cell(1, 1, 2, 1, 1)}];
    cell.setBorders(leftBorders, null, null, bottomBorders);
    expect(cell.siblings.length).toEqual(3);
  });

});
