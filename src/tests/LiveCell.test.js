
import React from 'react';
import { render } from '@testing-library/react';
import LiveCell from "../components/LiveCell/LiveCell";
import { CellState } from "../types/cell-state";

describe('LiveCell', () => {
    it('Live cell', async () => {
        const { container } = await render(<LiveCell x={1} y={1} status={CellState.LIVE} />);
        expect(container.getElementsByClassName("live-cell").length).toEqual(1);
    });
    it('Live cell alive', async () => {
        const { container } = await render(<LiveCell x={1} y={1} status={CellState.LIVE} />);
        const cell = container.getElementsByClassName("live-cell")[0];
        expect(cell.style.backgroundColor).toEqual('rgb(51, 51, 51)');
    });
    it('Live cell die', async () => {
        const { container } = await render(<LiveCell x={1} y={1} status={CellState.DIE} />);
        const cell = container.getElementsByClassName("live-cell")[0];
        expect(cell.style.backgroundColor).toEqual('darkgrey');
    });
});
