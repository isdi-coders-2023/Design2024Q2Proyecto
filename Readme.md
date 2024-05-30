# Proyecto de Grupo Curso de Diseño 2024 Q2

Este repositorio corresponde al Proyecto de Grupo del Curso de Diseño 2024 Q2.

# Instalación del proyecto

El proyecto está basado en un stack Javascript:

-   Nest.js como framework de backend
-   Prisma como ORM, con una BD Sqlite3
-   Vite.js + React en el frontend

## Requisitos

Los requisitos del proyecto son:

-   Node.js v18.18
-   Yarn 1.22.22

Aunque no es estrictamente necesario, es conveniente tener instalado el cliente
de SQlite3, en los casos en los que esté disponible.

## Instalación

Una vez clonado el repositorio, seguir los siguientes pasos:

### Instalación del backend

-   Instalar las dependencias

```
cd backend
yarn
```

-   Crear la BD

```
npx prisma migrate deploy
```

-   Poblar la BD

```
npx prisma db seed
```

-   Arrancar el servidor

```
yarn start:dev
```

### Instalación del frontend

-   Instalar las dependencias

```
cd frontend
```

-   Arrancar el frontend

```
yarn dev
```
