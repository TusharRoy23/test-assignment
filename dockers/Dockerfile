FROM node:16.18.0-alpine as buildContainer

WORKDIR /app
COPY ./package*.json /app/
RUN npm install
COPY . /app
RUN npm run build

FROM --platform=linux/x86_64 nginx:1.16.0-alpine

# Get all the code needed to run the app
COPY --from=buildContainer /app/build/ /usr/share/nginx/html
COPY ./dockers/templates/nginx.conf /etc/nginx/nginx.conf

# Expose the port the app runs in
EXPOSE 80

# Serve the app
CMD ["nginx", "-g", "daemon off;"]