import {IBorderViewConfig} from '../dto/border-view-config';
import {IBorderConfig} from '../dto/border-config';
import {INode} from '../interfaces/INode';

export class Cell implements INode {

  private _bottomBorders: Border[];
  private _rightBorders: Border[];
  private _leftBorders: Border[];
  private _topBorders: Border[];

  private readonly _gridColumn: string;
  private readonly _gridRow: string;

  private readonly _height: number;
  private readonly _width: number;

  private readonly _column: number;
  private readonly _row: number;

  private readonly _id: number;

  private _visited: boolean;

  constructor(width: number, height: number, row: number, column: number, id: number) {
    this._column = column;
    this._height = height;
    this._width = width;
    this._row = row;
    this._id = id;

    this._gridColumn = `${this._column} / span ${this._width}`;
    this._gridRow = `${this._row} / span ${this._height}`;
  }

  public setBorders(left: IBorderConfig[] = null, top: IBorderConfig[] = null, right: IBorderConfig[] = null, bottom: IBorderConfig[] = null): void {
    this._bottomBorders = this.mapCellsToBorders(bottom);
    this._rightBorders = this.mapCellsToBorders(right);
    this._leftBorders = this.mapCellsToBorders(left);
    this._topBorders = this.mapCellsToBorders(top);
  }

  public removeBordersForVisitedSiblings(visitedCells: number[]): void {
    this.borders.forEach((border: Border) => {
      if (visitedCells.some((cellId: number) => cellId === border.sibling.id)) {
        border.isExist = false;
        border.sibling.removeBorder(this);
      }
    });
  }

  public removeBorder(previousCell: Cell): void {
    const border: Border = this.borders.find((x: Border) => x.sibling.id === previousCell.id);
    if (border) {
      border.isExist = false;
    }
  }

  public markVisited(): void {
    this._visited = true;
  }

  public get bottomBorders(): IBorderViewConfig[] {
    return this.mapBorderToBorderView(this._bottomBorders);
  }

  public get rightBorders(): IBorderViewConfig[] {
    return this.mapBorderToBorderView(this._rightBorders);
  }

  public get leftBorders(): IBorderViewConfig[] {
    return this.mapBorderToBorderView(this._leftBorders);
  }

  public get topBorders(): IBorderViewConfig[] {
    return this.mapBorderToBorderView(this._topBorders);
  }

  public get gridColumn(): string {
    return this._gridColumn;
  }

  public get gridRow(): string {
    return this._gridRow;
  }

  public get siblings(): Cell[] {
    return this.borders.map((x: Border) => x.sibling);
  }

  public get visited(): boolean {
    return this._visited;
  }

  public get id(): number {
    return this._id;
  }

  private get borders(): Border[] {
    const borders: Border[] = [...this._bottomBorders, ...this._rightBorders, ...this._leftBorders, ...this._topBorders];
    return borders.filter((border: Border) => !!border.sibling);
  }

  private mapBorderToBorderView(borders: Border[]): IBorderViewConfig[] {
    return borders.map((border: Border) => {
      if (border.partition) {
        return {isExist: border.isExist, partition: `${border.partition}%`};
      } else {
        return {isExist: border.isExist};
      }
    });
  }

  private mapCellsToBorders(configs: IBorderConfig[]): Border[] {
    if (!!configs) {
      return configs.map((config: IBorderConfig) => {
        return {isExist: true, sibling: config.cell, partition: config.partPercent};
      });
    } else {
      return [{isExist: false, sibling: null}];
    }
  }

}

interface Border {
  isExist: boolean;
  sibling: Cell;
  partition?: number;
}
