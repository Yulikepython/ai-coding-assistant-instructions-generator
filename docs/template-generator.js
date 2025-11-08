// 定数定義（文字列ハードコーディングを避ける）
const ProjectType = {
    SIMPLE_SCRIPT: 'SIMPLE_SCRIPT',
    WEB_APPLICATION: 'WEB_APPLICATION',
    API_BACKEND: 'API_BACKEND',
    DATA_ANALYSIS: 'DATA_ANALYSIS',
    CUSTOM: 'CUSTOM'
};

const OperatingSystem = {
    LINUX: 'LINUX',
    MACOS: 'MACOS',
    WINDOWS: 'WINDOWS',
    MULTI_PLATFORM: 'MULTI_PLATFORM'
};

const Language = {
    PYTHON: 'PYTHON',
    JAVASCRIPT: 'JAVASCRIPT',
    TYPESCRIPT: 'TYPESCRIPT',
    JAVA: 'JAVA',
    HTML_CSS: 'HTML_CSS',
    CSHARP: 'CSHARP',
    GO: 'GO',
    RUST: 'RUST',
    OTHER: 'OTHER'
};

const Feature = {
    DOMAIN_DRIVEN_DESIGN: 'DOMAIN_DRIVEN_DESIGN',
    TEST_DRIVEN_DEVELOPMENT: 'TEST_DRIVEN_DEVELOPMENT',
    DOCUMENTATION_RULES: 'DOCUMENTATION_RULES',
    CODE_QUALITY: 'CODE_QUALITY',
    SCSS_SUPPORT: 'SCSS_SUPPORT'
};

// テンプレートファイルの読み込み（GitHub Pages対応 - 直接ソースから読み込み）
const TemplateLoader = {
        // ベースURLを取得（環境に応じて自動切り替え）
    getBaseUrl() {
        const hostname = window.location.hostname;
        const pathname = window.location.pathname;
        let repoName = 'ai-coding-assistant-instructions-generator';
        if (hostname.endsWith('.github.io')) {
            // GitHub Pages環境
            
            // パスからリポジトリ名を抽出
            const pathSegments = pathname.split('/').filter(segment => segment);
            
            if (pathSegments.length > 0) {
                // パスの最初のセグメントがリポジトリ名の可能性が高い
                repoName = pathSegments[0];
                
                // 特殊ケース: docs/ 配下にいる場合
                if (pathSegments.length >= 2 && pathSegments[pathSegments.length - 2] === 'docs') {
                    // .../repo/docs/ の形式
                    repoName = pathSegments[pathSegments.length - 3] || pathSegments[0];
                }
            }
            
            if (!repoName || repoName === 'docs') {
                // フォールバック: 既知のリポジトリ名を使用
                repoName = 'ai-coding-assistant-instructions-generator';
            }
            
            return `https://raw.githubusercontent.com/${hostname.split('.')[0]}/${repoName}/main/copilot-instructions-templates/`;
        } else {
            // その他の環境（カスタムドメイン等）
            // GitHub raw APIを使用
            const pathSegments = pathname.split('/').filter(segment => segment);
            const repoName = pathSegments[0] || 'ai-coding-assistant-instructions-generator';
            
            const githubUser = 'Yulikepython'; 
            
            return `https://raw.githubusercontent.com/${githubUser}/${repoName}/main/copilot-instructions-templates/`;
        }
    },

    // テンプレートファイルのパス定義
    paths: {
        core: {
            commonGuidelines: '/core/common-guidelines.md',
            environmentInfo: '/core/environment-info.md'
        },
        languages: {
            python: '/languages/python-addon.md',
            javascript: '/languages/javascript-typescript-addon.md',
            java: '/languages/java-addon.md',
            htmlCss: '/languages/html-css-addon.md',
            generic: '/languages/generic-addon.md',
            scssAddon: '/languages/scss-addon.md'
        }
    },

    // ファイル内容をキャッシュ
    cache: {},

    // ファイルを読み込む共通関数
    async loadTemplate(relativePath) {
        const baseUrl = this.getBaseUrl();
        const fullUrl = baseUrl + relativePath;
        
        console.log('Loading template:', {
            baseUrl,
            relativePath,
            fullUrl,
            hostname: window.location.hostname,
            pathname: window.location.pathname
        });
        
        if (this.cache[fullUrl]) {
            return this.cache[fullUrl];
        }

        try {
            const response = await fetch(fullUrl);
            if (!response.ok) {
                throw new Error(`Failed to load template: ${fullUrl} (${response.status})`);
            }
            const content = await response.text();
            this.cache[fullUrl] = content;
            console.log('Successfully loaded template:', relativePath);
            return content;
        } catch (error) {
            console.error('Template loading error:', error);
            
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const troubleshooting = isLocal 
                ? `ローカル開発環境でのトラブルシューティング:
1. copilot-instructions-templates/ ディレクトリが存在することを確認
2. ローカルサーバーをプロジェクトルートで起動していることを確認
3. パス: ${fullUrl}` 
                : `GitHub Pages環境でのトラブルシューティング:
1. リポジトリが公開されていることを確認
2. ブランチがmainまたはmasterであることを確認  
3. ファイルが存在することを確認: ${fullUrl}
4. 現在のURL: ${window.location.href}`;

            return `<!-- Template loading error: ${fullUrl} 

${troubleshooting}

エラー詳細: ${error.message}
-->`;
        }
    },

    // 特定セクションを抽出する関数
    extractSection(content, sectionName) {
        const lines = content.split('\n');
        const startMarker = `## ${sectionName}`;
        let startIndex = -1;
        
        // セクション開始位置を検索
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith(startMarker)) {
                startIndex = i;
                break;
            }
        }
        
        if (startIndex === -1) return '';
        
        // セクション終了位置を検索（次の##が出現するまで）
        let endIndex = lines.length;
        for (let i = startIndex + 1; i < lines.length; i++) {
            if (lines[i].trim().startsWith('## ') && !lines[i].trim().startsWith('### ')) {
                endIndex = i;
                break;
            }
        }
        
        return lines.slice(startIndex, endIndex).join('\n');
    }
};

// テンプレートパーツの定義（動的読み込み版）
const TemplateParts = {
    header: (projectName, projectDescription) => `# AI Coding Assistant Instructions

あなたは${projectName}の専属開発アシスタントです。以下の指示に従ってコードの生成・修正やドキュメントの作成・修正を行ってください。

## プロジェクト概要
${projectDescription}

## 指示文改善ルール
- ユーザーの指示が「**指示文改善」で始まる場合は、この指示文ファイル自体の内容を改善してください。
- 改善時も、ファイル内の他のルールを必ず遵守すること。`,

    // 環境情報を動的に読み込む
    async environmentInfo(os) {
        // 基本的な環境情報テンプレート（ハードコーディングを避けるため最小限に）
        return this.processEnvironmentTemplate(os);
    },

    // 共通ガイドラインを動的に読み込む
    async coreGuidelines() {
        const content = await TemplateLoader.loadTemplate(TemplateLoader.paths.core.commonGuidelines);
        // "## 汎用ガイドライン（全プロジェクト共通）"セクション以降を抽出
        return TemplateLoader.extractSection(content, '汎用ガイドライン（全プロジェクト共通）');
    },

    // 言語固有テンプレートを動的に読み込む
    async languageTemplate(language) {
        let templatePath;
        switch (language) {
            case Language.PYTHON:
                templatePath = TemplateLoader.paths.languages.python;
                break;
            case Language.JAVASCRIPT:
            case Language.TYPESCRIPT:
                templatePath = TemplateLoader.paths.languages.javascript;
                break;
            case Language.JAVA:
                templatePath = TemplateLoader.paths.languages.java;
                break;
            case Language.HTML_CSS:
                templatePath = TemplateLoader.paths.languages.htmlCss;
                break;
            default:
                templatePath = TemplateLoader.paths.languages.generic;
        }
        return await TemplateLoader.loadTemplate(templatePath);
    },

    // SCSSサポートを動的に読み込む
    async scssSupport() {
        return await TemplateLoader.loadTemplate(TemplateLoader.paths.languages.scssAddon);
    },

    // 環境情報テンプレートの処理
    processEnvironmentTemplate(os) {
        const osConfigs = {
            [OperatingSystem.LINUX]: {
                name: 'Linux (bash shell)',
                shell: 'bash',
                pathSeparator: '/',
                venvActivate: 'source venv/bin/activate'
            },
            [OperatingSystem.MACOS]: {
                name: 'macOS (zsh/bash shell)',
                shell: 'zsh',
                pathSeparator: '/',
                venvActivate: 'source venv/bin/activate'
            },
            [OperatingSystem.WINDOWS]: {
                name: 'Windows (PowerShell/cmd)',
                shell: 'PowerShell',
                pathSeparator: '\\',
                venvActivate: 'venv\\Scripts\\activate'
            },
            [OperatingSystem.MULTI_PLATFORM]: {
                name: 'マルチプラットフォーム',
                shell: 'bash/zsh/PowerShell',
                pathSeparator: '/ または \\',
                venvActivate: 'source venv/bin/activate (Unix) または venv\\Scripts\\activate (Windows)'
            }
        };

        const config = osConfigs[os] || osConfigs[OperatingSystem.LINUX];

        return `## 開発環境情報
- **OS**: ${config.name}
- **エディタ**: Visual Studio Code
- **ターミナル**: ${config.shell}

### 環境共通の注意事項
- 絶対パスを使用してディレクトリ移動の問題を回避する
- ターミナルコマンド実行時は適切なディレクトリで実行する
- パス区切り文字: \`${config.pathSeparator}\`
- 仮想環境有効化: \`${config.venvActivate}\``;
    }
};

// 機能固有のテンプレート読み込み（動的読み込み版）
const FeatureTemplates = {
    async [Feature.DOMAIN_DRIVEN_DESIGN]() {
        const content = await TemplateLoader.loadTemplate(TemplateLoader.paths.core.commonGuidelines);
        return TemplateLoader.extractSection(content, 'ドメイン駆動設計の基本原則');
    },

    async [Feature.DOCUMENTATION_RULES]() {
        const content = await TemplateLoader.loadTemplate(TemplateLoader.paths.core.commonGuidelines);
        return TemplateLoader.extractSection(content, 'ドキュメント作成ルール');
    },

    async [Feature.CODE_QUALITY]() {
        // コード品質ルールはcommon-guidelines.mdにはないため、基本的なルールを提供
        return `### コード品質ルール
- **命名規約の徹底**: 意味のある名前を使用し、省略形は避ける
- **関数の単一責任**: 一つの関数は一つのことのみを行う
- **適切なコメント**: コードの「なぜ」を説明し、「何を」は避ける
- **マジックナンバー・文字列の排除**: 定数やenumを使用する
- **エラーハンドリング**: 適切な例外処理とエラーメッセージの提供
- **テスタビリティ**: テストしやすい構造でコードを設計する`;
    },

    async [Feature.SCSS_SUPPORT]() {
        return await TemplateParts.scssSupport();
    }
};

// メイン生成関数（非同期版 - 動的テンプレート読み込み対応）
async function generateTemplate() {
    const formData = getFormData();
    
    if (!validateFormData(formData)) {
        return;
    }

    try {
        // ローディング表示
        displayLoading();

        const templateParts = [];

        // ヘッダー部分
        templateParts.push(TemplateParts.header(formData.projectName, formData.projectDescription));
        
        // 環境情報
        templateParts.push(await TemplateParts.environmentInfo(formData.operatingSystem));
        
        // コアガイドライン
        templateParts.push(await TemplateParts.coreGuidelines());
        
        // 選択された機能を追加（並列処理で高速化）
        const featurePromises = formData.features.map(async (feature) => {
            if (FeatureTemplates[feature]) {
                // SCSS機能は条件チェック
                if (feature === Feature.SCSS_SUPPORT && 
                    !(formData.languages.includes(Language.JAVASCRIPT) || formData.languages.includes(Language.TYPESCRIPT))) {
                    return null;
                }
                return await FeatureTemplates[feature]();
            }
            return null;
        });

        const featureResults = await Promise.all(featurePromises);
        featureResults.filter(result => result !== null).forEach(result => {
            templateParts.push(result);
        });
        
        // 言語固有の設定（並列処理で高速化）
        const languagePromises = formData.languages.map(async (lang) => {
            return await TemplateParts.languageTemplate(lang);
        });

        const languageResults = await Promise.all(languagePromises);
        languageResults.forEach(result => {
            if (result && result.trim()) {
                templateParts.push(result);
            }
        });

        const template = templateParts.join('\n\n');
        displayTemplate(template);

    } catch (error) {
        console.error('Template generation error:', error);
        displayError('テンプレート生成中にエラーが発生しました。ページを再読み込みしてお試しください。');
    }
}

// ローディング表示関数
function displayLoading() {
    const outputDiv = document.getElementById('output');
    outputDiv.style.display = 'block';
    outputDiv.innerHTML = `
        <div class="loading">
            <p>テンプレートを生成しています...</p>
            <div class="spinner"></div>
        </div>
    `;
}

// エラー表示関数
function displayError(message) {
    const outputDiv = document.getElementById('output');
    outputDiv.style.display = 'block';
    outputDiv.innerHTML = `
        <div class="error">
            <h3>❌ エラー</h3>
            <p>${message}</p>
        </div>
    `;
}

// フォームデータ取得
function getFormData() {
    const selectedLanguages = Array.from(document.querySelectorAll('input[name="languages"]:checked'))
        .map(cb => cb.value);
    
    const selectedFeatures = Array.from(document.querySelectorAll('input[name="features"]:checked'))
        .map(cb => cb.value);
    
    return {
        projectName: document.getElementById('projectName').value,
        projectDescription: document.getElementById('projectDescription').value,
        projectType: document.getElementById('projectType').value,
        operatingSystem: document.getElementById('operatingSystem').value,
        languages: selectedLanguages,
        features: selectedFeatures
    };
}

// バリデーション
function validateFormData(data) {
    if (!data.projectName || !data.projectDescription || !data.projectType || !data.operatingSystem) {
        alert('必須項目をすべて入力してください。');
        return false;
    }
    
    if (data.languages.length === 0) {
        alert('プログラミング言語を少なくとも1つ選択してください。');
        return false;
    }
    
    return true;
}

// テンプレート表示
function displayTemplate(template) {
    const outputDiv = document.getElementById('output');
    outputDiv.style.display = 'block';
    outputDiv.innerHTML = `
        <h3>生成されたテンプレート</h3>
        <div class="template-actions">
            <button onclick="copyTemplate()" class="copy-btn">📋 クリップボードにコピー</button>
            <button onclick="downloadTemplate()" class="download-btn">💾 ダウンロード</button>
        </div>
        <pre id="templateContent"><code></code></pre>
    `;
    
    // HTMLエスケープしてテキストとして表示
    const codeElement = document.querySelector('#templateContent code');
    codeElement.textContent = template; // innerHTML ではなく textContent を使用
}

// クリップボードコピー
function copyTemplate() {
    const template = document.getElementById('templateContent').textContent;
    const btn = document.querySelector('.copy-btn');
    const originalText = btn.textContent;
    
    navigator.clipboard.writeText(template)
        .then(() => {
            btn.textContent = '✅ コピー完了';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        })
        .catch(err => {
            console.error('コピーに失敗しました:', err);
            alert('コピーに失敗しました。手動で選択してコピーしてください。');
        });
}

// ファイルダウンロード
function downloadTemplate() {
    const template = document.getElementById('templateContent').textContent;
    const blob = new Blob([template], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'copilot-instructions.md';
    a.click();
    URL.revokeObjectURL(url);
}

// フォームリセット
function resetForm() {
    if (confirm('入力内容をリセットしますか？')) {
        document.getElementById('templateForm').reset();
        document.getElementById('output').style.display = 'none';
        toggleScssOption(); // SCSS オプションの表示も更新
    }
}

// SCSS オプション表示制御
function toggleScssOption() {
    const jsCheckbox = document.getElementById('javascript');
    const tsCheckbox = document.getElementById('typescript');
    const scssOption = document.getElementById('scssOption');
    const scssCheckbox = document.getElementById('scssSupport');
    
    // JavaScript または TypeScript が選択されている場合のみ SCSS オプションを表示
    if ((jsCheckbox && jsCheckbox.checked) || (tsCheckbox && tsCheckbox.checked)) {
        scssOption.style.display = 'block';
    } else {
        scssOption.style.display = 'none';
        scssCheckbox.checked = false; // チェックも外す
    }
}

// 言語選択チェックボックスにイベントリスナーを追加
document.addEventListener('DOMContentLoaded', function() {
    const jsCheckbox = document.getElementById('javascript');
    const tsCheckbox = document.getElementById('typescript');
    
    if (jsCheckbox) {
        jsCheckbox.addEventListener('change', toggleScssOption);
    }
    if (tsCheckbox) {
        tsCheckbox.addEventListener('change', toggleScssOption);
    }
    
    // 初期状態での表示制御
    toggleScssOption();
});