# Backend - BI

Para el backend del proyecto se utilizo FastAPI, para automatizar este servicio se dockerizo y se desplego en google cloud run para tener disponibilidad del servicio en la nube las 24 horas al dia y conectarlo con la aplicación web.

## Como ejecutar el proyecto?

### Local

Para ejecutar el proyecto localmente se requiere docker y correr el siguiente comando,

`docker compose up -d`

Este comando despliega el servicio e instala las dependencias necesarias para el funcionamiento correcto del servicio.

### Nube

Para acceder al servicio desde la nube se pude realizar desde el siguiente enlace:

https://fastapi-967824586620.us-central1.run.app/docs

## Adicionales

### Generar las dependencias

Para generar el archivo de dependencias automaticamente se puede hacer de la siguiente manera

`pip3 freeze > requirements.txt`
