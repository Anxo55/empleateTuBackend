```bash
npm init -y
npm i -D typescript tsx @types/node  
npx tsc --init
npm i -D @types/express
npm i -D @swc/core @swc/cli 

npm install prisma @prisma/client
npm prisma

npm i -D bcrypt
npm i --save @types/bcrypt

npm i jsonwebtoken
npm i -D @types/jsonwebtoken

npm i express-rate-limit
npm i helmet

npm i compression
npm i --save-dev @types/compression

npm i cookie-parser
npm i --save-dev @types/cookie-parser

npm i cors
npm i --save-dev @types/cors

npm i express-validator

npm install -g npm-check-updates
npx npm-check-updates //comprobar
npx npm-check-updates -u //actualiza


```
# Ejercicio 1
- [X] Crea el endpoint que liste todos los usuarios de la web

- [X] A este endpoint solo puede acceder el usuario - role=admin

- [X]Crea rutas, servicio, controllers, middleware


# Ejercicio 2
- [] Valida mediante un middleware

- [] El formulario de registro

- [] Comprueba que el email sea valido

- [] Comprueba que el password se de minimo 4 letras

# Ejercicio 3

- [X] Crea un frontend con vite + tailwind 4.0 y react