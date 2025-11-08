# Copilot Instructions - データ分析・機械学習用

あなたはデータ分析・機械学習プロジェクトの専属アシスタントです。以下の指示に従ってコードの生成・修正を行ってください。

## プロジェクト概要
[分析対象データ、解決したい問題、期待される成果を記載してください]

## 指示文改善ルール
- ユーザーの指示が「**指示文改善」で始まる場合は、この copilot-instructions.md ファイル自体の内容を改善してください。
- 改善時も、ファイル内の他のルールを必ず遵守すること。

## データ分析・ML開発方針

### データ駆動アプローチ
- **探索的データ分析**: データの理解から始める
- **仮説検証**: 統計的根拠に基づいた意思決定
- **再現性**: 結果が再現可能なコードとドキュメント
- **段階的改善**: 継続的なモデル改善とバリデーション

### コード品質重視
- **可読性**: 分析プロセスが明確に理解できるコード
- **モジュール化**: 再利用可能な関数・クラス設計
- **バージョン管理**: データ・コード・モデルのバージョン管理

## プロジェクト構造

### ディレクトリ構成
```
project/
├── data/               # データファイル
│   ├── raw/           # 生データ
│   ├── processed/     # 前処理済みデータ
│   └── external/      # 外部データ
├── notebooks/         # Jupyter ノートブック
│   ├── exploratory/   # 探索的分析
│   ├── modeling/      # モデリング
│   └── evaluation/    # モデル評価
├── src/              # ソースコード
│   ├── data/         # データ処理
│   ├── features/     # 特徴量エンジニアリング
│   ├── models/       # モデル定義
│   ├── evaluation/   # 評価指標
│   └── utils/        # ユーティリティ
├── models/           # 学習済みモデル
├── results/          # 結果・レポート
├── tests/            # テストコード
└── requirements.txt  # 依存関係
```

## 開発フロー

### 1. データ理解・探索
```python
# 基本的な探索パターン
def explore_dataset(df):
    """データセットの基本情報を表示"""
    print("Dataset Shape:", df.shape)
    print("\nData Types:")
    print(df.dtypes)
    print("\nMissing Values:")
    print(df.isnull().sum())
    print("\nBasic Statistics:")
    print(df.describe())
    
    return df
```

### 2. データ前処理
```python
class DataProcessor:
    """データ前処理のベースクラス"""
    
    def __init__(self):
        self.scalers = {}
        self.encoders = {}
    
    def handle_missing_values(self, df, strategy='mean'):
        """欠損値処理"""
        if strategy == 'mean':
            return df.fillna(df.mean())
        elif strategy == 'median':
            return df.fillna(df.median())
        elif strategy == 'drop':
            return df.dropna()
    
    def encode_categorical(self, df, columns, method='onehot'):
        """カテゴリ変数のエンコーディング"""
        if method == 'onehot':
            return pd.get_dummies(df, columns=columns)
        # 他のエンコーディング方法も追加可能
    
    def scale_features(self, X_train, X_test=None, method='standard'):
        """特徴量のスケーリング"""
        from sklearn.preprocessing import StandardScaler, MinMaxScaler
        
        if method == 'standard':
            scaler = StandardScaler()
        elif method == 'minmax':
            scaler = MinMaxScaler()
        
        X_train_scaled = scaler.fit_transform(X_train)
        self.scalers[method] = scaler
        
        if X_test is not None:
            X_test_scaled = scaler.transform(X_test)
            return X_train_scaled, X_test_scaled
        
        return X_train_scaled
```

### 3. 特徴量エンジニアリング
```python
class FeatureEngineer:
    """特徴量エンジニアリング"""
    
    def create_polynomial_features(self, df, columns, degree=2):
        """多項式特徴量の作成"""
        from sklearn.preprocessing import PolynomialFeatures
        
        poly = PolynomialFeatures(degree=degree, include_bias=False)
        poly_features = poly.fit_transform(df[columns])
        feature_names = poly.get_feature_names_out(columns)
        
        return pd.DataFrame(poly_features, columns=feature_names)
    
    def create_interaction_features(self, df, col1, col2):
        """交互作用特徴量の作成"""
        df[f'{col1}_{col2}_interaction'] = df[col1] * df[col2]
        return df
    
    def create_time_features(self, df, date_column):
        """時間特徴量の作成"""
        df['year'] = df[date_column].dt.year
        df['month'] = df[date_column].dt.month
        df['day'] = df[date_column].dt.day
        df['weekday'] = df[date_column].dt.weekday
        return df
```

## 機械学習モデリング

### ベースライン実装
```python
class BaselineModel:
    """ベースラインモデルのテンプレート"""
    
    def __init__(self, model_type='linear'):
        self.model_type = model_type
        self.model = None
        self.is_fitted = False
    
    def fit(self, X_train, y_train):
        """モデル学習"""
        if self.model_type == 'linear':
            from sklearn.linear_model import LinearRegression
            self.model = LinearRegression()
        elif self.model_type == 'random_forest':
            from sklearn.ensemble import RandomForestRegressor
            self.model = RandomForestRegressor(random_state=42)
        
        self.model.fit(X_train, y_train)
        self.is_fitted = True
        return self
    
    def predict(self, X):
        """予測実行"""
        if not self.is_fitted:
            raise ValueError("Model must be fitted before prediction")
        return self.model.predict(X)
    
    def evaluate(self, X_test, y_test):
        """モデル評価"""
        y_pred = self.predict(X_test)
        return self._calculate_metrics(y_test, y_pred)
    
    def _calculate_metrics(self, y_true, y_pred):
        """評価指標の計算"""
        from sklearn.metrics import mean_squared_error, r2_score
        
        return {
            'mse': mean_squared_error(y_true, y_pred),
            'rmse': mean_squared_error(y_true, y_pred, squared=False),
            'r2': r2_score(y_true, y_pred)
        }
```

### 高度なモデリング
```python
class AdvancedModelPipeline:
    """高度なモデリングパイプライン"""
    
    def __init__(self):
        self.models = {}
        self.results = {}
    
    def add_model(self, name, model, params=None):
        """モデルを追加"""
        self.models[name] = {
            'model': model,
            'params': params or {}
        }
    
    def hyperparameter_tuning(self, name, X_train, y_train, param_grid):
        """ハイパーパラメータチューニング"""
        from sklearn.model_selection import GridSearchCV
        
        model = self.models[name]['model']
        grid_search = GridSearchCV(
            model, param_grid, 
            cv=5, scoring='neg_mean_squared_error'
        )
        grid_search.fit(X_train, y_train)
        
        self.models[name]['best_model'] = grid_search.best_estimator_
        self.models[name]['best_params'] = grid_search.best_params_
        
        return grid_search.best_estimator_
    
    def ensemble_predict(self, X, method='average'):
        """アンサンブル予測"""
        predictions = []
        for name, model_info in self.models.items():
            if 'best_model' in model_info:
                pred = model_info['best_model'].predict(X)
                predictions.append(pred)
        
        if method == 'average':
            return np.mean(predictions, axis=0)
        elif method == 'weighted':
            # 重み付き平均（実装要）
            pass
```

## 可視化・レポート

### 標準的な可視化
```python
import matplotlib.pyplot as plt
import seaborn as sns

class DataVisualizer:
    """データ可視化のユーティリティクラス"""
    
    def __init__(self, figsize=(10, 6)):
        self.figsize = figsize
        plt.style.use('seaborn-v0_8')
    
    def plot_distribution(self, df, column, bins=30):
        """分布の可視化"""
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=self.figsize)
        
        # ヒストグラム
        ax1.hist(df[column], bins=bins, alpha=0.7)
        ax1.set_title(f'{column} Distribution')
        ax1.set_xlabel(column)
        ax1.set_ylabel('Frequency')
        
        # ボックスプロット
        ax2.boxplot(df[column])
        ax2.set_title(f'{column} Box Plot')
        ax2.set_ylabel(column)
        
        plt.tight_layout()
        plt.show()
    
    def plot_correlation_matrix(self, df):
        """相関行列の可視化"""
        plt.figure(figsize=self.figsize)
        correlation_matrix = df.corr()
        sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
        plt.title('Correlation Matrix')
        plt.show()
    
    def plot_model_performance(self, y_true, y_pred):
        """モデル性能の可視化"""
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
        
        # 実測vs予測
        ax1.scatter(y_true, y_pred, alpha=0.6)
        ax1.plot([y_true.min(), y_true.max()], 
                 [y_true.min(), y_true.max()], 'r--', lw=2)
        ax1.set_xlabel('Actual')
        ax1.set_ylabel('Predicted')
        ax1.set_title('Actual vs Predicted')
        
        # 残差プロット
        residuals = y_true - y_pred
        ax2.scatter(y_pred, residuals, alpha=0.6)
        ax2.axhline(y=0, color='r', linestyle='--')
        ax2.set_xlabel('Predicted')
        ax2.set_ylabel('Residuals')
        ax2.set_title('Residual Plot')
        
        plt.tight_layout()
        plt.show()
```

## 実験管理・MLOps

### 実験ログ
```python
import json
from datetime import datetime

class ExperimentLogger:
    """実験結果のログ管理"""
    
    def __init__(self, log_file='experiments.json'):
        self.log_file = log_file
    
    def log_experiment(self, experiment_name, params, metrics, model_path=None):
        """実験結果をログに記録"""
        experiment = {
            'name': experiment_name,
            'timestamp': datetime.now().isoformat(),
            'parameters': params,
            'metrics': metrics,
            'model_path': model_path
        }
        
        try:
            with open(self.log_file, 'r') as f:
                logs = json.load(f)
        except FileNotFoundError:
            logs = []
        
        logs.append(experiment)
        
        with open(self.log_file, 'w') as f:
            json.dump(logs, f, indent=2)
        
        print(f"Experiment '{experiment_name}' logged successfully")
```

## ベストプラクティス

### コード品質
- **関数の単一責任**: 一つの関数は一つのことを行う
- **適切な変数名**: データの意味が分かる命名
- **ドキュメンテーション**: docstringとコメントの適切な使用
- **型ヒント**: 関数の入力・出力型を明示

### 再現性の確保
- **乱数シード**: random_state の設定
- **環境管理**: requirements.txt の管理
- **データバージョン**: データの変更履歴管理
- **コード管理**: Git によるバージョン管理

### パフォーマンス
- **メモリ効率**: 大容量データの適切な処理
- **並列処理**: 時間のかかる処理の並列化
- **プロファイリング**: ボトルネックの特定と改善