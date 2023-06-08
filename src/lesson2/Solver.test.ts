import { Solver } from "./Solver";

describe("Solver simple cases", () => {
  it("629", () => {
    expect(Solver.result("629")).toEqual(629);
  });

  it("3 + 6", () => {
    expect(Solver.result("3 + 6")).toEqual(9);
  });

  it("9 - 6", () => {
    expect(Solver.result("9 - 6")).toEqual(3);
  });

  it("9 - -6", () => {
    expect(Solver.result("9 - -6")).toEqual(15);
  });

  it("4 * 9", () => {
    expect(Solver.result("4 * 9")).toEqual(36);
  });

  it("25 / 5", () => {
    expect(Solver.result("25 / 5")).toEqual(5);
  });

  it("5!", () => {
    expect(Solver.result("5!")).toEqual(120);
  });

  it("7**", () => {
    expect(Solver.result("7**")).toEqual(49);
  });

  it("6^3", () => {
    expect(Solver.result("6^3")).toEqual(216);
  });
});

describe("Solver tripled/mixed cases", () => {
  it("31 + 28 - 57", () => {
    expect(Solver.result("31 + 28 - 57")).toEqual(2);
  });

  it("26 + 58 / 2", () => {
    expect(Solver.result("26 + 58 / 2")).toEqual(55);
  });

  it("9 * 6 - 10", () => {
    expect(Solver.result("9 * 6 - 10")).toEqual(44);
  });

  it("9 * (6 - 10)", () => {
    expect(Solver.result("9 * (6 - 10)")).toEqual(-36);
  });

  it("10 / (2 + 3)", () => {
    expect(Solver.result("10 / (2 + 3)")).toEqual(2);
  });

  it("3! - 6", () => {
    expect(Solver.result("3! - 6")).toEqual(0);
  });

  it("5! / 4", () => {
    expect(Solver.result("5! / 4")).toEqual(30);
  });

  it("4** * 7", () => {
    expect(Solver.result("4** * 7")).toEqual(112);
  });

  it("4** + 3 * 7", () => {
    expect(Solver.result("4** + 3 * 7")).toEqual(37);
  });

  it("(4** + 3) * 7", () => {
    expect(Solver.result("(4** + 3) * 7")).toEqual(133);
  });

  it("(5! - 8) * 3^4", () => {
    expect(Solver.result("(5! - 8) * 3^4")).toEqual(9072);
  });
});

describe("Solver functions cases", () => {
  it("sqrt(25)", () => {
    expect(Solver.result("sqrt(25)")).toEqual(5);
  });

  it("sin(4)", () => {
    expect(Solver.result("sin(4)")).toEqual(-0.7568024953079282);
  });

  it("cos(4)", () => {
    expect(Solver.result("cos(4)")).toEqual(-0.6536436208636119);
  });

  it("tan(4)", () => {
    expect(Solver.result("tan(4)")).toEqual(1.1578212823495777);
  });

  it("fib(8)", () => {
    expect(Solver.result("fib(8)")).toEqual(21);
  });

  it("log(2, 32)", () => {
    expect(Solver.result("log(2, 32)")).toEqual(5);
  });

  it("log(1, 32)", () => {
    expect(Solver.result("log(1, 32)")).toEqual(NaN);
  });

  it("log(-2, 32)", () => {
    expect(Solver.result("log(-2, 32)")).toEqual(NaN);
  });
});
