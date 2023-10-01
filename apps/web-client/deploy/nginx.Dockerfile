FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

VOLUME ["/var/log/nginx", "/var/www"]

