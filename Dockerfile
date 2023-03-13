# Imagen base de Ubuntu 20.04
FROM ubuntu:20.04

# Actualizar índice de paquetes
RUN apt-get update

# Instalar Node.js
RUN apt-get install -y curl gnupg && curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs

# Instalar MongoDB
RUN apt-get install -y mongodb

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de la carpeta raíz
COPY . .

# Copiar el archivo de dependencias de Node.js
COPY package*.json ./

# Instalar Angular
RUN npm install -g @angular/cli

# Instalar dependencias
RUN npm install

# Exponer el puerto 3000
EXPOSE 3000

# Iniciar la aplicación
CMD ["tail", "-f", "/dev/null"]