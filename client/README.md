
# Desarrollo
npm run dev

# Preparar para producción
npm run build

# Probar producción localmente
npm run start



For build docker: 
```
docker build -t frontend-app \
 --build-arg NEXT_PUBLIC_URL_BACKEND=http://localhost:8000/api \
 .
```
For run: 
```
docker run -p 3000:3000 frontend-app
```