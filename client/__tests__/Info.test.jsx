import { render, screen, waitFor } from '@testing-library/react'
import Info from '@/app/info/page'
import '@testing-library/jest-dom'

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: 1, nombre_empresa: 'Empresa 1', direccion: 'Dir 1', nit: '111', correo: 'e1@test.com' },
      { id: 2, nombre_empresa: 'Empresa 2', direccion: 'Dir 2', nit: '222', correo: 'e2@test.com' }
    ]),
  })
)

describe('Info Page', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  test('fetch de datos de empresas', async () => {
    render(<Info />)
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/empresas'))
    })
  })
})