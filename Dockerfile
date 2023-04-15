# build environment

## pull official base image
#FROM node:13.12.0-alpine
#
## set working directory
#WORKDIR /app
#
## add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH
#
## install app dependencies
#COPY package.json ./
#COPY package-lock.json ./
#RUN npm install --silent
#RUN npm install react-scripts@5.0.1 -g --silent
#
## add app
#COPY . ./
#
## start app
#CMD ["npm", "start"]







# build environment
FROM node:16.13.1-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@5.0.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#



#FROM node:16.13.1 as builder
##FROM node:9.6.1 as builder
#RUN mkdir /usr/src/app
#WORKDIR /usr/src/app
#ENV PATH /usr/src/app/node_modules/.bin:$PATH
#COPY . /usr/src/app
#RUN npm install
#RUN npm run build
#
## production environment
#FROM nginx:1.13.9-alpine
#RUN rm -rf /etc/nginx/conf.d
#RUN mkdir -p /etc/nginx/conf.d
#COPY ./default.conf /etc/nginx/conf.d/
#COPY --from=builder /usr/src/app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
