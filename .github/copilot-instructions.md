# Copilot Instructions

あなたはプロジェクトの専属開発アシスタントです。以下の指示に従ってコードの生成・修正やドキュメントの作成・修正を行ってください。

## プロジェクト概要
README.mdを参照し、当プロジェクトの目的と主要な機能を理解してください。

## 指示文改善ルール
- ユーザーの指示が「**指示文改善」で始まる場合は、この copilot-instructions.md ファイル自体の内容を改善してください。
- 改善時も、ファイル内の他のルールを必ず遵守すること。

## 開発環境情報
- **OS**: Linux (bash shell)
- **エディタ**: Visual Studio Code
- **ターミナル**: bash (デフォルトシェル)

### 環境共通の注意事項
- 絶対パスを使用してディレクトリ移動の問題を回避する
- ターミナルコマンド実行時は適切なディレクトリで実行する

## 汎用ガイドライン（全プロジェクト共通）

### ドメイン駆動設計の基本原則
**注意**: 以下の原則は複雑なビジネスロジックを持つアプリケーションに適用してください。簡単なアプリケーションやスクリプトでは、必要な部分のみを選択的に適用し、過度に複雑な設計は避けてください。

- **ドメインロジックを中心とした設計**: ビジネスロジックをドメインモデルに集約し、技術的詳細から分離する
- **ユビキタス言語**: チーム全体でドメインの概念を統一された用語で表現する
- **境界付きコンテキスト**: ドメインを適切に分割し、各コンテキスト内での整合性を保つ
- **エンティティと値オブジェクトの区別**: アイデンティティを持つものはエンティティ、持たないものは値オブジェクトとして実装する
- **ドメインサービス**: 単一のエンティティや値オブジェクトに属さないビジネスロジックを格納する
- **リポジトリパターン**: データアクセスの詳細をドメインから隠蔽する

### アーキテクチャ設計原則
- **実行ルーチンと処理ルーチンの分離**: 
  - 実行制御（フロー制御）と業務処理（ビジネスロジック）を明確に分離する
  - コントローラーは実行制御のみ、サービスは処理ロジックのみを担当する
- **機能ごとのルーチン分割**:
  - 単一責任の原則に従い、一つの関数/メソッドは一つの責任を持つ
  - 複雑な処理は小さな機能に分割し、組み合わせて実現する
- **文字列ハードコーディングの禁止**:
  - enum、定数、設定オブジェクトを使用して文字列の直接記述を避ける
  - マジックナンバー、マジックストリングの排除
  - 設定値は外部ファイルまたは定数として管理する
- **依存性の逆転**: 上位層は下位層に依存せず、抽象に依存する
- **関心の分離**: UI、ビジネスロジック、データアクセスを明確に分離する

### 基本実行ルール
以下の方針で作業を行ってください：

1. **指示された内容の直接実行**
   - ユーザーが明示的に指示した内容は、確認せずに実行してください
   - 指示に書かれている要件や仕様は、そのまま実装してください
   - 単一ファイルでも複数ファイルでも、指示が明確なら即座に実行してください

2. **曖昧な指示への対応**
   - 指示が曖昧で複数の解釈が可能な場合は、立ち止まって選択肢を提示してください
   - 「どちらに進んで良いかわからない」場合は、具体的な選択肢を示して確認してください
   - 技術的な実装方法が複数ある場合は、最適と思われる方法を選択して実行してください

3. **事後提案・確認**
   - 指示に直接書かれていない追加機能や改善案がある場合は、実行後に提案してください
   - より良いアプローチや代替案がある場合は、実装完了後に提示してください
   - セキュリティやパフォーマンスの観点から追加すべき要素がある場合は、実行後に提案してください

### ドキュメント作成ルール
- **結論ファースト**: 何についてのドキュメントか、何が達成できるかを冒頭で明確に示す
- **階層的な情報提供**: 
  - 第1段階: 概要と結果（一目で分かる情報）
  - 第2段階: 基本的な実行手順（経験者向けの要点）
  - 第3段階: 詳細な解説（初心者や詳細を知りたい人向け）
- **スキャナビリティ**: 見出し、箇条書き、コードブロックを効果的に使用し、流し読みで要点を把握できるようにする
- **実行可能性**: 記載された手順に従えば、確実に結果を再現できるようにする

## Python コード・ファイルの場合

### パッケージ管理
- **パッケージ管理**: pip, venv/virtualenv

### 環境固有の注意事項
- プロジェクト直下に `venv` または `.venv` フォルダがある場合は、必ず仮想環境を有効化してからターミナルコマンドを実行する
- 仮想環境有効化コマンド: `source venv/bin/activate` または `source .venv/bin/activate`
- パッケージインストール前には必ず仮想環境の状態を確認する

### コーディング規約
- **変数名・関数名**: snake_case
- **クラス名**: PascalCase
- **ファイル名**: snake_case
- **定数**: UPPER_SNAKE_CASE
- **モジュール名**: snake_case
- **関数命名**: 動詞で始める (get, set, create, update, delete, calculate, validate等)
- **PEP 8準拠**: 行長120文字以内、適切なインポート順序
- **型ヒント**: Python 3.6以上では積極的に使用する

### アーキテクチャ指針
```python
# ディレクトリ構造例
project/
├── domain/          # ドメインモデル
│   ├── entities/    # エンティティ
│   ├── value_objects/  # 値オブジェクト
│   └── services/    # ドメインサービス
├── infrastructure/ # インフラ層（データアクセス等）
├── application/    # アプリケーションサービス
├── presentation/   # プレゼンテーション層
└── tests/          # テスト
```

### 実装パターン
- **エンティティ例**:
  ```python
  class User:
      def __init__(self, user_id: UserId, name: str, email: Email):
          self._user_id = user_id
          self._name = name
          self._email = email
      
      def change_email(self, new_email: Email) -> None:
          # ビジネスルールの検証
          self._email = new_email
  ```

- **値オブジェクト例**:
  ```python
  @dataclass(frozen=True)
  class Email:
      value: str
      
      def __post_init__(self):
          if not self._is_valid_format(self.value):
              raise ValueError("Invalid email format")
  ```

- **リポジトリパターン**:
  ```python
  from abc import ABC, abstractmethod
  
  class UserRepository(ABC):
      @abstractmethod
      def find_by_id(self, user_id: UserId) -> Optional[User]:
          pass
      
      @abstractmethod
      def save(self, user: User) -> None:
          pass
  ```

## JavaScript/TypeScript コード・ファイルの場合

### パッケージ管理
- **パッケージ管理**: npm, yarn

### 環境固有の注意事項
- `package-lock.json` がある場合は `npm ci` を、`yarn.lock` がある場合は `yarn install --frozen-lockfile` を使用
- Node.js のバージョンは `.nvmrc` または `engines` フィールドで指定されたものを使用

### コーディング規約
- **変数名・関数名**: camelCase
- **コンポーネント名・クラス名**: PascalCase
- **ファイル名**: kebab-case (React等) または camelCase (Node.js等)
- **定数**: UPPER_SNAKE_CASE
- **インターフェース名**: PascalCase (TypeScriptの場合はI prefixは使用しない)
- **関数命名**: 動詞で始める (get, set, create, update, delete, handle, on等)

### アーキテクチャ指針
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
└── __tests__/      // テスト
```

### 実装パターン
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

## Java コード・ファイルの場合

### ビルドツール
- **ビルドツール**: Maven, Gradle

### コーディング規約
- **変数名・メソッド名**: camelCase
- **クラス名・インターフェース名**: PascalCase
- **パッケージ名**: snake_case (小文字のみ)
- **定数**: UPPER_SNAKE_CASE
- **メソッド命名**: 動詞で始める (get, set, create, update, delete, calculate, validate等)

### アーキテクチャ指針
```java
// パッケージ構造例
com.example.project/
├── domain/          // ドメイン層
│   ├── entity/      // エンティティ
│   ├── valueobject/ // 値オブジェクト
│   ├── service/     // ドメインサービス
│   └── repository/  // リポジトリインターフェース
├── infrastructure/ // インフラ層
├── application/    // アプリケーション層
└── presentation/   // プレゼンテーション層
```

## その他の言語コード・ファイルの場合

### 共通原則
- 各言語の標準的な命名規則に従う
- ドメイン駆動設計の原則を適用する
- 実行ルーチンと処理ルーチンを明確に分離する
- 将来的な改修を見越したリファクタリングを実施する
