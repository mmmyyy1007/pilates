FROM php:8.3-fpm

# PHPの拡張機能とツールをインストール
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nano \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# xdebugをインストール
RUN pecl install xdebug && \
    docker-php-ext-enable xdebug && \
    rm -r /tmp/pear

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
