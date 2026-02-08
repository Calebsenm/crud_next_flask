import pytest
from unittest.mock import patch, MagicMock
from src.db.database import get_connection

def test_get_connection_success():
    """Test para conexión exitosa"""
    with patch('src.db.database.connect') as mock_connect:
        mock_conn = MagicMock()
        mock_connect.return_value = mock_conn
        
        conn = get_connection()
        
        assert conn is not None
        mock_connect.assert_called_once_with(
            host='localhost',
            user='postgres',
            password='admin',
            database='flask_demo',
            port='5432'
        )

def test_get_connection_failure():
    """Test para error de conexión"""
    with patch('src.db.database.connect') as mock_connect:
        mock_connect.side_effect = Exception("Error de conexión")
        conn = get_connection()
        
        assert conn is None