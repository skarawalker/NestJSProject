# Usa un'immagine Node.js leggera
FROM node:18-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia tutto il codice sorgente nel container
COPY . .

# Espone la porta usata da NestJS
EXPOSE 3000

# Comando per avviare l'app
CMD ["npm", "run", "start:dev"]