# AI Coding Assistant Instructions Templates

プロジェクトに応じたカスタム AI開発ツール指示文を動的生成するテンプレートシステムです。

## 🌐 Web ベース 指示文生成器

**推奨方法**: [AI Coding Assistant Instructions Generator](../docs/index.html) を使用

> 💡 **注意**: 実際のWebページは`https://[username].github.io/github-copilot-agent-tester/`でアクセス可能です

### 特徴
- 🎯 **動的生成**: プロジェクト特性に応じたカスタム指示文
- 🧩 **モジュラー設計**: 必要なパーツのみを組み合わせ
- 📱 **ユーザーフレンドリー**: 直感的なWebインターフェース
- 🔧 **メンテナブル**: パーツごとの独立管理
- 🤖 **主要AI開発ツール想定**: GitHub Copilot、Cursor、Claude Code、Gemini等での利用を想定

### 使用方法
1. 上記リンクからWebページにアクセス
2. プロジェクト情報を入力（名前、概要、種別等）
3. OS環境と使用言語を選択
4. 必要な機能（DDD、テスト、ドキュメント等）をオプション選択
5. 「テンプレート生成」ボタンをクリック
6. 生成された指示文を使用するAI開発ツールに合わせて配置
   - **GitHub Copilot**: `.github/copilot-instructions.md`
   - **Cursor**: `.cursorrules`  
   - **Claude Code**: VS Code設定
   - **その他**: 各ツールのドキュメントに従って設定

> **注意**: 各AI開発ツールの仕様により動作が異なる場合があります。最新の公式ドキュメントもご確認ください。

## 📁 テンプレートパーツ構成

### 🏗️ Core Templates
- **`common-guidelines.md`** - 全プロジェクト共通のガイドライン
- **`environment-info.md`** - OS・開発環境固有の設定

### 🔤 Language Add-ons  
- **`python-addon.md`** - Python コーディング規約と実装パターン
- **`javascript-typescript-addon.md`** - JS/TS コーディング規約と実装パターン
- **`java-addon.md`** - Java コーディング規約と実装パターン
- **`generic-addon.md`** - その他言語（C#, Go, Rust等）用

### 🎨 Project Type Templates
- **`simple-scripts.md`** - 学習用・簡単なスクリプト向け
- **`web-application.md`** - Webアプリケーション開発向け
- **`api-backend.md`** - APIバックエンド開発向け
- **`data-analysis.md`** - データ分析・機械学習向け

## 🔧 手動での組み合わせ方法

Web生成器を使わずに手動でテンプレートを作成する場合：

### ベーステンプレート作成
```bash
# 1. 共通ガイドラインから開始
cp core/common-guidelines.md .github/copilot-instructions.md

# 2. 環境情報を追加
cat core/environment-info.md >> .github/copilot-instructions.md
```

### 言語固有設定追加
```bash
# 使用言語に応じて追加
cat languages/python-addon.md >> .github/copilot-instructions.md
cat languages/javascript-typescript-addon.md >> .github/copilot-instructions.md
```

### プロジェクト種別設定追加
```bash
# プロジェクト種別に応じて追加
cat project-types/web-application.md >> .github/copilot-instructions.md
```

## ✨ 新機能: 文字列ハードコーディング防止

### 設計原則
- **enum・定数の活用**: 文字列リテラルの直接使用を避ける
- **マジックストリング排除**: 設定値は外部化または定数として管理
- **型安全性**: 可能な限り型システムを活用した安全性向上

### 言語別実装例

#### Python
```python
# ❌ 避けるべき
if status == "active":
    return "User is active"

# ✅ 推奨
class UserStatus(Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"

if status == UserStatus.ACTIVE:
    return UserMessage.ACTIVE_USER.value
```

#### TypeScript
```typescript
// ❌ 避けるべき
if (status === "active") {
    return "User is active";
}

// ✅ 推奨
enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

if (status === UserStatus.ACTIVE) {
    return UserMessage.ACTIVE_USER;
}
```

## 🎯 推奨使用パターン

### 学習・簡単なスクリプト
- `project-types/simple-scripts.md` + 使用言語アドオン

### 本格的なWebアプリ開発  
- 全機能を含むWeb生成器でカスタム生成

### APIバックエンド開発
- `core/common-guidelines.md` + `languages/[言語]-addon.md` + `project-types/api-backend.md`

### データ分析プロジェクト
- `project-types/data-analysis.md` + `languages/python-addon.md`

## 🚀 GitHub Pages デプロイ

このプロジェクトは GitHub Pages でホストされ、以下の機能を提供：

- 動的テンプレート生成
- リアルタイムプレビュー  
- ワンクリックコピー機能
- レスポンシブデザイン

## � カスタマイズ・貢献

### テンプレートパーツの改良
1. 該当パーツファイルを直接編集
2. Web生成器は自動的に最新パーツを参照

### 新しいプロジェクト種別追加
1. `project-types/` に新しいテンプレート追加  
2. `docs/template-generator.js` に定数とテンプレート関数追加

### 新しい言語サポート追加
1. `languages/` に新しい言語アドオン追加
2. Web生成器に言語オプションとテンプレート関数追加

## � メンテナンス方針

- **パーツベース**: 各機能が独立してメンテナンス可能
- **整合性保証**: パーツ間の依存関係を最小限に抑制
- **継続的改良**: フィードバックに基づく段階的改善

---

**💡 Tips**: 
- まずはシンプルなテンプレートから始めて、プロジェクトの成長に応じて機能を追加
- 文字列ハードコーディングを避けることで、保守性とリファクタリング性が大幅に向上
- Web生成器を使用することで、常に最新のベストプラクティスを適用可能