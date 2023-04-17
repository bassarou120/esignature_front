

# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npx", "serve", "build" ]


#FROM node:16.13.1-alpine as builder
##FROM node:9.6.1 as builder
#RUN mkdir /usr/src/app
#WORKDIR /usr/src/app
#ENV PATH /usr/src/app/node_modules/.bin:$PATH
#COPY . /usr/src/app
#RUN npm install
#RUN npm run build
#
#
#
#
## production environment
#FROM nginx:stable-alpine
##FROM nginx:1.13.9-alpine
#RUN rm -rf /etc/nginx/conf.d
#RUN mkdir -p /etc/nginx/conf.d
#COPY ./default.conf /etc/nginx/conf.d/
#COPY --from=builder /usr/src/app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
