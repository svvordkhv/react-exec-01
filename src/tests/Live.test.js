
import { Live } from '../app/Live';
import { CellState } from "../types/cell-state";

describe('Live', () => {
	it('Live weight 1', () => {
		const lv = new Live(5, 5);
		lv.init();
		expect(lv.getWeight(2, 2)).toEqual(5);
	});
	it('Live weight 2', () => {
		const lv = new Live(5, 5);
		lv.init();
		expect(lv.getWeight(1, 1)).toEqual(1);
	});
	it('Live gen 1', () => {
		const lv = new Live(5, 5);
		lv.init();
		lv.nextGeneration();
		expect(lv.getState(1, 2)).toEqual(CellState.LIVE);
	});
	it('Live gen 2', () => {
		const lv = new Live(5, 5);
		lv.init();
		lv.nextGeneration();
		expect(lv.getState(2, 2)).toEqual(CellState.DIE);
	});
});
