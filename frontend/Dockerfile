FROM node:14.16.0-alpine3.13

# ENV PORT=3000

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

EXPOSE 3000

# WORKDIR /app
CMD ["npm", "start"]