# Vite+React+TypeScript セットアップ手順

## 1. プロジェクト作成

#### 1.1. ひな型作成

```bash
npm create vite@latest . --template react-ts
```

#### 1.2. 初期依存関係インストール

```bash
npm i
```

#### 1.3. 起動コマンド書き換え

`package.json`の`scripts`セクションを以下のように書き換える

```json
"scripts": {
    "dev": "vite --host", // ここに --host オプションを追記
    ...
},
```

#### 1.4. 起動確認

##### 1.4.1 起動

以下コマンドを実行し、アプリケーションを起動する

```bash
npm run dev
```

##### 1.4.2 起動確認

以下の URL にアクセスし、正常に表示されることを確認

- Vite ウェルカムページ
  - http://localhost:5173

##### 1.4.3 デバッグ起動確認

キーボードの F5 を押下して、デバッグモードのブラウザが起動することを確認

## 2. フォーマッター設定

#### 2.1 .prettierrc 設定

`.prettierrc`をプロジェクトルートに作成し、以下のように記述する

```
{
    "arrowParens": "always",
    "bracketSpacing": true,
    "endOfLine": "lf",
    "htmlWhitespaceSensitivity": "css",
    "jsxBracketSameLine": false,
    "jsxSingleQuote": false,
    "printWidth": 120,
    "semi": true,
    "singleQuote": false,
    "tabWidth": 4,
    "useTabs": false,
    "plugins": [
        "prettier-plugin-organize-imports"
    ]
}
```

#### 2.2 .prettierignore 設定

`.prettierignore`をプロジェクトルートに作成し、以下のように記述する

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Artifacts
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

build/
public/
node_modules/
**/*.min.js
.*lintrc.js
```

#### 2.3 import 整形設定

以下のコマンドを実行し、モジュールをインストールする

```bash
npm i -D prettier-plugin-organize-imports
```

## 3. リンター設定

#### 3.1 モジュールのインストール

以下のコマンドを実行し、モジュールをインストールする

```bash
npm i -D eslint-config-prettier eslint-plugin-react-hooks
```

#### 3.2 ESLint 初期化

以下のコマンドを実行する

```bash
npx eslint --init
```

以下のように選択肢を進める

✔ How would you like to use ESLint? > **To check syntax and find problem**
✔ What type of modules does your project use? > **JavaScript module (import/export)**
✔ Which framework does your project use? > **React**
✔ Does your project use TypeScript? > **Yes**
✔ Where does your code run? > **browser**
✔The config that you've selected requires the following dependencies:
eslint, globals, @eslint/js, typescript-eslint, eslint-plugin-react> No / **Yes**
✔ Which package manager do you want to use? > **npm**

#### 3.3 モジュールのインストール

以下のコマンドを実行し、モジュールをインストールする

```bash
npm i -D  @eslint/compat
```

#### 3.4 eslint.config.js 設定

`eslint.config.js`を以下のように修正する

```javascript
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/build/",
      "**/public/",
      "**/node_modules/",
      "**/*.min.js",
      "**/.*lintrc.js",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier"
    )
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      "react-hooks": fixupPluginRules(reactHooks),
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "no-debugger": "warn",
      "react/prop-types": "error",
      "no-process-exit": "error",
    },
  },
];
```

## 4. インポートエリアス設定

#### 4.1 モジュールのインストール

以下のコマンドを実行し、モジュールをインストールする

```bash
npm i -D vite-tsconfig-paths
```

#### 4.2 tsconfig.app.json 設定

`tsconfig.app.json`に下記を追記する

```json
/* Import alias */
"baseUrl": "./",
"paths": {
	"@/*": ["src/*"]
}
```

#### 4.3 vite.config.ts 設定

`vite.config.ts`を以下のように修正する

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
});
```

## 5. テスト設定

今回は省略する

## 6. StoryBook 導入

今回は省略する

## 7. モックサーバー導入

今回は省略する

## 8. husky+lint-stage 導入

今回は省略する
