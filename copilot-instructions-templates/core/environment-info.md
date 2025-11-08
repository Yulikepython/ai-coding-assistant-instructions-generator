# 開発環境情報

## 基本環境
- **OS**: Linux (bash shell) / macOS / Windows
- **エディタ**: Visual Studio Code
- **ターミナル**: bash (デフォルトシェル)

## 環境共通の注意事項
- 絶対パスを使用してディレクトリ移動の問題を回避する
- ターミナルコマンド実行時は適切なディレクトリで実行する

## OS別設定

### Linux / macOS の場合
- パッケージマネージャー: apt (Ubuntu), brew (macOS)
- パス区切り文字: `/`
- 仮想環境有効化: `source venv/bin/activate`

### Windows の場合
- パッケージマネージャー: chocolatey, winget
- パス区切り文字: `\` (ただしコードでは `/` を推奨)
- 仮想環境有効化: `venv\Scripts\activate`

## エディタ設定
- VS Code 拡張機能の推奨セット
- 自動フォーマット設定
- IntelliSense設定

## バージョン管理
- Git の基本設定
- コミットメッセージの規約
- ブランチ戦略