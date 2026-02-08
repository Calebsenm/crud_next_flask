import { render, screen, fireEvent } from '@testing-library/react'
import Formulario from '@/components/Formulario'
import '@testing-library/jest-dom'

describe('Formulario Component', () => {
  test('valida campos requeridos', () => {
    render(<Formulario />)
    
    const submitButton = screen.getByText('Guardar')
    
    expect(submitButton).toBeDisabled()
    
    fireEvent.change(screen.getByPlaceholderText('Nombre de la empresa'), {
      target: { value: 'Mi Empresa' }
    })
    fireEvent.change(screen.getByPlaceholderText('Direccion'), {
      target: { value: 'Calle 123' }
    })
    fireEvent.change(screen.getByPlaceholderText('Nit'), {
      target: { value: '123456' }
    })
    fireEvent.change(screen.getByPlaceholderText('Telefono'), {
      target: { value: '5551234' }
    })
    fireEvent.change(screen.getByPlaceholderText('Correo'), {
      target: { value: 'test@test.com' }
    })
    
    expect(submitButton).not.toBeDisabled()
  })

  test('valida formato de email', () => {
    render(<Formulario />)
    
    const emailInput = screen.getByPlaceholderText('Correo')
    
    fireEvent.change(emailInput, { target: { value: 'email-invalido' } })
    expect(screen.getByText('Email is invalid.')).toBeInTheDocument()
    
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    expect(screen.queryByText('Email is invalid.')).not.toBeInTheDocument()
  })
})