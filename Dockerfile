

FROM node:16.13.1-alpine as builder
#FROM node:9.6.1 as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
RUN npm install
RUN npm run build


# production environment
FROM nginx:stable-alpine
#FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
COPY ./default.conf /etc/nginx/conf.d/
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]




