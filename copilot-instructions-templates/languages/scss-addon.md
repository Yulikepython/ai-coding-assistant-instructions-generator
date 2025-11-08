# SCSS対応（JavaScript/TypeScript プロジェクト）

## ディレクトリ構造
```
src/
├── styles/
│   ├── main.scss          # エントリーポイント
│   ├── _variables.scss    # 変数定義
│   ├── _mixins.scss      # ミックスイン
│   ├── _base.scss        # ベーススタイル
│   ├── components/       # コンポーネント別スタイル
│   │   ├── _header.scss
│   │   ├── _footer.scss
│   │   └── _button.scss
│   └── pages/           # ページ別スタイル
│       ├── _home.scss
│       └── _about.scss
```

## 変数管理
```scss
// _variables.scss
// カラーパレット
$primary-color: #3498db;
$secondary-color: #2c3e50;
$success-color: #27ae60;
$warning-color: #f39c12;
$error-color: #e74c3c;

// タイポグラフィ
$font-family-primary: 'Helvetica Neue', Arial, sans-serif;
$font-size-base: 16px;
$line-height-base: 1.6;

// スペーシング
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;

// ブレークポイント
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
```

## ミックスイン
```scss
// _mixins.scss
// レスポンシブ対応
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'sm' {
    @media (min-width: $breakpoint-sm) { @content; }
  }
  @else if $breakpoint == 'md' {
    @media (min-width: $breakpoint-md) { @content; }
  }
  @else if $breakpoint == 'lg' {
    @media (min-width: $breakpoint-lg) { @content; }
  }
  @else if $breakpoint == 'xl' {
    @media (min-width: $breakpoint-xl) { @content; }
  }
}

// ボタンスタイル
@mixin button-style($bg-color, $text-color: white) {
  background-color: $bg-color;
  color: $text-color;
  border: none;
  padding: $spacing-sm $spacing-md;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: darken($bg-color, 10%);
  }
}

// フレックスボックス中央揃え
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## ビルドスクリプト例
```json
// package.json
{
  "scripts": {
    "build:css": "sass src/styles/main.scss:dist/css/style.css --style compressed",
    "watch:css": "sass src/styles/main.scss:dist/css/style.css --watch",
    "dev": "concurrently \"npm run watch:css\" \"npm run start\""
  },
  "devDependencies": {
    "sass": "^1.50.0",
    "concurrently": "^7.0.0"
  }
}
```

## SCSS使用時のファイル分離原則
- **HTML**: 構造のみ記述、インラインスタイル絶対禁止
- **SCSS**: 全スタイリングを担当、コンパイル後のCSSを外部ファイルとしてリンク
- **JavaScript**: 動作のみ記述、スタイル操作は避ける（クラス追加・削除のみ許可）

## SCSS開発ワークフロー
1. **開発時**: `npm run watch:css`でSCSSを監視・自動コンパイル
2. **本番時**: `npm run build:css`で圧縮版CSSを生成
3. **HTMLからの参照**: コンパイル後のCSSファイルのみをリンク
4. **バージョン管理**: SCSSファイルのみをコミット、生成されたCSSは.gitignoreで除外推奨