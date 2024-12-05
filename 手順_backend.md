# Laravel 11 + Breeze + Telescope セットアップ手順

## 1. プロジェクト作成

```bash
composer create-project --prefer-dist laravel/laravel:^11.0 .
```

## 2. Laravel Breeze 導入

#### 2.1. 環境設定

`.env`ファイルに以下を設定

```
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=pilates
DB_USERNAME=pilates
DB_PASSWORD=pilates

SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost
```

#### 2.2. インストールと設定

```bash
composer require laravel/breeze --dev && php artisan breeze:install api && php artisan migrate
```

## 3. Laravel Telescope 導入

#### 3.1. インストールと初期設定

```bash
composer require laravel/telescope --dev && php artisan telescope:install && php artisan migrate
```

#### 3.2. 環境設定

`.env`ファイルに以下を追記：

```
TELESCOPE_ENABLED=true
```

#### 3.3. CSRF 保護の除外設定

`bootstrap/app.php`に以下を追記し、Telescope を認証対象外に設定

```php
$middleware->validateCsrfTokens(except: [
    'telescope/*',
]);
```

## 4. アプリケーション起動

```bash
php artisan serve --host 0.0.0.0
```

## 5. 動作確認

以下の URL にアクセスし、正常に表示されることを確認

- Laravel ウェルカムページ(バージョン情報が返れば OK)
  - http://localhost:8000/
- Telescope ダッシュボード
  - http://localhost:8000/telescope

## 6. キャッシュクリア

環境変数などの設定を変更した場合は毎回以下コマンドを実行すること

```bash
php artisan config:clear && php artisan cache:clear && php artisan route:clear && php artisan view:clear
```

## 7. コマンド登録

以下のコマンドを `composer.json` の `scripts` セクション に登録するとコマンド入力が楽になる

```json
"clear": [
    "php artisan cache:clear",
    "php artisan config:clear",
    "php artisan route:clear",
    "php artisan view:clear"
],
"migrate-fresh": "php artisan migrate:fresh --seed",
"serve": "php artisan serve --host 0.0.0.0"
```

```json
それぞれ、以下で実行可能となる
composer clear
composer migrate-fresh
composer serve
```
