
import React from 'react';
import { render } from '@testing-library/react';
import LiveField from "../components/LiveField/LiveField";
import { FieldState } from "../types/field-state";

describe('LiveField', () => {
    it('Live field', async () => {
        const { container } = await render(<LiveField key={'field'} width={20} height={10} status={FieldState.STOP} />);
        expect(container.getElementsByClassName("live-field").length).toEqual(1);
    });
    it('Live cells', async () => {
        const { container } = await render(<LiveField key={'field'} width={20} height={10} status={FieldState.STOP} />);
        const field = container.getElementsByClassName("live-field")[0];
        expect(field.getElementsByClassName("live-cell").length).toEqual(200);
    });
});
