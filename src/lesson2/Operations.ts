import { OperationNode } from "./types";

export type Operation = {
  type: OperationNode;
  symbol: string;
  priority: number;
  unary: boolean;
  func: Function;
};

export const operations: Operation[] = [
  {
    type: OperationNode.EXPONENT,
    symbol: "^",
    priority: 3,
    unary: false,
    func: (a: number, b: number): number => {
      return Math.pow(a, b);
    },
  },
  {
    type: OperationNode.MULTPLAY,
    symbol: "*",
    priority: 2,
    unary: false,
    func: (a: number, b: number): number => {
      return a * b;
    },
  },
  {
    type: OperationNode.DIVISION,
    symbol: "/",
    priority: 2,
    unary: false,
    func: (a: number, b: number): number => {
      return a / b;
    },
  },
  {
    type: OperationNode.SUMM,
    symbol: "+",
    priority: 1,
    unary: false,
    func: (a: number, b: number): number => {
      return a + b;
    },
  },
  {
    type: OperationNode.SUBSTRACT,
    symbol: "-",
    priority: 1,
    unary: false,
    func: (a: number, b: number): number => {
      return a - b;
    },
  },
  {
    type: OperationNode.SQUARE,
    symbol: "**",
    priority: 3,
    unary: true,
    func: (a: number): number => {
      return a * a;
    },
  },
  {
    type: OperationNode.FACTORIAL,
    symbol: "!",
    priority: 3,
    unary: true,
    func: (a: number): number => {
      let factorial = 1;
      for (let i = 2; i <= a; i++) {
        factorial *= i;
      }
      return factorial;
    },
  },
  {
    type: OperationNode.FUNCTION,
    symbol: "sqrt",
    priority: 4,
    unary: false,
    func: (a: number): number => {
      return Math.sqrt(a);
    },
  },
  {
    type: OperationNode.FUNCTION,
    symbol: "sin",
    priority: 4,
    unary: false,
    func: (a: number): number => {
      return Math.sin(a);
    },
  },
  {
    type: OperationNode.FUNCTION,
    symbol: "cos",
    priority: 4,
    unary: false,
    func: (a: number): number => {
      return Math.cos(a);
    },
  },
  {
    type: OperationNode.FUNCTION,
    symbol: "tan",
    priority: 4,
    unary: false,
    func: (a: number): number => {
      return Math.tan(a);
    },
  },
  {
    type: OperationNode.FUNCTION,
    symbol: "fib",
    priority: 4,
    unary: false,
    func: (a: number): number => {
      const sign = a < 0 ? -1 : 1;
      a *= sign;
      if (a == 0 || a == 1) return a;
      const cursor = [0, 1];
      for (let i = 1; i < a; i++) {
        cursor.push(cursor[0] + cursor[1]);
        cursor.shift();
      }
      return cursor[1] * sign;
    },
  },
  // Логарифм от b по основанию a
  {
    type: OperationNode.FUNCTION,
    symbol: "log",
    priority: 4,
    unary: false,
    func: (a: number, b: number): number => {
      if (a < 0) return NaN;
      if (a === 1) return NaN;
      if (b === 1) return 0;
      return Math.log(b) / Math.log(a);
    },
  },
];
