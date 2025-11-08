# Python コード・ファイルの場合

## パッケージ管理
- **パッケージ管理**: pip, venv/virtualenv

## 環境固有の注意事項
- プロジェクト直下に `venv` または `.venv` フォルダがある場合は、必ず仮想環境を有効化してからターミナルコマンドを実行する
- 仮想環境有効化コマンド: `source venv/bin/activate` または `source .venv/bin/activate`
- パッケージインストール前には必ず仮想環境の状態を確認する

## コーディング規約
- **変数名・関数名**: snake_case
- **クラス名**: PascalCase
- **ファイル名**: snake_case
- **定数**: UPPER_SNAKE_CASE
- **モジュール名**: snake_case
- **関数命名**: 動詞で始める (get, set, create, update, delete, calculate, validate等)
- **PEP 8準拠**: 行長120文字以内、適切なインポート順序
- **型ヒント**: Python 3.6以上では積極的に使用する

## アーキテクチャ指針
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

## 実装パターン
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

## Python固有のベストプラクティス
- **docstring**: すべてのクラス・関数に適切なdocstringを記載
- **例外処理**: 適切な例外型を使用し、カスタム例外を定義
- **テスト**: pytest を使用したテスト駆動開発
- **ログ**: logging モジュールを使用した適切なログ出力

## 文字列ハードコーディング防止例
```python
# ❌ 悪い例
def process_user(status):
    if status == "active":
        return "User is active"
    elif status == "inactive":
        return "User is inactive"

# ✅ 良い例
from enum import Enum

class UserStatus(Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"

class UserMessage(Enum):
    ACTIVE_USER = "User is active"
    INACTIVE_USER = "User is inactive"

def process_user(status: UserStatus) -> str:
    message_map = {
        UserStatus.ACTIVE: UserMessage.ACTIVE_USER.value,
        UserStatus.INACTIVE: UserMessage.INACTIVE_USER.value,
    }
    return message_map.get(status, "Unknown status")
```