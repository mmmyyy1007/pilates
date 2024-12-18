# 環境構築手順書

## 前提条件

以下のツールが全てインストールされていること。

- Git
- Docker および Docker Compose
- Visual Studio Code
- Dev Containers Extension (VS Code 拡張機能)

---

## 手順

### 1. プロジェクトの作成

プロジェクトを作成する。

```bash
mkdir docker-laravel
cd docker-laravel
```

### 2. ディレクトリ構成の確認

```
docker-laravel
├ backend
├ docker
│ ├ backend
│ │ ├ .devcontainer
│ │ │ └ devcontainer.json
│ │ ├ Dockerfile
│ │ └ php.ini
│ ├ db
│ │ ├ Dockerfile
│ │ └ my.cnf
│ └ frontend
│ 　 ├ .devcontainer
│ 　 │ └ devcontainer.json
│ 　 └ Dockerfile
├ frontend
└ compose.yaml

```

### 3. バックエンドのセットアップ

#### 3.1 コンテナの起動

Ctrl+Shift+P キーを押下し、以下コマンドを実行する。docker/backend フォルダを選択する。

```
Dev Containers: Open Folder in Container...
```

ビルドが完了するまで待つ。（初回ビルドだけ少し時間がかかる）

#### 3.2 依存関係のインストール

以下コマンドを実行し、依存関係をインストールする。

```bash
composer install
```

#### 3.3 環境変数と APP キーの生成

以下コマンドを実行し、.env ファイルを生成する。

```bash
cp .env.example .env
```

以下コマンドを実行し、APP キーを生成する。

```bash
php artisan key:generate
```

.env の下記項目を上書き及び追加する。

```
APP_TIMEZONE=Asia/Tokyo
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

APP_LOCALE=ja
APP_FAKER_LOCALE=ja_JP

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=pilates
DB_USERNAME=pilates
DB_PASSWORD=pilates

SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost:8000,localhost:5173

TELESCOPE_ENABLED=true
```

#### 3.4 DB のマイグレーション

以下コマンドを実行し、初回マイグレーションを実行する。

```bash
php artisan migrate
```

#### 3.5 起動確認

以下コマンドを実行し、アプリケーションを起動する。

```bash
composer clear
composer serve
```

以下の URL にアクセスし、正常に表示されることを確認する。

- Laravel ウェルカムページ(バージョン情報が返れば OK)
  - http://localhost:8000/
- Telescope ダッシュボード
  - http://localhost:8000/telescope

F5 キーを押下するとデバッグ起動することを確認する。

### 4. フロントエンドのセットアップ

#### 4.1 コンテナの起動

Ctrl+Shift+P キーを押下し、以下コマンドを実行する。docker/frontend フォルダを選択する。

```
Dev Containers: Open Folder in Container...
```

#### 4.2 依存関係のインストール

以下コマンドを実行し、依存関係をインストールする。

```bash
npm i
```

#### 4.3 起動確認

以下コマンドを実行し、アプリケーションを起動する。

```bash
npm run dev
```

以下の URL にアクセスし、正常に表示されることを確認する。

- ログイン画面
  - http://localhost:5173/

F5 キーを押下するとデバッグ起動することを確認する。
