
import React from 'react';
import { render } from '@testing-library/react';
import LiveCell from "../components/LiveCell/LiveCell";

describe('LiveCell', () => {
    it('Live cell', async () => {
        const { container } = await render(<LiveCell x={1} y={1} status={true} />);
        expect(container.getElementsByClassName("live-cell").length).toEqual(1);
    });
    it('Live cell alive', async () => {
        const { container } = await render(<LiveCell x={1} y={1} status={true} />);
        const cell = container.getElementsByClassName("live-cell")[0];
        expect(cell.style.backgroundColor).toEqual('rgb(51, 51, 51)');
    });
    it('Live cell die', async () => {
        const { container } = await render(<LiveCell x={1} y={1} status={false} />);
        const cell = container.getElementsByClassName("live-cell")[0];
        expect(cell.style.backgroundColor).toEqual('darkgrey');
    });
});
