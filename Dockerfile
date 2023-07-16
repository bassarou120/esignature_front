

FROM node:16.13.1-alpine as builder
#FROM node:9.6.1 as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

ARG REACT_APP_API_BASE_URL
ARG REACT_APP_BACKEND_ASSET_BASE_URL
ARG REACT_APP_NAME

ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_BACKEND_ASSET_BASE_URL=$REACT_APP_BACKEND_ASSET_BASE_URL
ENV REACT_APP_NAME=$REACT_APP_NAME


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


# Set any ENVs



CMD ["nginx", "-g", "daemon off;"]




