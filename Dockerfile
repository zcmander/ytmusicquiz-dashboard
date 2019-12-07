# Build environment
FROM node:12-alpine as build

WORKDIR /app

ENV PATH=/app/node_modules/.bin/:$PATH

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --silent

COPY . /app

RUN npm run build

# Runtime environment
FROM nginx:1.17-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
