import pytest
import json

def test_create_empresa_missing_fields(client):
    """Test para POST con campos faltantes"""
    incomplete_data = {
        "nombre_empresa": "Empresa Test",
    }
    
    response = client.post(
        "/api/empresas",
        data=json.dumps(incomplete_data),
        content_type="application/json"
    )

def test_create_empresa_invalid_json(client):
    """Test para POST con JSON inválido"""
    response = client.post(
        "/api/empresas",
        data="esto no es json",
        content_type="application/json"
    )
    assert response.status_code == 400