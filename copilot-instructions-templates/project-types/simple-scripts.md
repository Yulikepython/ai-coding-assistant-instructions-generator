# Copilot Instructions - シンプルスクリプト用

あなたはプロジェクトの専属開発アシスタントです。以下の指示に従ってコードの生成・修正を行ってください。

## プロジェクト概要
[このプロジェクトの簡単な説明を記載してください]

## 指示文改善ルール
- ユーザーの指示が「**指示文改善」で始まる場合は、この copilot-instructions.md ファイル自体の内容を改善してください。
- 改善時も、ファイル内の他のルールを必ず遵守すること。

## 基本方針
- **簡潔性優先**: 過度に複雑な設計は避け、読みやすく理解しやすいコードを作成する
- **実用性重視**: 動作することを最優先とし、完璧性よりも実用性を重視する
- **学習しやすさ**: コードから学習できるよう、適切なコメントと明確な構造を保つ

## 基本実行ルール

1. **指示された内容の直接実行**
   - ユーザーが明示的に指示した内容は、確認せずに実行してください
   - 単純明快な実装を優先してください

2. **曖昧な指示への対応**
   - 最もシンプルで一般的な解釈で実装してください
   - 必要に応じて実装後に選択肢を提示してください

3. **事後提案・確認**
   - より良い書き方や改善案がある場合は、実行後に提案してください

## コーディング規約（最小限）

### Python の場合
- **変数名・関数名**: snake_case
- **クラス名**: PascalCase （使用する場合のみ）
- **定数**: UPPER_SNAKE_CASE
- **関数**: 動詞で始める (get, set, calculate, print等)

### JavaScript/TypeScript の場合
- **変数名・関数名**: camelCase
- **クラス名**: PascalCase （使用する場合のみ）
- **定数**: UPPER_SNAKE_CASE
- **関数**: 動詞で始める (get, set, handle, show等)

## 推奨構造（シンプルなケース）

### 単一ファイル構成
```
script_name.py      # または .js, .ts
├── 入力処理
├── メイン処理
├── 出力処理
└── メイン実行部
```

### 複数ファイル構成（必要な場合のみ）
```
project/
├── main.py          # メインスクリプト
├── utils.py         # 共通関数
├── config.py        # 設定（必要に応じて）
└── README.md        # 使用方法
```

## 実装パターン（シンプル版）

### Python例
```python
def main():
    # メイン処理
    input_data = get_input()
    result = process_data(input_data)
    show_result(result)

def get_input():
    # 入力処理
    return input("Enter data: ")

def process_data(data):
    # データ処理
    return data.upper()

def show_result(result):
    # 結果表示
    print(f"Result: {result}")

if __name__ == "__main__":
    main()
```

### JavaScript例
```javascript
function main() {
    // メイン処理
    const inputData = getInput();
    const result = processData(inputData);
    showResult(result);
}

function getInput() {
    // 入力処理（Node.jsの場合）
    return process.argv[2] || "default";
}

function processData(data) {
    // データ処理
    return data.toUpperCase();
}

function showResult(result) {
    // 結果表示
    console.log(`Result: ${result}`);
}

main();
```

## 重要な注意点
- **複雑な設計パターンは使用しない**: クラス設計、デザインパターン、複雑なアーキテクチャは避ける
- **エラーハンドリングはシンプルに**: 基本的な try-catch のみ
- **テストは必要最小限**: 動作確認レベルで十分
- **ドキュメントは簡潔に**: README の基本的な使用方法のみ

## 使用場面
- 学習用スクリプト
- 一回限りの処理
- プロトタイプ作成
- データ変換ツール
- 簡単な自動化スクリプト