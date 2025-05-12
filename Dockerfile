FROM node:18-alphine

WORKDIR /app

# Copia somente arquivos necessários primeiro (para melhor cache)
COPY package*.json ./
RUN npm install --omit=dev --no-audit --prefer-offline

# Agora sim copia o restante do código
COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
