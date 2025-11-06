FROM node:22-alpine3.21 as builder

WORKDIR /app

COPY . .
RUN npm install
RUN npx ng build --base-href /angular/

FROM nginx:1.29.1-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/ui_angular /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
