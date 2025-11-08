# Java コード・ファイルの場合

## ビルドツール
- **ビルドツール**: Maven, Gradle

## コーディング規約
- **変数名・メソッド名**: camelCase
- **クラス名・インターフェース名**: PascalCase
- **パッケージ名**: snake_case (小文字のみ)
- **定数**: UPPER_SNAKE_CASE
- **メソッド命名**: 動詞で始める (get, set, create, update, delete, calculate, validate等)

## アーキテクチャ指針
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

## 実装パターン
- **エンティティ例**:
  ```java
  public class User {
      private final UserId id;
      private String name;
      private Email email;

      public User(UserId id, String name, Email email) {
          this.id = id;
          this.name = name;
          this.email = email;
      }

      public void changeEmail(Email newEmail) {
          // ビジネスルールの検証
          this.email = newEmail;
      }

      // getters
      public UserId getId() { return id; }
      public String getName() { return name; }
      public Email getEmail() { return email; }
  }
  ```

- **値オブジェクト例**:
  ```java
  public class Email {
      private final String value;

      public Email(String value) {
          if (!isValidFormat(value)) {
              throw new IllegalArgumentException("Invalid email format");
          }
          this.value = value;
      }

      public String getValue() {
          return value;
      }

      private boolean isValidFormat(String email) {
          // バリデーション実装
          return email.contains("@");
      }

      @Override
      public boolean equals(Object o) {
          if (this == o) return true;
          if (o == null || getClass() != o.getClass()) return false;
          Email email = (Email) o;
          return Objects.equals(value, email.value);
      }

      @Override
      public int hashCode() {
          return Objects.hash(value);
      }
  }
  ```

## Java固有のベストプラクティス

### オブジェクト設計
- Immutable オブジェクトの活用
- Builder パターンの使用（複雑なオブジェクト生成時）
- equals/hashCode の適切な実装

### 例外処理
- チェック例外とランタイム例外の適切な使い分け
- カスタム例外クラスの定義
- try-with-resources の使用

### コレクション
- 適切なコレクション型の選択
- Stream API の活用
- Immutable コレクションの使用

### Spring Framework使用時
- Dependency Injection の活用
- @Component, @Service, @Repository の適切な使い分け
- Configuration クラスによる設定管理

## 文字列ハードコーディング防止例
```java
// ❌ 悪い例
public class UserService {
    public String processUser(String status) {
        if ("active".equals(status)) {
            return "User is active";
        } else if ("inactive".equals(status)) {
            return "User is inactive";
        }
        return "Unknown status";
    }
}

// ✅ 良い例
public enum UserStatus {
    ACTIVE("active"),
    INACTIVE("inactive");
    
    private final String value;
    
    UserStatus(String value) {
        this.value = value;
    }
    
    public String getValue() {
        return value;
    }
}

public enum UserMessage {
    ACTIVE_USER("User is active"),
    INACTIVE_USER("User is inactive"),
    UNKNOWN_STATUS("Unknown status");
    
    private final String message;
    
    UserMessage(String message) {
        this.message = message;
    }
    
    public String getMessage() {
        return message;
    }
}

public class UserService {
    private static final Map<UserStatus, UserMessage> MESSAGE_MAP = Map.of(
        UserStatus.ACTIVE, UserMessage.ACTIVE_USER,
        UserStatus.INACTIVE, UserMessage.INACTIVE_USER
    );
    
    public String processUser(UserStatus status) {
        return MESSAGE_MAP.getOrDefault(status, UserMessage.UNKNOWN_STATUS).getMessage();
    }
}
```