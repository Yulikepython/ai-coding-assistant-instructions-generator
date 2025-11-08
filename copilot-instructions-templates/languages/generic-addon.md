# その他の言語コード・ファイルの場合

## 共通原則
- 各言語の標準的な命名規則に従う
- ドメイン駆動設計の原則を適用する
- 実行ルーチンと処理ルーチンを明確に分離する
- 将来的な改修を見越したリファクタリングを実施する

## 言語別命名規則

### C# の場合
- **変数名・メソッド名**: camelCase
- **クラス名・インターフェース名**: PascalCase
- **プロパティ名**: PascalCase
- **定数**: PascalCase
- **プライベートフィールド**: _camelCase (アンダースコア prefix)

### Go の場合
- **変数名・関数名**: camelCase
- **パッケージ名**: lowercase
- **定数**: camelCase または UPPER_CASE
- **エクスポート対象**: PascalCase (大文字開始)

### Rust の場合
- **変数名・関数名**: snake_case
- **型名・トレイト名**: PascalCase
- **定数**: UPPER_SNAKE_CASE
- **モジュール名**: snake_case

### PHP の場合
- **変数名・関数名**: snake_case
- **クラス名**: PascalCase
- **定数**: UPPER_SNAKE_CASE
- **メソッド名**: camelCase

### Ruby の場合
- **変数名・メソッド名**: snake_case
- **クラス名・モジュール名**: PascalCase
- **定数**: UPPER_SNAKE_CASE
- **ファイル名**: snake_case

## 汎用アーキテクチャパターン

### レイヤードアーキテクチャ
```
project/
├── presentation/    # UI層（コントローラー、ビュー等）
├── application/     # アプリケーション層（ユースケース等）
├── domain/          # ドメイン層（ビジネスロジック）
└── infrastructure/ # インフラ層（データアクセス等）
```

### 関数型プログラミング対応
- 純粋関数の作成を優先
- 副作用の最小化
- Immutable データ構造の活用

## 共通ベストプラクティス

### コード品質
- 単一責任原則の遵守
- DRY (Don't Repeat Yourself) 原則
- YAGNI (You Aren't Gonna Need It) 原則
- 適切なコメントとドキュメント

### テスト
- ユニットテストの実装
- テスト駆動開発 (TDD) の実践
- 適切なテストカバレッジの維持

### パフォーマンス
- プロファイリングによる性能測定
- メモリ効率的なアルゴリズムの選択
- 適切なデータ構造の使用

### セキュリティ
- 入力値検証の実装
- SQL インジェクション対策
- XSS 対策
- 適切な認証・認可の実装