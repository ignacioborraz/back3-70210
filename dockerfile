# Selecciona una imagen base
FROM node

# Establece el directorio de trabajo
WORKDIR /coder-server

# Copia los archivos de la aplicación
COPY package.json ./
RUN npm install
COPY . .

# Expone el puerto de la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["npm", "start"]