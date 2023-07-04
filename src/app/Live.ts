
import { CellState } from "../types/cell-state";

export class Live {
  private field: CellState[][] = [];
  private width: number;
  private heihgt: number;

  constructor(width: number, heihgt: number) {
    this.width = width;
    this.heihgt = heihgt;
    this.createField();
  }

  createField(): void {
    this.field = [];
    for (let y = 0; y < this.heihgt; y++) {
      this.field[y] = [];
      for (let x = 0; x < this.width; x++) {
        this.field[y][x] = CellState.DIE;
      }
    }
  }

  clear(): void {
    for (let y = 0; y < this.heihgt; y++) {
      for (let x = 0; x < this.width; x++) {
        this.field[y][x] = CellState.DIE;
      }
    }
  }

  getField(): CellState[][] {
    return [...this.field];
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.heihgt;
  }

  private inField(x: number, y: number): boolean {
    if (x < 0 || x > this.width) return false;
    if (y < 0 || y > this.heihgt) return false;
    return true;
  }

  private bypass(callback: (x: number, y: number) => void): void {
    for (let y = 0; y < this.heihgt; y++) {
      for (let x = 0; x < this.width; x++) {
        callback(x, y);
      }
    }
  }

  cellState(x: number, y: number): CellState {
    return this.field[y][x];
  }

  setLive(x: number, y: number): void {
    if (!this.inField(x, y)) return;
    this.field[y][x] = CellState.LIVE;
  }

  setDie(x: number, y: number): void {
    if (!this.inField(x, y)) return;
    this.field[y][x] = CellState.DIE;
  }

  nextGeneration(): void {
    this.bypass(this.setNewState.bind(this));
    this.bypass(this.setCurrentState.bind(this));
  }

  private setNewState(x: number, y: number): void {
    const weight = this.getWeight(x, y);
    if (this.field[y][x] === CellState.DIE && weight === 3) this.field[y][x] = CellState.NEW_LIVE;
    if (this.field[y][x] === CellState.LIVE && (weight < 2 || weight > 3)) this.field[y][x] = CellState.NEW_DIE;
  }

  private setCurrentState(x: number, y: number): void {
    if (this.field[y][x] === CellState.NEW_DIE) this.field[y][x] = CellState.DIE;
    if (this.field[y][x] === CellState.NEW_LIVE) this.field[y][x] = CellState.LIVE;
  }

  getWeight(x: number, y: number): number {
    let weight = 0;
    if (!this.inField(x, y)) return 0;
    for (let dy = -1; dy < 2; dy++) {
      for (let dx = -1; dx < 2; dx++) {
        if (dx === 0 && dy === 0) continue;
        if (this.field[this.getDY(y, dy)][this.getDX(x, dx)] === CellState.LIVE || this.field[this.getDY(y, dy)][this.getDX(x, dx)] === CellState.NEW_DIE) weight++;
      }
    }
    return weight;
  }

  getState(x: number, y: number): CellState {
    return this.field[y][x];
  }

  switchState(x: number, y: number): void {
    this.field[y][x] = this.field[y][x] ===  CellState.DIE ? CellState.LIVE : CellState.DIE;
  }

  private getDX(x: number, dx: number) {
    const nx = x + dx;
    if (nx < 0) return this.width - 1;
    if (nx >= this.width) return 0;
    return nx;
  }

  private getDY(y: number, dy: number) {
    const ny = y + dy;
    if (ny < 0) return this.heihgt - 1;
    if (ny >= this.heihgt) return 0;
    return ny;
  }

  init(): void {
    if (this.heihgt < 5 || this.width < 5) return;
    this.clear();
    this.field[1][2] = CellState.LIVE;
    this.field[2][3] = CellState.LIVE;
    this.field[3][1] = CellState.LIVE;
    this.field[3][2] = CellState.LIVE;
    this.field[3][3] = CellState.LIVE;
  }

}
