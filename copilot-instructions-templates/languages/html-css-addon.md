# HTML/CSS コード・ファイルの場合

## 基本方針
- **セマンティックHTML**: 意味に基づいた適切なHTMLタグの使用
- **アクセシビリティ**: WCAG 2.1 AA基準の遵守
- **モダンCSS**: Flexbox、Grid、CSS変数の活用
- **レスポンシブデザイン**: モバイルファーストの設計

## ファイル構成とコーディング規約

### ファイル命名規則
- **HTMLファイル**: kebab-case（例: `contact-form.html`, `user-profile.html`）
- **CSSファイル**: kebab-case（例: `main-styles.css`, `components.css`）
- **クラス名**: BEM記法またはkebab-case（例: `.card__header`, `.btn-primary`）
- **ID名**: camelCase（例: `#userModal`, `#navigationMenu`）

### ファイル分離原則
- **HTML構造**: セマンティック要素による論理構造のみ
- **CSS装飾**: 外部ファイルで視覚的表現を管理
- **JavaScript動作**: 外部ファイルで相互作用を管理
- **インライン禁止**: style属性、script要素内コードの原則禁止

### 🚫 絶対避けるべき記述方法

#### CSS/JavaScriptの埋め込み禁止
```html
<!-- ❌ 絶対に避ける（インラインCSS） -->
<div style="color: red; font-size: 16px; margin: 10px;">
    <h1 style="background: blue;">タイトル</h1>
</div>

<!-- ❌ 絶対に避ける（HTML内CSS） -->
<style>
    .header { background: blue; }
    .content { margin: 20px; }
</style>

<!-- ❌ 絶対に避ける（HTML内JavaScript） -->
<script>
    function handleClick() {
        alert('clicked');
    }
</script>
<button onclick="handleClick()">クリック</button>

<!-- ✅ 正しい方法（外部ファイル分離） -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>ページタイトル</title>
    <!-- 外部CSSファイルの読み込み -->
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/components.css">
</head>
<body>
    <!-- 純粋なHTML構造のみ -->
    <header class="site-header">
        <h1 class="site-title">タイトル</h1>
    </header>
    
    <main class="main-content">
        <button class="action-button" data-action="submit">クリック</button>
    </main>
    
    <!-- 外部JavaScriptファイルの読み込み -->
    <script src="scripts/main.js"></script>
    <script src="scripts/components.js"></script>
</body>
</html>
```

### ✅ 推奨ファイル構成
```
project/
├── index.html              # HTML構造のみ
├── styles/                 # CSSファイル群
│   ├── variables.css       # CSS変数・定数
│   ├── reset.css          # リセットCSS
│   ├── layout.css         # レイアウト
│   ├── components.css     # コンポーネント
│   └── utilities.css      # ユーティリティクラス
├── scripts/               # JavaScriptファイル群
│   ├── main.js           # メインロジック
│   ├── components.js     # コンポーネント機能
│   └── utils.js          # ユーティリティ関数
└── assets/               # 静的ファイル
    ├── images/
    └── fonts/
```

### 🎯 外部ファイル分離のメリット
1. **保守性向上**: 各ファイルが単一責任を持つため修正が容易
2. **再利用性**: CSSやJavaScriptを複数のHTMLページで共有可能
3. **キャッシュ効率**: ブラウザがCSS/JSファイルをキャッシュして高速化
4. **チーム開発**: 複数人での同時編集時の競合を最小化
5. **デバッグ容易性**: 開発者ツールでファイル別にデバッグ可能
6. **コード分離**: HTML（構造）、CSS（装飾）、JS（動作）の明確な責任分離

### 📋 必須従事ルール

#### 1. HTMLファイルのルール
- ✅ **構造のみ記述**: セマンティックなタグ構造のみ
- ✅ **外部ファイル参照**: `<link>`と`<script>`タグのみでCSS/JS読み込み
- ❌ **インライン禁止**: `style`属性、`onclick`属性の使用禁止
- ❌ **埋め込み禁止**: `<style>`タグ、`<script>`タグ内のコード記述禁止

#### 2. CSSファイルのルール
- ✅ **機能別分割**: レイアウト、コンポーネント、ユーティリティで分離
- ✅ **CSS変数活用**: `:root`での定数定義を必須
- ✅ **モジュール設計**: 再利用可能なコンポーネント単位での分割

#### 3. JavaScriptファイルのルール
- ✅ **機能別分割**: メイン処理、コンポーネント、ユーティリティで分離
- ✅ **DOM操作分離**: HTML構造に依存しないセレクタ設計
- ✅ **イベント処理**: `addEventListener`を使用、インライン属性禁止

### 🔧 実装例

#### HTML（structure only）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
    <!-- CSS読み込み（複数ファイル可） -->
    <link rel="stylesheet" href="styles/variables.css">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/components.css">
</head>
<body>
    <!-- 純粋なHTML構造、class名で装飾・動作を指定 -->
    <main class="container">
        <form class="contact-form" data-form="contact">
            <div class="form-group">
                <label for="name" class="form-label">お名前</label>
                <input type="text" id="name" class="form-input" data-required="true">
            </div>
            <div class="form-group">
                <label for="email" class="form-label">メールアドレス</label>
                <input type="email" id="email" class="form-input" data-required="true">
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">送信</button>
                <button type="reset" class="btn btn-secondary">リセット</button>
            </div>
        </form>
    </main>
    
    <!-- JavaScript読み込み（body終了前） -->
    <script src="scripts/utils.js"></script>
    <script src="scripts/form-handler.js"></script>
</body>
</html>
```

#### CSS（styles/variables.css）
```css
/* CSS変数による定数管理 */
:root {
    /* カラーパレット */
    --color-primary: #007bff;
    --color-secondary: #6c757d;
    --color-success: #28a745;
    --color-danger: #dc3545;
    --color-text: #212529;
    --color-background: #ffffff;
    
    /* スペーシング */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    
    /* フォント */
    --font-family-base: 'Helvetica Neue', Arial, sans-serif;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    
    /* ボーダー */
    --border-radius: 0.375rem;
    --border-color: #dee2e6;
}
```

#### CSS（styles/components.css）
```css
/* コンポーネント専用スタイル */
.contact-form {
    max-width: 600px;
    margin: 0 auto;
    padding: var(--spacing-lg);
    background: var(--color-background);
    border-radius: var(--border-radius);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: var(--spacing-md);
}

.form-label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-weight: 600;
    color: var(--color-text);
}

.form-input {
    width: 100%;
    padding: var(--spacing-sm);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: var(--font-size-base);
}

.btn {
    padding: var(--spacing-sm) var(--spacing-md);
    border: none;
    border-radius: var(--border-radius);
    font-size: var(--font-size-base);
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-primary {
    background: var(--color-primary);
    color: white;
}

.btn-secondary {
    background: var(--color-secondary);
    color: white;
}
```

#### JavaScript（scripts/form-handler.js）
```javascript
// 外部JavaScriptファイル - フォーム処理専用
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('[data-form="contact"]');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const requiredFields = event.target.querySelectorAll('[data-required="true"]');
    
    // バリデーション
    if (validateRequiredFields(requiredFields)) {
        submitForm(formData);
    }
}

function validateRequiredFields(fields) {
    let isValid = true;
    
    fields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

function submitForm(formData) {
    // フォーム送信処理
    console.log('Form submitted:', formData);
}
```

## HTML実装パターン

### セマンティックHTML
```html
<!-- ❌ 避けるべき（意味のないdiv多用） -->
<div class="header">
  <div class="title">サイトタイトル</div>
  <div class="menu">
    <div class="menu-item">ホーム</div>
    <div class="menu-item">サービス</div>
  </div>
</div>

<!-- ✅ 推奨（セマンティック要素） -->
<header class="site-header">
  <h1 class="site-title">サイトタイトル</h1>
  <nav class="primary-nav">
    <ul class="nav-list">
      <li><a href="/">ホーム</a></li>
      <li><a href="/services">サービス</a></li>
    </ul>
  </nav>
</header>
```

### アクセシビリティ対応
```html
<!-- ✅ 適切なalt属性 -->
<img src="product.jpg" alt="新商品のスマートフォン、黒色、5.5インチディスプレイ">

<!-- ✅ フォームラベル関連付け -->
<label for="email">メールアドレス</label>
<input type="email" id="email" name="email" required 
       aria-describedby="email-help">
<small id="email-help">例: user@example.com</small>

<!-- ✅ ランドマーク役割の明示 -->
<main role="main">
  <article>
    <header>
      <h1>記事タイトル</h1>
      <time datetime="2024-01-15">2024年1月15日</time>
    </header>
  </article>
</main>
```

### レスポンシブHTML構造
```html
<!-- ✅ モバイルファーストの構造 -->
<section class="product-grid">
  <div class="product-card">
    <picture>
      <source media="(min-width: 768px)" srcset="product-large.jpg">
      <source media="(min-width: 480px)" srcset="product-medium.jpg">
      <img src="product-small.jpg" alt="商品画像">
    </picture>
    <div class="product-info">
      <h3 class="product-title">商品名</h3>
      <p class="product-price">¥1,980</p>
    </div>
  </div>
</section>
```

## CSS実装パターン

### CSS変数と定数管理
```css
/* ❌ 避けるべき（値の直接記述） */
.button {
  background-color: #3498db;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
}

/* ✅ 推奨（CSS変数による管理） */
:root {
  /* カラーパレット */
  --color-primary: #3498db;
  --color-secondary: #2ecc71;
  --color-danger: #e74c3c;
  --color-text: #2c3e50;
  --color-background: #ffffff;
  
  /* スペーシング */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* フォントサイズ */
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  /* ボーダー */
  --border-radius: 0.25rem;
  --border-radius-lg: 0.5rem;
  
  /* ブレークポイント（JS用） */
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
}

.button {
  background-color: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
}
```

### モダンCSSレイアウト
```css
/* Grid Layout例 */
.layout-grid {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 250px 1fr 200px;
  min-height: 100vh;
  gap: var(--spacing-md);
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Flexbox Component例 */
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.card__body {
  padding: var(--spacing-md);
  flex: 1; /* 残り空間を占有 */
}

.card__actions {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-background-light);
  margin-top: auto; /* 下に配置 */
}
```

### レスポンシブCSS
```css
/* モバイルファースト */
.container {
  width: 100%;
  padding: 0 var(--spacing-md);
  margin: 0 auto;
}

/* タブレット */
@media (min-width: 768px) {
  .container {
    max-width: 768px;
    padding: 0 var(--spacing-lg);
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }
}

/* デスクトップ */
@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
  }
  
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## コンポーネント設計

### BEM記法例
```css
/* Block */
.card {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

/* Element */
.card__header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.card__title {
  margin: 0;
  font-size: var(--font-size-lg);
}

.card__body {
  padding: var(--spacing-md);
}

/* Modifier */
.card--featured {
  border-color: var(--color-primary);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card--large {
  max-width: 600px;
}
```

### ユーティリティクラス
```css
/* スペーシング */
.mt-sm { margin-top: var(--spacing-sm); }
.mt-md { margin-top: var(--spacing-md); }
.mt-lg { margin-top: var(--spacing-lg); }

.p-sm { padding: var(--spacing-sm); }
.p-md { padding: var(--spacing-md); }
.p-lg { padding: var(--spacing-lg); }

/* テキスト */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.font-bold { font-weight: bold; }
.font-normal { font-weight: normal; }

/* 表示制御 */
.hidden { display: none; }
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

/* レスポンシブ表示制御 */
.hidden-mobile {
  display: none;
}

@media (min-width: 768px) {
  .hidden-mobile {
    display: block;
  }
  
  .hidden-desktop {
    display: none;
  }
}
```

## パフォーマンス最適化

### CSS最適化
```css
/* Critical CSS: Above-the-fold content */
.header,
.hero,
.navigation {
  /* 初期表示に必要な最小限のスタイル */
}

/* Non-critical CSS: Below-the-fold content */
/* 別ファイルまたは遅延読み込み */
```

### HTML最適化
```html
<!-- Critical CSS inline -->
<style>
  /* Above-the-fold styles here */
</style>

<!-- Non-critical CSS async -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<!-- Image optimization -->
<img src="hero.jpg" alt="メインビジュアル" 
     loading="lazy" 
     width="1200" 
     height="600">
```

## 文字列ハードコーディング防止（HTML/CSS）

### CSS定数の活用
```css
/* ❌ 避けるべき */
.button-primary { background: #3498db; }
.text-primary { color: #3498db; }
.border-primary { border-color: #3498db; }

/* ✅ 推奨（CSS変数） */
:root {
  --brand-primary: #3498db;
  --brand-secondary: #2ecc71;
}

.button-primary { background: var(--brand-primary); }
.text-primary { color: var(--brand-primary); }
.border-primary { border-color: var(--brand-primary); }
```

### データ属性の活用
```html
<!-- ❌ 避けるべき -->
<div class="status-active">アクティブ</div>
<div class="status-inactive">非アクティブ</div>

<!-- ✅ 推奨（データ属性） -->
<div data-status="active">アクティブ</div>
<div data-status="inactive">非アクティブ</div>
```

```css
[data-status="active"] {
  color: var(--color-success);
}

[data-status="inactive"] {
  color: var(--color-muted);
}
```