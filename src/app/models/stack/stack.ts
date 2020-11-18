export class Stack<T> {
  private _store: T[] = [];

  public push(val: T): void {
    this._store.push(val);
  }

  public pop(): T | undefined {
    return this._store.pop();
  }

  public get isEmpty(): boolean {
    return this._store.length === 0;
  }

}
