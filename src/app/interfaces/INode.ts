export interface INode {
  siblings: INode[];
  visited: boolean;

  markVisited(): void;
}
