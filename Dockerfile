FROM node:20-alpine AS build
WORKDIR /build
COPY package.json package.json 
COPY package-lock.json package-lock.json
RUN npm ci
COPY tsconfig.json tsconfig.json
COPY tsconfig.node.json tsconfig.node.json
COPY index.html index.html
COPY public/ public
COPY src/ src
RUN npm run build

FROM httpd:alpine
WORKDIR /usr/local/apache2/htdocs/
COPY --from=build /build/dist/ .