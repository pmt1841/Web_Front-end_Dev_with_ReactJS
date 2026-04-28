import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
    it('should render "Hello world" inside .app-pages', () => {
        render(<App />);
        const divElement = screen.getByText('Hello world');

        expect(divElement).toBeInTheDocument();
        expect(divElement).toHaveClass('app-pages');
    });
});