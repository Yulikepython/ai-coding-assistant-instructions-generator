# JavaScript/TypeScript コード・ファイルの場合

## パッケージ管理
- **パッケージ管理**: npm, yarn

## 環境固有の注意事項
- `package-lock.json` がある場合は `npm ci` を、`yarn.lock` がある場合は `yarn install --frozen-lockfile` を使用
- Node.js のバージョンは `.nvmrc` または `engines` フィールドで指定されたものを使用

## コーディング規約
- **変数名・関数名**: camelCase
- **コンポーネント名・クラス名**: PascalCase
- **ファイル名**: kebab-case (React等) または camelCase (Node.js等)
- **定数**: UPPER_SNAKE_CASE
- **インターフェース名**: PascalCase (TypeScriptの場合はI prefixは使用しない)
- **関数命名**: 動詞で始める (get, set, create, update, delete, handle, on等)

## アーキテクチャ指針
```typescript
// ディレクトリ構造例
src/
├── domain/          // ドメインモデル
│   ├── entities/    // エンティティ
│   ├── valueObjects/ // 値オブジェクト
│   └── services/    // ドメインサービス
├── infrastructure/ // インフラ層
├── application/    // アプリケーションサービス
├── presentation/   // プレゼンテーション層
├── assets/         // 静的ファイル
│   ├── styles/     // CSS/SCSS分離
│   │   ├── scss/   // SCSSソースファイル
│   │   └── css/    // コンパイル後CSSファイル
│   ├── scripts/    // JavaScript分離
│   └── images/     // 画像ファイル
└── __tests__/      // テスト
```

## ファイル分離とモジュール管理

### 基本原則
- **関心の分離**: 機能・責任ごとにファイルを分離
- **単一責任**: 一つのファイル・モジュールは一つの責任を持つ
- **依存関係の最小化**: モジュール間の結合度を下げる

### ファイル分離例
```typescript
// ❌ 避けるべき（一つのファイルに全て）
// app.ts (1000行以上の巨大ファイル)
interface User { /* ... */ }
class UserService { /* ... */ }
class UserController { /* ... */ }
const userRoutes = express.Router();
// ... 他の機能も全て混在

// ✅ 推奨（責任ごとに分離）
// types/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

// services/UserService.ts
import { User } from '../types/User';
export class UserService { /* ... */ }

// controllers/UserController.ts
import { UserService } from '../services/UserService';
export class UserController { /* ... */ }

// routes/userRoutes.ts
import { UserController } from '../controllers/UserController';
export const userRoutes = express.Router();
```

### CSS/スタイル分離
```typescript
// ❌ 避けるべき（JS内にスタイル混在）
const StyledButton = styled.div`
  color: red;
  font-size: 16px;
  padding: 10px;
  background: blue;
  border-radius: 4px;
`;

// ✅ 推奨（CSS変数・外部スタイル分離）
// styles/variables.css
:root {
  --color-primary: #0066cc;
  --color-danger: #dc3545;
  --font-size-base: 1rem;
  --spacing-sm: 0.5rem;
}

// styles/components/button.css
.button {
  font-size: var(--font-size-base);
  padding: var(--spacing-sm);
  border-radius: 4px;
}

.button--primary {
  background: var(--color-primary);
  color: white;
}

// components/Button.tsx
import './button.css';
export const Button = ({ variant, children }) => (
  <button className={`button button--${variant}`}>
    {children}
  </button>
);
```

## SCSS（Sass）を使用する場合

### SCSS基本方針
- **変数管理**: SCSS変数で定数を集約管理
- **ネスト構造**: 適度なネスト（3階層まで）で可読性を保つ
- **ミックスイン活用**: 再利用可能なスタイルパターンを定義
- **パーシャル分割**: 機能・コンポーネント別にファイル分割

### 推奨ディレクトリ構造
```
src/
└── styles/
    ├── scss/                    // SCSSソースファイル
    │   ├── abstracts/          // 変数・ミックスイン・関数
    │   │   ├── _variables.scss // 変数定義
    │   │   ├── _mixins.scss   // ミックスイン定義
    │   │   └── _functions.scss // カスタム関数
    │   ├── base/               // ベーススタイル
    │   │   ├── _reset.scss    // リセットCSS
    │   │   └── _typography.scss // タイポグラフィ
    │   ├── components/         // コンポーネント
    │   │   ├── _button.scss   // ボタンコンポーネント
    │   │   ├── _card.scss     // カードコンポーネント
    │   │   └── _form.scss     // フォームコンポーネント
    │   ├── layout/            // レイアウト
    │   │   ├── _header.scss   // ヘッダー
    │   │   ├── _footer.scss   // フッター
    │   │   └── _grid.scss     // グリッドシステム
    │   └── main.scss          // メインファイル（インポート統合）
    └── css/                   // コンパイル後CSSファイル（gitignore推奨）
        └── main.css
```

### SCSS変数とミックスイン例
```scss
// abstracts/_variables.scss
// カラーパレット
$color-primary: #007bff !default;
$color-secondary: #6c757d !default;
$color-success: #28a745 !default;
$color-danger: #dc3545 !default;

// スペーシング
$spacing-xs: 0.25rem !default;
$spacing-sm: 0.5rem !default;
$spacing-md: 1rem !default;
$spacing-lg: 1.5rem !default;
$spacing-xl: 2rem !default;

// ブレークポイント
$breakpoint-sm: 576px !default;
$breakpoint-md: 768px !default;
$breakpoint-lg: 992px !default;
$breakpoint-xl: 1200px !default;

// abstracts/_mixins.scss
@mixin button-base {
  display: inline-block;
  padding: $spacing-sm $spacing-md;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

@mixin respond-to($breakpoint) {
  @if $breakpoint == small {
    @media (min-width: $breakpoint-sm) { @content; }
  }
  @if $breakpoint == medium {
    @media (min-width: $breakpoint-md) { @content; }
  }
  @if $breakpoint == large {
    @media (min-width: $breakpoint-lg) { @content; }
  }
}
```

### コンポーネントSCSS例
```scss
// components/_button.scss
.button {
  @include button-base;
  
  &--primary {
    background-color: $color-primary;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: darken($color-primary, 10%);
    }
  }
  
  &--secondary {
    background-color: $color-secondary;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: darken($color-secondary, 10%);
    }
  }
  
  &--large {
    padding: $spacing-md $spacing-lg;
    font-size: 1.125rem;
  }
  
  &--small {
    padding: $spacing-xs $spacing-sm;
    font-size: 0.875rem;
  }
}
```

### メインSCSSファイル
```scss
// main.scss - インポート統合ファイル
// Abstracts
@import 'abstracts/variables';
@import 'abstracts/mixins';
@import 'abstracts/functions';

// Base
@import 'base/reset';
@import 'base/typography';

// Layout
@import 'layout/header';
@import 'layout/footer';
@import 'layout/grid';

// Components
@import 'components/button';
@import 'components/card';
@import 'components/form';
```

### package.jsonスクリプト設定
```json
{
  "scripts": {
    "scss": "sass src/styles/scss/main.scss src/styles/css/main.css",
    "scss:watch": "sass --watch src/styles/scss/main.scss:src/styles/css/main.css",
    "scss:build": "sass src/styles/scss/main.scss src/styles/css/main.css --style compressed"
  },
  "devDependencies": {
    "sass": "^1.69.0"
  }
}
```

### 文字列ハードコーディング防止（SCSS版）
```scss
// ❌ 避けるべき
.button-primary { 
  background: #007bff; 
  padding: 8px 16px;
  margin: 10px 0;
}
.text-primary { 
  color: #007bff; 
  font-size: 16px;
}

// ✅ 推奨（SCSS変数活用）
$colors: (
  primary: #007bff,
  secondary: #6c757d,
  success: #28a745
) !default;

$spacings: (
  xs: 0.25rem,
  sm: 0.5rem,
  md: 1rem,
  lg: 1.5rem
) !default;

@function color($name) {
  @return map-get($colors, $name);
}

@function spacing($name) {
  @return map-get($spacings, $name);
}

.button-primary { 
  background: color(primary);
  padding: spacing(xs) spacing(sm);
  margin: spacing(sm) 0;
}

.text-primary { 
  color: color(primary);
  font-size: 1rem;
}
```

## 実装パターン
- **エンティティ例** (TypeScript):
  ```typescript
  export class User {
    constructor(
      private readonly _id: UserId,
      private _name: string,
      private _email: Email
    ) {}

    changeEmail(newEmail: Email): void {
      // ビジネスルールの検証
      this._email = newEmail;
    }

    get id(): UserId { return this._id; }
    get name(): string { return this._name; }
    get email(): Email { return this._email; }
  }
  ```

- **値オブジェクト例** (TypeScript):
  ```typescript
  export class Email {
    constructor(private readonly _value: string) {
      if (!this.isValidFormat(_value)) {
        throw new Error('Invalid email format');
      }
    }

    get value(): string { return this._value; }
    
    private isValidFormat(email: string): boolean {
      // バリデーション実装
    }
  }
  ```

## JavaScript/TypeScript固有のベストプラクティス

### TypeScript設定
- 厳格なtype checking (`"strict": true`)
- 適切なtsconfig.jsonの設定
- 型定義ファイル (.d.ts) の活用

### 非同期処理
- async/await の使用を優先
- Promise チェーンよりも async/await
- 適切なエラーハンドリング

### モジュール設計
- ES6 modules の使用
- 名前付きエクスポートを優先
- デフォルトエクスポートは単一クラス/関数のみ

### テスト
- Jest を使用したユニットテスト
- テスト駆動開発 (TDD) の実践
- モックの適切な使用

## 文字列ハードコーディング防止例

### JavaScript
```javascript
// ❌ 悪い例
function processUser(status) {
    if (status === "active") {
        return "User is active";
    } else if (status === "inactive") {
        return "User is inactive";
    }
}

// ✅ 良い例
const UserStatus = Object.freeze({
    ACTIVE: 'active',
    INACTIVE: 'inactive'
});

const UserMessage = Object.freeze({
    ACTIVE_USER: 'User is active',
    INACTIVE_USER: 'User is inactive',
    UNKNOWN_STATUS: 'Unknown status'
});

function processUser(status) {
    const messageMap = {
        [UserStatus.ACTIVE]: UserMessage.ACTIVE_USER,
        [UserStatus.INACTIVE]: UserMessage.INACTIVE_USER,
    };
    return messageMap[status] || UserMessage.UNKNOWN_STATUS;
}
```

### TypeScript
```typescript
// ❌ 悪い例
function processUser(status: string): string {
    if (status === "active") {
        return "User is active";
    } else if (status === "inactive") {
        return "User is inactive";
    }
    return "Unknown status";
}

// ✅ 良い例
enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

enum UserMessage {
    ACTIVE_USER = 'User is active',
    INACTIVE_USER = 'User is inactive',
    UNKNOWN_STATUS = 'Unknown status'
}

function processUser(status: UserStatus): string {
    const messageMap: Record<UserStatus, UserMessage> = {
        [UserStatus.ACTIVE]: UserMessage.ACTIVE_USER,
        [UserStatus.INACTIVE]: UserMessage.INACTIVE_USER,
    };
    return messageMap[status] || UserMessage.UNKNOWN_STATUS;
}
```