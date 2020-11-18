import {Injectable} from '@angular/core';
import {Cell} from '../models/cell';

@Injectable()
export class CellsService {

  constructor() {
  }

  public generate(): Cell[] {
    const firstRow: Cell[] = [
      new Cell(1, 2, 1, 1, 0),
      new Cell(1, 1, 1, 2, 1),
      new Cell(1, 1, 1, 3, 2),
      new Cell(1, 1, 1, 4, 3)
    ];
    const secondRow: Cell[] = [
      new Cell(1, 1, 2, 2, 4),
      new Cell(1, 1, 2, 3, 5),
      new Cell(1, 1, 2, 4, 6)
    ];
    const thirdRow: Cell[] = [
      new Cell(1, 1, 3, 1, 7),
      new Cell(3, 1, 3, 2, 8)
    ];
    const fourthRow: Cell[] = [
      new Cell(2, 2, 4, 1, 9),
      new Cell(2, 1, 4, 3, 10)
    ];
    const fifthRow: Cell[] = [
      new Cell(1, 1, 5, 3, 11),
      new Cell(1, 1, 5, 4, 12)
    ];

    firstRow[0].setBorders(null, null, [{cell: firstRow[1]}, {cell: secondRow[0]}], [{cell: thirdRow[0]}]);
    firstRow[1].setBorders([{cell: firstRow[0]}], null, [{cell: firstRow[2]}], [{cell: secondRow[0]}]);
    firstRow[2].setBorders([{cell: firstRow[1]}], null, [{cell: firstRow[3]}], [{cell: secondRow[1]}]);
    firstRow[3].setBorders([{cell: firstRow[2]}], null, null, [{cell: secondRow[2]}]);

    secondRow[0].setBorders([{cell: firstRow[0]}], [{cell: firstRow[1]}], [{cell: secondRow[1]}], [{cell: thirdRow[1]}]);
    secondRow[1].setBorders([{cell: secondRow[0]}], [{cell: firstRow[2]}], [{cell: secondRow[2]}], [{cell: thirdRow[1]}]);
    secondRow[2].setBorders([{cell: secondRow[1]}], [{cell: firstRow[3]}], null, [{cell: thirdRow[1]}]);

    thirdRow[0].setBorders(null, [{cell: firstRow[0]}], [{cell: thirdRow[1]}], [{cell: fourthRow[0]}]);
    thirdRow[1].setBorders([{cell: thirdRow[0]}], [{cell: secondRow[0]}, {cell: secondRow[1]}, {cell: secondRow[2]}], null,
      [{cell: fourthRow[0], partPercent: 33}, {cell: fourthRow[1]}]);

    fourthRow[0].setBorders(null, [{cell: thirdRow[0]}, {cell: thirdRow[1]}], [{cell: fourthRow[1]}, {cell: fifthRow[0]}], null);
    fourthRow[1].setBorders([{cell: fourthRow[0]}], [{cell: thirdRow[1]}], null, [{cell: fifthRow[0]}, {cell: fifthRow[1]}]);

    fifthRow[0].setBorders([{cell: fourthRow[0]}], [{cell: fourthRow[1]}], [{cell: fifthRow[1]}], null);
    fifthRow[1].setBorders([{cell: fifthRow[0]}], [{cell: fourthRow[1]}], null, null);

    return [...firstRow, ...secondRow, ...thirdRow, ...fourthRow, ...fifthRow];
  }

}
