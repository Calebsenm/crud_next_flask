import pytest
import sys
import os
from unittest.mock import Mock, MagicMock, patch

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

from src.main import app as flask_app

@pytest.fixture
def app():
    flask_app.config.update({"TESTING": True})
    yield flask_app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def mock_db_connection():
    """Mock para la conexión a la base de datos - CORREGIDO"""

    with patch('src.routes.empresas.get_connection') as mock_conn:
        mock_cursor = MagicMock()
        
        mock_cursor.fetchall.return_value = []
        mock_cursor.fetchone.return_value = None
        mock_cursor.execute = Mock()
        mock_cursor.close = Mock()
        
        mock_cursor.cursor_factory = None

        mock_conn.return_value.cursor.return_value = mock_cursor
        mock_conn.return_value.commit = Mock()
        mock_conn.return_value.close = Mock()

        with patch('src.db.database.get_connection', return_value=mock_conn.return_value):
            yield {
                'conn': mock_conn.return_value,
                'cursor': mock_cursor
            }