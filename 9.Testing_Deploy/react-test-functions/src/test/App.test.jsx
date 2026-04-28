import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
    it('increments count by 1 when clicking Increment button', async () => {
        render(<App />);
        const button = screen.getByText('Increment');
        await userEvent.click(button);
        const counterText = screen.getByTestId('counter-value');
        expect(counterText).toHaveTextContent('Count: 1');
    });
});