# Copilot Instructions - APIバックエンド用

あなたはAPIバックエンド開発の専属アシスタントです。以下の指示に従ってコードの生成・修正を行ってください。

## プロジェクト概要
[API の目的、主要エンドポイント、クライアント種類を記載してください]

## 指示文改善ルール
- ユーザーの指示が「**指示文改善」で始まる場合は、この copilot-instructions.md ファイル自体の内容を改善してください。
- 改善時も、ファイル内の他のルールを必ず遵守すること。

## API開発方針

### API設計原則
- **RESTful設計**: HTTP動詞とリソース指向URL設計
- **統一性**: 一貫したレスポンス形式とエラーハンドリング
- **拡張性**: バージョニング戦略とスケーラビリティ
- **セキュリティ**: 認証・認可・入力値検証の徹底

### パフォーマンス重視
- **高速レスポンス**: 適切なキャッシング戦略
- **スケーラビリティ**: 水平スケーリング対応
- **リソース効率**: メモリ・CPU使用量の最適化

## アーキテクチャ設計

### ディレクトリ構造
```
src/
├── controllers/     # APIコントローラー（ルートハンドラー）
├── services/        # ビジネスロジック
├── repositories/    # データアクセス層
├── models/          # データモデル・エンティティ
├── middleware/      # ミドルウェア
├── routes/          # ルーティング定義
├── validators/      # 入力値検証
├── config/          # 設定管理
├── utils/           # ユーティリティ関数
├── types/           # 型定義（TypeScript）
└── tests/           # テストファイル
```

### レイヤーアーキテクチャ
```
Controller Layer (HTTP)
    ↓
Service Layer (Business Logic)
    ↓
Repository Layer (Data Access)
    ↓
Database Layer (Persistence)
```

## API設計パターン

### RESTful エンドポイント設計
```
GET    /api/users          # ユーザー一覧取得
GET    /api/users/:id      # 特定ユーザー取得
POST   /api/users          # ユーザー作成
PUT    /api/users/:id      # ユーザー更新
DELETE /api/users/:id      # ユーザー削除

GET    /api/users/:id/posts # 特定ユーザーの投稿一覧
```

### レスポンス形式統一
```json
// 成功時
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z",
    "version": "1.0"
  }
}

// エラー時
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [...]
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z",
    "version": "1.0"
  }
}
```

## 実装パターン

### コントローラー例（Node.js + Express + TypeScript）
```typescript
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { ApiResponse } from '../types/ApiResponse';

export class UserController {
  constructor(private userService: UserService) {}

  async getUsers(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const users = await this.userService.getUsers({
        page: Number(page),
        limit: Number(limit)
      });
      
      res.json({
        success: true,
        data: users,
        meta: {
          timestamp: new Date().toISOString(),
          version: '1.0'
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const userData = req.body;
      const user = await this.userService.createUser(userData);
      
      res.status(201).json({
        success: true,
        data: user,
        meta: {
          timestamp: new Date().toISOString(),
          version: '1.0'
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
```

### サービス例
```typescript
import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDto, User } from '../types/User';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(params: { page: number; limit: number }): Promise<User[]> {
    return this.userRepository.findMany({
      skip: (params.page - 1) * params.limit,
      take: params.limit
    });
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    // ビジネスロジックの実行
    await this.validateUserData(userData);
    
    return this.userRepository.create(userData);
  }

  private async validateUserData(userData: CreateUserDto): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }
  }
}
```

### リポジトリ例
```typescript
import { User, CreateUserDto } from '../types/User';

export interface UserRepository {
  findMany(params: { skip: number; take: number }): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(userData: CreateUserDto): Promise<User>;
  update(id: string, userData: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}
```

## セキュリティ対策

### 認証・認可
```typescript
// JWT認証ミドルウェア例
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: { code: 'NO_TOKEN', message: 'Access token required' }
    });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'Invalid or expired token' }
      });
    }
    req.user = user;
    next();
  });
};
```

### 入力値検証
```typescript
import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input data',
        details: error.details
      }
    });
  }
  next();
};
```

## データベース設計

### モデル設計例（TypeScript）
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}
```

### マイグレーション管理
- データベーススキーマのバージョン管理
- ロールバック戦略
- 本番環境での安全な適用

## テスト戦略

### ユニットテスト
```typescript
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findMany: jest.fn(),
      create: jest.fn(),
      findByEmail: jest.fn(),
    } as any;
    userService = new UserService(mockUserRepository);
  });

  test('should create user successfully', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue(mockUser);

    const result = await userService.createUser(createUserDto);

    expect(result).toEqual(mockUser);
    expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
  });
});
```

### 統合テスト
```typescript
import request from 'supertest';
import { app } from '../app';

describe('User API', () => {
  test('POST /api/users should create user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe(userData.email);
  });
});
```

## 監視・ログ

### ログ設計
```typescript
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### パフォーマンス監視
- レスポンス時間の計測
- エラーレートの監視
- リソース使用量の追跡