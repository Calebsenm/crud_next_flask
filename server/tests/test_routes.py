import pytest
import json
from unittest.mock import Mock

def test_home_route(client):
    """Test para la ruta home"""
    response = client.get("/")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["message"] == "API Flask funcionando"

def test_get_empresas(client, mock_db_connection):
    """Test para GET /api/empresas"""
    mock_conn = mock_db_connection['conn']; mock_cursor = mock_db_connection['cursor']
    
    mock_data = [
        {"id": 1, "nombre_empresa": "Empresa Test", "direccion": "Calle 123"},
        {"id": 2, "nombre_empresa": "Otra Empresa", "direccion": "Calle 456"}
    ]
    mock_cursor.fetchall.return_value = mock_data
    
    response = client.get("/api/empresas")
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) == 2
    assert data[0]["nombre_empresa"] == "Empresa Test"

    mock_cursor.execute.assert_called_once_with("SELECT * FROM empresas")


def test_create_empresa(client, mock_db_connection):
    """Test para POST /api/empresas"""
    mock_conn = mock_db_connection['conn']
    mock_cursor = mock_db_connection['cursor']
    
    mock_cursor.reset_mock()
    mock_conn.reset_mock()
    
    new_empresa = {
        "nombre_empresa": "Nueva Empresa",
        "direccion": "Nueva Dirección",
        "nit": "123456789",
        "telefono": "5551234",
        "correo": "nueva@empresa.com"
    }
    
    response = client.post(
        "/api/empresas",
        data=json.dumps(new_empresa),
        content_type="application/json"
    )
    
    assert response.status_code == 200
    assert response.data.decode() == "Datos Gurardados"

    print(f"mock_cursor.execute call count: {mock_cursor.execute.call_count}")
    print(f"mock_cursor.execute calls: {mock_cursor.execute.call_args_list}")
    
    mock_cursor.execute.assert_called_once_with(
        "INSERT INTO empresas (nombre_empresa, direccion, nit, telefono, correo) VALUES (%s, %s, %s, %s, %s)",
        ("Nueva Empresa", "Nueva Dirección", "123456789", "5551234", "nueva@empresa.com")
    )
    mock_conn.commit.assert_called_once()

def test_get_empresa_by_id(client, mock_db_connection):
    """Test para GET /api/empresas/<id>"""
    mock_conn = mock_db_connection['conn']; mock_cursor = mock_db_connection['cursor']
    
    mock_data = {"id": 1, "nombre_empresa": "Empresa Test"}
    mock_cursor.fetchone.return_value = mock_data
    
    response = client.get("/api/empresas/1")
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["id"] == 1
    assert data["nombre_empresa"] == "Empresa Test"

    mock_cursor.execute.assert_called_once_with("SELECT * FROM empresas WHERE id=%s", ('1',))
    
    

def test_update_empresa(client, mock_db_connection):
    """Test para PUT /api/empresas/<id>"""
    mock_conn = mock_db_connection['conn']; mock_cursor = mock_db_connection['cursor']
    
    mock_cursor.fetchone.return_value = {"id": 1, "nombre_empresa": "Empresa Actualizada"}
    
    update_data = {
        "nombre_empresa": "Empresa Actualizada",
        "direccion": "Dirección Actualizada",
        "nit": "987654321",
        "telefono": "5554321",
        "correo": "actualizada@empresa.com"
    }
    
    response = client.put(
        "/api/empresas/1",
        data=json.dumps(update_data),
        content_type="application/json"
    )
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["nombre_empresa"] == "Empresa Actualizada"

    mock_cursor.execute.assert_called_once_with(
        "UPDATE empresas SET nombre_empresa=%s, direccion=%s, nit=%s, telefono=%s, correo=%s WHERE id=%s RETURNING * ",
        ("Empresa Actualizada", "Dirección Actualizada", "987654321", "5554321", "actualizada@empresa.com", '1')
    )

def test_delete_empresa(client, mock_db_connection):
    """Test para DELETE /api/empresas/<id>"""
    mock_conn = mock_db_connection['conn']; mock_cursor = mock_db_connection['cursor']

    mock_cursor.fetchall.return_value = [{"id": 1}]
    
    response = client.delete("/api/empresas/1")
    
    assert response.status_code == 200
    assert response.data.decode() == "Datos eliminados"
  
    assert mock_cursor.execute.call_count == 2  
    mock_conn.commit.assert_called_once()

def test_delete_empresa_not_found(client, mock_db_connection):
    """Test para DELETE cuando no existe la empresa"""
    mock_conn = mock_db_connection['conn']; mock_cursor = mock_db_connection['cursor']

    mock_cursor.fetchall.return_value = []
    
    response = client.delete("/api/empresas/999")
    
    assert response.status_code == 404
    data = json.loads(response.data)
    assert data["message"] == "No se encontro la empresa"