FROM node:current-slim
ENV PORT 8080
RUN mkdir /app
RUN set -ex && apt update
COPY dist/* /app
WORKDIR /app
RUN npm i
CMD ["node", "index.js"]