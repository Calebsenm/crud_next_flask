import { render, screen, fireEvent } from '@testing-library/react'
import Modal from '@/components/Modal'
import '@testing-library/jest-dom'

describe('Modal Component', () => {
  const mockOnClose = jest.fn()
  
  test('se cierra al hacer clic en X', () => {
    render(
      <Modal onClose={mockOnClose} title="Test Modal">
        <p>Contenido del modal</p>
      </Modal>
    )
    
    const closeButton = screen.getByText('x')
    fireEvent.click(closeButton)
    
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
  
  test('muestra título y contenido', () => {
    render(
      <Modal onClose={mockOnClose} title="Test Modal">
        <p>Contenido del modal</p>
      </Modal>
    )
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Contenido del modal')).toBeInTheDocument()
  })
})