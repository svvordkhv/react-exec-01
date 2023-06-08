import { OperationNode } from "./types";

type ArgNode = number | StackNode;

export class StackNode {
  closed = false;

  constructor(
    public operation: OperationNode,
    public args: ArgNode[] = [],
    public funcName?: string,
    public operatorFirst?: boolean
  ) {
    if (!this.funcName) this.funcName = "";
    if (!this.operatorFirst) {
      this.operatorFirst =
        this.operation !== OperationNode.NULL && this.args.length === 0;
    }
  }

  addArgument(arg: ArgNode): void {
    this.args?.push(arg);
  }

  clearArguments(): void {
    this.args = [];
  }

  setOperation(op: OperationNode): void {
    this.operation = op;
  }

  setClosed(): void {
    this.closed = true;
  }

  isDone(): boolean {
    switch (this.operation) {
      case OperationNode.NULL:
        return this.args?.length > 0;
      case OperationNode.EXPRESSION:
      case OperationNode.FACTORIAL:
      case OperationNode.SQUARE:
        return this.args?.length === 1;
      default:
        return this.args?.length > 1;
    }
  }

  isClosed(): boolean {
    return this.closed;
  }

  processingNegativeNumber(): void {
    if (
      this.operation === OperationNode.SUBSTRACT &&
      this.args.length === 1 &&
      this.operatorFirst
    ) {
      const arg = this.args[0];
      if (arg) {
        this.clearArguments();
        this.addArgument(0);
        this.addArgument(arg!);
      } else {
        throw new Error("Syntax expression error");
      }
    }
  }

  firstArgument(): ArgNode {
    if (this?.args && this?.args!.length > 0) return this.args[0];
    return NaN;
  }

  secondArgument(): ArgNode {
    if (this?.args && this?.args!.length > 1) return this.args[1];
    return NaN;
  }

  setFirstArgument(arg: ArgNode): void {
    if (this.args.length > 0) {
      this.args[0] = arg;
    }
  }

  setSecondArgument(arg: ArgNode): void {
    if (this.args.length > 1) {
      this.args[1] = arg;
    }
  }

  setFuncName(name: string): void {
    this.funcName = name;
  }

  replaceArgument(arg: ArgNode, toArg: ArgNode): void {
    for (const index of [0, 1]) {
      if (this.args.length > index && this.args[index] === arg) {
        this.args[index] = toArg;
        return;
      }
    }
  }
}
