import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Dato from '../src/components/userTable' 
import '@testing-library/jest-dom'

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Deleted successfully' }),
  })
)


describe('userTable Component', () => {

  const mockEmpresa = {
    id: 1,
    nombre_empresa: 'Empresa Test',
    direccion: 'Calle 123',
    nit: '123456',
    telefono: '5551234',
    correo: 'test@test.com'
  }

  beforeEach(() => {
    fetch.mockClear()
  })


  test('muestra datos de la empresa', () => {
    render(<Dato empresa={mockEmpresa} />)
    expect(screen.getByText('Empresa Test')).toBeInTheDocument()
    expect(screen.getByText('Calle 123')).toBeInTheDocument()
  })

  test('muestra botones de acción', () => {
    render(<Dato empresa={mockEmpresa} />)
    expect(screen.getByText('Borrar')).toBeInTheDocument()
    expect(screen.getByText('Editar')).toBeInTheDocument()

  })

})

