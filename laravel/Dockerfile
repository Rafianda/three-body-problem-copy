# backend-laravel/Dockerfile
FROM php:8.2-fpm-alpine
WORKDIR /var/www
RUN apk add --no-cache zip unzip curl libzip-dev && docker-php-ext-install pdo_mysql zip
COPY . .
RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer
COPY .env.example .env
RUN composer install
RUN chown -R www-data:www-data /var/www
USER www-data
RUN php artisan key:generate && php artisan migrate --seed && php artisan serve --port=8001
