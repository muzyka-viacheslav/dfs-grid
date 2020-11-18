import {INode} from '../interfaces/INode';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Stack} from '../models/stack';

const timer = ms => new Promise(res => setTimeout(res, ms));

@Injectable()
export class DfsService {

  private _nodeVisitedSubject: Subject<INode> = new Subject();
  private _stack: Stack<INode>;
  private _interval = 1000;

  constructor() {
  }

  public fill(): void {
    this._stack = new Stack<INode>();
  }

  public async start(node: INode): Promise<void> {
    this._stack.push(node);
    while (!this._stack.isEmpty) {
      node = this._stack.pop();

      if (!node.visited) {
        node.markVisited();
        this._nodeVisitedSubject.next(node);

        for (const sibling of node.siblings) {
          this._stack.push(sibling);
        }

        await timer(this._interval);
      }
    }
  }

  public get nodeVisited$(): Observable<INode> {
    return this._nodeVisitedSubject.asObservable();
  }

}
