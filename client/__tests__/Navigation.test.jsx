import { render, screen } from '@testing-library/react'
import Navigation from '../src/components/navigation' 
import '@testing-library/jest-dom'

describe('Navigation Component', () => {

  test('muestra enlaces de navegación', () => {
    render(<Navigation />)
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument()
    expect(screen.getByText(/Informacion/i)).toBeInTheDocument()

  })

})