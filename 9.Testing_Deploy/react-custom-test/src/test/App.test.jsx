import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
    describe('App', () => {
        it('Check render components', () => {
            render(<App />);
            const inputOne = screen.getByTestId('value-one-input');
            const inputTwo = screen.getByTestId('value-two-input');
            const buttonAdd = screen.getByTestId('button-add');
            const resultText = screen.getByTestId('result');

            expect(inputOne).toBeInTheDocument();
            expect(inputTwo).toBeInTheDocument();
            expect(buttonAdd).toBeInTheDocument();
            expect(resultText).toBeInTheDocument();
        });

    });

    it('Calculate sum 2 inputs when click Add button', async () => {
        render(<App />);
        const button = screen.getByText('Add');
        const value1 = screen.getByTestId('value-one-input');
        const value2 = screen.getByTestId('value-two-input');
        fireEvent.change(value1, {target: {value: 1}});
        fireEvent.change(value2, {target: {value: 2}});
        await userEvent.click(button);
        const resultText = screen.getByTestId('result');
        expect(resultText).toHaveTextContent('Result: 3');
    });
});
