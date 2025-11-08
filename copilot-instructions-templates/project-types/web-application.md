# Copilot Instructions - Webアプリケーション用

あなたはWebアプリケーション開発の専属アシスタントです。以下の指示に従ってコードの生成・修正を行ってください。

## プロジェクト概要
[WebアプリケーションのUIデザイン、主要機能、対象ユーザーを記載してください]

## 指示文改善ルール
- ユーザーの指示が「**指示文改善」で始まる場合は、この copilot-instructions.md ファイル自体の内容を改善してください。
- 改善時も、ファイル内の他のルールを必ず遵守すること。

## Webアプリケーション開発方針

### UI/UX 重視
- **ユーザビリティ**: 直感的で使いやすいインターフェース
- **レスポンシブデザイン**: モバイル・タブレット・PC対応
- **アクセシビリティ**: WCAG 2.1 AA レベルの遵守
- **パフォーマンス**: 高速なページ読み込みとスムーズな操作感

### セキュリティ重視
- **認証・認可**: 適切なユーザー管理とアクセス制御
- **入力値検証**: XSS、SQLインジェクション対策
- **HTTPS通信**: 暗号化通信の実装
- **セッション管理**: 安全なセッションハンドリング

## アーキテクチャ設計

### フロントエンド構成
```
src/
├── components/      # 再利用可能なUIコンポーネント
│   ├── common/      # 共通コンポーネント
│   ├── forms/       # フォーム関連
│   └── layout/      # レイアウト関連
├── pages/           # ページコンポーネント
├── hooks/           # カスタムフック（React等）
├── services/        # API通信・外部サービス連携
├── stores/          # 状態管理（Redux, Zustand等）
├── utils/           # ユーティリティ関数
├── types/           # 型定義（TypeScript）
└── styles/          # スタイリング
    ├── components/  # コンポーネント別スタイル
    ├── pages/       # ページ別スタイル
    ├── globals/     # グローバルスタイル
    └── variables/   # CSS変数・定数
```

### ファイル分離の原則
- **関心の分離**: HTML構造、CSS装飾、JavaScript動作を明確に分離
- **単一責任**: 一つのファイルは一つの責任のみを持つ
- **再利用性**: 共通スタイルやコンポーネントは分離して再利用可能にする
- **保守性**: 機能追加・修正時に影響範囲を最小限に抑える

#### CSS分離例
```css
/* ❌ 避けるべき（インライン・混在） */
<div style="color: red; font-size: 16px;">
  <style>
    .component { background: blue; }
  </style>
</div>

/* ✅ 推奨（外部ファイル分離） */
<!-- HTML -->
<div class="error-message">エラーメッセージ</div>

/* styles/components/error-message.css */
.error-message {
  color: var(--color-error);
  font-size: var(--font-size-base);
  padding: var(--spacing-sm);
}
```

#### JavaScript分離例
```typescript
// ❌ 避けるべき（インライン混在）
<button onclick="handleSubmit()">送信</button>

// ✅ 推奨（外部ファイル分離）
<!-- HTML -->
<button class="submit-button">送信</button>

// scripts/form-handler.ts
const submitButton = document.querySelector('.submit-button');
submitButton?.addEventListener('click', handleSubmit);
```

### バックエンド構成
```
src/
├── controllers/     # リクエストハンドラー
├── services/        # ビジネスロジック
├── models/          # データモデル
├── middleware/      # ミドルウェア
├── routes/          # ルーティング
├── config/          # 設定ファイル
├── utils/           # ユーティリティ
└── types/           # 型定義
```

## 技術スタック別ガイド

### React.js / Next.js
- **コンポーネント設計**: 関数コンポーネント + Hooks
- **状態管理**: useState, useEffect, Context API or Redux
- **ルーティング**: React Router or Next.js Router
- **スタイリング**: CSS Modules, Styled-components, or Tailwind CSS

### Vue.js / Nuxt.js
- **コンポーネント設計**: Composition API 推奨
- **状態管理**: Pinia or Vuex
- **ルーティング**: Vue Router or Nuxt.js Router
- **スタイリング**: Scoped CSS or CSS Modules

### Node.js + Express
- **API設計**: RESTful API or GraphQL
- **データベース**: TypeORM, Prisma, or Mongoose
- **認証**: JWT or Session-based
- **バリデーション**: Joi, Yup, or express-validator

## 実装パターン

### コンポーネント例（React + TypeScript）
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large';
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

### API エンドポイント例（Node.js + Express）
```typescript
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const user = await this.userService.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userService.findUserById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

## 開発フロー

### 開発手順
1. **要件定義**: 機能仕様とUI/UX設計
2. **API設計**: エンドポイント定義とデータモデル
3. **フロントエンド実装**: コンポーネントとページ作成
4. **バックエンド実装**: API開発とデータベース連携
5. **統合テスト**: フロント・バック連携確認
6. **デプロイ**: 本番環境への展開

### テスト戦略
- **ユニットテスト**: Jest, Vitest等
- **インテグレーションテスト**: API連携テスト
- **E2Eテスト**: Playwright, Cypress等
- **ビジュアルリグレッションテスト**: Storybook等

## パフォーマンス最適化

### フロントエンド
- **コード分割**: React.lazy, Dynamic imports
- **画像最適化**: WebP, レスポンシブ画像
- **キャッシュ戦略**: Service Worker, CDN
- **バンドルサイズ**: Tree shaking, Code splitting

### バックエンド
- **データベース最適化**: インデックス、クエリ最適化
- **キャッシュ**: Redis, Memcached
- **CDN**: 静的ファイル配信最適化
- **負荷分散**: ロードバランサー、水平スケーリング

## セキュリティ対策

### 必須対策
- **HTTPS通信**: SSL/TLS証明書の設定
- **CORS設定**: 適切なオリジン許可
- **CSP設定**: Content Security Policy
- **入力サニタイゼーション**: XSS攻撃対策
- **SQLインジェクション対策**: パラメータ化クエリ
- **認証・認可**: JWT, OAuth 2.0等