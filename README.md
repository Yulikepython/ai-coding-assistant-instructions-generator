# AI Coding Assistant Instructions Generator

AIコーディングツール向けの動的指示文生成システム。プロジェクトの特性に合わせてカスタム指示文を生成します。

## 🌟 主要機能

- **🌐 Web生成器**: プロジェクト特性に応じた指示文を動的生成
- **🧩 モジュラー設計**: 必要な機能のみを組み合わせて最適化
- **🤖 多ツール対応**: GitHub Copilot、Cursor、Claude Code等に対応
- **📱 レスポンシブ**: ブラウザさえあれば、どこでも利用可能

## 🚀 使い方

### Web生成器（推奨）

1. **[https://yulikepython.github.io/ai-coding-assistant-instructions-generator/](https://yulikepython.github.io/ai-coding-assistant-instructions-generator/)** にアクセス
2. プロジェクト情報を入力
3. 開発環境と言語を選択
4. 必要な機能をチェック
5. 指示文を生成してコピー
6. 使用するAIツールの設定ファイルに貼り付け

### AIツール別設定方法

| ツール | 設定ファイル | 場所 |
|--------|-------------|------|
| **GitHub Copilot** | `copilot-instructions.md` | `.github/` ディレクトリ |
| **Cursor** | `.cursorrules` | プロジェクトルート |
| **Claude Code** | 設定ファイル | VS Code設定 |

#### GitHub Copilot
```bash
mkdir -p .github
# 生成された指示文をコピー
nano .github/copilot-instructions.md
```

#### Cursor  
```bash
# 生成された指示文をコピー
nano .cursorrules
```

#### Claude Code
```json
// .vscode/settings.json
{
  "claude.instructions": "[生成された指示文]"
}
```

## 📂 プロジェクト構成

```
ai-coding-assistant-instructions-generator/
├── docs/                          # Web生成器
│   ├── index.html                 # メインUI
│   ├── styles.css                 # スタイル
│   └── template-generator.js      # 生成エンジン
└── copilot-instructions-templates/ # テンプレート（単一情報源）
    ├── core/                       # 基本ガイドライン
    ├── languages/                  # 言語別アドオン
    └── project-types/             # プロジェクト種別
```

## ✨ 対応機能

### 🎯 開発原則
- **ドメイン駆動設計**: エンティティ・値オブジェクト指導
- **関心の分離**: UI、ビジネスロジック、データアクセスの分離
- **文字列ハードコーディング防止**: enum・定数の活用推進

### 🗣️ 対応言語
- **Python** - Flask, Django, FastAPI等
- **JavaScript/TypeScript** - Node.js, React, Vue等
- **Java** - Spring Boot, Maven, Gradle等  
- **HTML/CSS** - セマンティック、モダンCSS
- **SCSS** - 変数管理、ミックスイン（JS/TS選択時）

### �️ 対応環境
- **Linux** (bash)
- **macOS** (bash/zsh)
- **Windows** (PowerShell)

## �️ ローカル開発

```bash
# リポジトリクローン
git clone https://github.com/Yulikepython/ai-coding-assistant-instructions-generator.git
cd ai-coding-assistant-instructions-generator

# ローカルサーバー起動
cd docs
python3 -m http.server 8000

# ブラウザでアクセス
# http://localhost:8000
```

## 📝 テンプレート編集

1. `copilot-instructions-templates/` 内のMarkdownファイルを編集
2. ローカルで動作確認
3. GitHubにプッシュ → 自動的にWeb生成器に反映

### 新機能追加
- **言語追加**: `languages/` にアドオンファイル作成
- **プロジェクト種別**: `project-types/` にテンプレート作成
- **UI拡張**: `docs/template-generator.js` に生成ロジック追加

## 🎯 使用例

### Web開発プロジェクト
```
✅ 共通ガイドライン
✅ JavaScript/TypeScript
✅ SCSS（オプション）
✅ Webアプリケーション
→ 生成された指示文を .cursorrules にコピー
```

### データ分析プロジェクト  
```
✅ 共通ガイドライン
✅ Python  
✅ データ分析
→ 生成された指示文を .github/copilot-instructions.md にコピー
```

## 📄 ライセンス

MIT License - 自由にご利用ください

## 🤝 コントリビューション

新機能追加や改善は歓迎です！

1. リポジトリをフォーク
2. 機能追加・改善実装
3. プルリクエスト作成

---

**💡 効率的な使い方**:
- 簡単な設定から開始し、プロジェクト成長に合わせて機能追加
- 複数AIツールで同じ指示文を試用可能
- 定期的に最新版を確認して指示文更新
