import { StackNode } from "./StackNode";

export class StackNodes {
  stack: StackNode[] = [];

  rootItem(): StackNode | null {
    if (this.stack.length === 0) return null;
    return this.stack[0];
  }

  lastItem(): StackNode | null {
    if (this.stack.length === 0) return null;
    return this.stack[this.stack?.length - 1];
  }

  push(node: StackNode): void {
    this.stack.push(node);
  }

  pop(): StackNode | null {
    const node = this.stack.pop();
    return node ? node : null;
  }

  prev(): StackNode | null {
    if (this.stack.length > 1 && this.stack[this.stack.length - 2])
      return this.stack[this.stack.length - 2];
    return null;
  }

  count(): number {
    return this.stack.length;
  }
}
