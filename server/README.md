### Create a venv 
python3 -m venv  .venv 

### Activate 
source .venv/bin/activate

### Install dependency
pip install -r requirements.txt

### For migration:  
install: 
golang-migrate

add ENV: 
export FLASKDB_DSN='postgres://user:password@localhost/db_name'

Run migration: 
migrate -path=./migrations -database=$FLASKDB_DSN up

Create a migration: 
migrate create -seq -ext=.sql -dir=./migrations create_name_table



### Run dev project : 
flask --app src/main.py  run

### Deploy :
gunicorn --bind 0.0.0.0:8000 src.main:app


### Deploy:

# 1. Desarrollo normal
# Migraciones manuales cuando cambias la BD
migrate -path=./migrations -database=$FLASKDB_DSN up

# 2. Construyes la app
docker build -t backend-app .

# 3. La ejecutas (conectada a tu BD local)
docker run -t -p 8000:8000 \
  --network="host" \
  --name mi-backend \
  -e DB_HOST=localhost \
  -e DB_PORT=5432 \
  -e DB_DATABASE=flask_demo \
  -e DB_USER=postgres \
  -e DB_PASSWORD=admin \
  backend-app

# 4. Si necesitas nuevas migraciones, las haces en tu máquina
# y luego reinicias el contenedor
docker restart mi-backend