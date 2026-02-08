from flask import Blueprint, request, jsonify
from src.db.database import get_connection
from psycopg2 import  extras
from flask import  request, jsonify

empresas = Blueprint('empresas', __name__, url_prefix='/api')

# metodo get para obtener datos de la base de datos
@empresas.get("/empresas")
def get_empresas():
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)

    cur.execute("SELECT * FROM empresas")
    empresas = cur.fetchall()

    cur.close()
    return jsonify(empresas)


# metodo post para guardar datos en la base de datos
@empresas.post("/empresas")
def create_empresa():
    new_empresa = request.get_json()

      
    required_fields = ['nombre_empresa', 'direccion', 'nit', 'telefono', 'correo']
    for field in required_fields:
        if field not in new_empresa:
            return jsonify({'error': f'Campo faltante: {field}'}), 400
                
    nombre_empresa  = new_empresa['nombre_empresa']
    direccion = new_empresa['direccion']
    nit = new_empresa['nit']
    telefono = new_empresa['telefono']
    correo = new_empresa['correo']
    
    conn = get_connection()
    cur = conn.cursor()
    
    cur.execute("INSERT INTO empresas (nombre_empresa, direccion, nit, telefono, correo) VALUES (%s, %s, %s, %s, %s)", 
                (nombre_empresa, direccion, nit , telefono, correo) )
    
    conn.commit()
    cur.close()
 
    return 'Datos Gurardados'

# metodo put para actualizar datos de la base de datos
@empresas.put('/empresas/<id>')
def update_empresa(id):

    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor) 
    empresa = request.get_json()

    
    nombre_empresa  = empresa['nombre_empresa']
    direccion =  empresa['direccion']
    nit =   empresa['nit']
    telefono =  empresa['telefono']
    correo =    empresa['correo']

    cur.execute("UPDATE empresas SET nombre_empresa=%s, direccion=%s, nit=%s, telefono=%s, correo=%s WHERE id=%s RETURNING * ",
                (nombre_empresa, direccion, nit, telefono, correo, id))

    update_empresa = cur.fetchone()

    conn.commit()
    cur.close()
    conn.close()

    if  update_empresa is None:
        return jsonify({'message': 'No se encontro la empresa'})   , 404  
    
    return jsonify(update_empresa)

#metodo get  para obter el dato da la id 
@empresas.get('/empresas/<id>')
def get_empresa(id):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)

    cur.execute("SELECT * FROM empresas WHERE id=%s", (id,))
    empresa = cur.fetchone()

    cur.close()
    return jsonify(empresa)

# metodo delete para eliminar datos de la base de datos
@empresas.delete('/empresas/<id>')
def delete_empresa(id):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)

    cur.execute("SELECT * FROM empresas WHERE id=%s", (id,))
    id_exist = cur.fetchall()

    if  len(id_exist) == 0:
        return jsonify({'message': 'No se encontro la empresa'}) , 404

    cur.execute("DELETE FROM empresas WHERE id=%s", (id, ))

    conn.commit()
    cur.close()
    conn.close()

    return 'Datos eliminados'
