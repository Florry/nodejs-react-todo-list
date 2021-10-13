FROM mhart/alpine-node:14

ARG MONGO_DB_URL
ARG LOG_LEVEL

WORKDIR /app
ADD . .

RUN	npm run build
EXPOSE 8080

CMD ["npm", "start"]