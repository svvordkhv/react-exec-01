import { StackNode } from "./StackNode";
import { StackNodes } from "./StackNodes";
import { operations } from "./Operations";
import { OperationNode, StepMode } from "./types";

export class Solver {
  static stack = new StackNodes();
  static mode = StepMode.START_EXPRESSION;
  static buffer = "";

  static getMode(symbol: string): StepMode {
    const reNumber = new RegExp("[0-9.]");
    const reCharset = new RegExp("[a-zA-Z_]");
    const reOperator = new RegExp("[+-/*^!]");
    if (reNumber.test(symbol)) return StepMode.NUMBER;
    if (reCharset.test(symbol)) return StepMode.FUNCTION;
    if (reOperator.test(symbol)) return StepMode.OPERATOR;
    if (symbol === ",") return StepMode.SPLITTER;
    if (symbol === "(") return StepMode.START_EXPRESSION;
    if (symbol === ")") return StepMode.END_EXPRESSION;
    if (symbol === " ") return StepMode.NOP;
    return StepMode.NULL;
  }

  static getOperation(): OperationNode {
    const operation = operations.find((item) => item.symbol === this.buffer);
    this.buffer = "";
    return operation ? operation.type : OperationNode.NULL;
  }

  /* true — если текущая операция приоритетна, false — если приоритетна последующая */
  static isPriority(node: StackNode | null, operator: OperationNode): boolean {
    if (node?.operation === OperationNode.EXPRESSION) return false;
    const first = operations.find((item) => item.type === node?.operation);
    const second = operations.find((item) => item.type === operator);
    if (first && second) return first?.priority >= second?.priority;
    return true;
  }

  static isUnary(operator: OperationNode): boolean {
    const o = operations.find((item) => item.type === operator);
    if (o) {
      return o.unary;
    }
    return false;
  }

  static reduceStack(): void {
    while (this.stack.lastItem() && this.stack.lastItem()?.isDone()) {
      if (this.stack.lastItem()?.operation === OperationNode.EXPRESSION) {
        if (!this.stack.lastItem()?.closed) {
          this.stack.lastItem()?.setClosed();
          break;
        }
      }
      this.stack.pop();
    }
  }

  static processingSymbol(c: string): void {
    const newMode = this.getMode(c);
    if (newMode === StepMode.NOP) {
      c = "";
      if (this.mode !== StepMode.OPERATOR) {
        return;
      }
    }
    if (
      [
        StepMode.START_EXPRESSION,
        StepMode.END_EXPRESSION,
        StepMode.SPLITTER,
      ].includes(newMode)
    ) {
      c = "";
    }
    if (
      newMode === this.mode &&
      newMode !== StepMode.START_EXPRESSION &&
      newMode !== StepMode.END_EXPRESSION
    ) {
      this.buffer += c;
      return;
    }

    switch (this.mode) {
      case StepMode.NOP:
        this.mode = newMode;
        this.buffer += c;
        break;
      case StepMode.SPLITTER:
        this.mode = newMode;
        this.buffer += c;
        break;
      case StepMode.FUNCTION:
        this.processingFunction(c, newMode);
        break;
      case StepMode.NUMBER:
        this.processingNumber(c, newMode);
        break;
      case StepMode.OPERATOR:
        this.processingOperator(c, newMode);
        break;
      case StepMode.START_EXPRESSION:
        this.processingStartExpression(c, newMode);
        break;
      case StepMode.END_EXPRESSION:
        this.processingEndExpression(c, newMode);
        break;
    }
  }

  static processingFunction(c: string, newMode: StepMode): void {
    this.buffer += c;
    this.mode = newMode;
  }

  static processingNumber(c: string, newMode: StepMode): void {
    if (
      this.stack.lastItem()?.operation === OperationNode.SUBSTRACT &&
      this.stack.lastItem()?.args?.length === 0
    ) {
      this.stack.lastItem()?.addArgument(0);
    }

    this.stack.lastItem()?.addArgument(Number(this.buffer));
    this.buffer = "";
    this.mode = newMode;
    this.buffer += c;
  }

  static processingOperator(c: string, newMode: StepMode): void {
    const operator = this.getOperation();
    if (this.stack.lastItem()?.operation === OperationNode.NULL) {
      this.stack.lastItem()?.setOperation(operator);
      if (this.isUnary(operator)) {
        this.stack.lastItem()?.setOperation(operator);
        this.mode = StepMode.NOP;
      }
    } else {
      this.stack.lastItem()?.processingNegativeNumber();

      if (this.isPriority(this.stack.lastItem(), operator)) {
        // Предыдущий оператор приоритетнее
        if (this.stack.lastItem()?.isDone()) {
          const currentNode = this.stack.pop();
          if (currentNode) {
            const newNode = new StackNode(operator, [currentNode]);
            /* Если в оставшейся текущей ноде в качестве аргумента
            присутствует currentNode, то его надо заменить на newNode */
            this.stack.lastItem()?.replaceArgument(currentNode, newNode);
            this.stack.push(newNode);
          } else {
            throw new Error("Syntax expression error");
          }
        } else {
          const newNode = new StackNode(operator, []);
          this.stack.lastItem()?.addArgument(newNode);
          this.stack.push(newNode);
        }
      } else {
        // Текущий оператор приоритетнее
        const isExpession =
          this.stack.lastItem()?.operation === OperationNode.EXPRESSION;
        const arg = isExpession
          ? this.stack.pop()
          : this.stack.lastItem()?.secondArgument();
        if (arg) {
          const newNode = new StackNode(operator, [arg!]);
          if (this.stack.lastItem()?.operation === OperationNode.EXPRESSION) {
            this.stack.lastItem()?.setFirstArgument(newNode);
          } else {
            this.stack.lastItem()?.setSecondArgument(newNode);
          }
          this.stack.push(newNode);
        } else {
          throw new Error("Syntax expression error");
        }
      }
    }
    this.mode = newMode;
    this.buffer += c;
  }

  static processingStartExpression(c: string, newMode: StepMode): void {
    const functionName = this.buffer;
    this.buffer = "";
    if (this.stack.lastItem()?.operation === OperationNode.NULL) {
      if (this.stack.lastItem()?.args.length === 0) {
        this.stack.lastItem()?.setOperation(OperationNode.EXPRESSION);
        this.stack.lastItem()?.setFuncName(functionName);
        const newNode = new StackNode(OperationNode.NULL, []);
        this.stack.lastItem()?.addArgument(newNode);
        this.stack.push(newNode);
      } else {
        throw new Error("Syntax expression error");
      }
    } else {
      const newNode = new StackNode(OperationNode.EXPRESSION, [], functionName);
      this.stack.lastItem()?.addArgument(newNode);
      this.stack.push(newNode);
      const newOperationNode = new StackNode(OperationNode.NULL, []);
      this.stack.lastItem()?.addArgument(newOperationNode);
      this.stack.push(newOperationNode);
    }
    this.buffer += c;
    this.mode = newMode;
  }

  static processingEndExpression(c: string, newMode: StepMode): void {
    this.reduceStack();
    this.buffer += c;
    this.mode = newMode;
  }

  static parseExpression(line: string): StackNode {
    this.buffer = "";
    this.stack = new StackNodes();
    this.mode = StepMode.START_EXPRESSION;
    const task = new StackNode(OperationNode.NULL, []);
    this.stack.push(task);

    line.split("").forEach((c: string) => this.processingSymbol(c));
    this.processingSymbol("");
    this.processingEndExpression("", StepMode.NOP);

    if (this.stack.count() > 1) {
      throw new Error("Syntax expression error");
    }

    return task;
  }

  static solveExpression(stack: StackNode): number {
    const arg1 = stack.firstArgument();
    const arg2 = stack.secondArgument();

    if (stack.operation === OperationNode.NULL) {
      return typeof arg1 !== "number" ? this.solveExpression(arg1) : arg1;
    } else if (stack.operation === OperationNode.EXPRESSION) {
      if (stack.funcName !== "") {
        const call = operations.find((item) => item.symbol === stack.funcName);
        if (call) {
          const arg1 = stack.firstArgument();
          const solvedArg1 = (arg1 as StackNode).firstArgument();
          const solvedArg2 = (arg1 as StackNode).secondArgument();
          if (solvedArg2 === NaN) {
            return call.func(solvedArg1);
          } else {
            return call.func(solvedArg1, solvedArg2);
          }
        }
      } else {
        return typeof arg1 !== "number" ? this.solveExpression(arg1) : arg1;
      }
    } else {
      const call = operations.find((item) => item.type === stack.operation);
      if (call) {
        const solvedArg1 =
          typeof arg1 !== "number" ? this.solveExpression(arg1) : arg1;
        const solvedArg2 =
          typeof arg2 !== "number" ? this.solveExpression(arg2) : arg2;
        return call.func(solvedArg1, solvedArg2);
      }
    }
    return NaN;
  }

  static result(line: string): number | number[] {
    const node = this.parseExpression(line);
    if (node === null) {
      throw new TypeError("Unexpected string");
    }
    return this.solveExpression(node);
  }
}
