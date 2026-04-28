import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App', () => {

    it('displays default value of 0', () => {
        render(<App />)
        const valueElement = screen.getByTestId('default-value')
        expect(valueElement).toHaveTextContent('0')
    })
})