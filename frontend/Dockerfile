FROM node AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build --prod

FROM nginx:stable
COPY --from=build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80