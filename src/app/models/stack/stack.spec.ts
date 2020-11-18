import {Stack} from './stack';

describe('Stack', () => {

  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack();
  });

  it('should be created', () => {
    expect(stack).toBeTruthy();
  });

  it('should correctly return isEmpty', () => {
    stack.push(1);
    stack.push(3);
    stack.pop();
    stack.pop();
    expect(stack.isEmpty).toBeTruthy();
  });

});
