# Finance Tracker API


## Live API
Base URL: `https://finance-tracker-api-1-uvuw.onrender.com`

A RESTful API for personal finance management built with Node.js, TypeScript, Express, PostgreSQL, and Prisma.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 20 + TypeScript |
| Framework | Express.js |
| Database | PostgreSQL + Prisma ORM |
| Auth | JWT (access + refresh tokens) |
| Validation | Zod |
| Security | Helmet, CORS, Rate Limiting |
| Logging | Morgan |

## Features

- JWT authentication with access/refresh token rotation
- Full CRUD for transactions and categories
- Filter transactions by type, category, and date range
- Pagination on all list endpoints
- Financial stats — total income, expenses, and balance
- Rate limiting on auth routes (brute force protection)
- Security headers via Helmet
- Global error handling with consistent JSON responses
- Input validation with Zod schemas

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 14+

### Installation
```bash
git clone https://github.com/Aarya2409/finance-tracker-api
cd finance-tracker-api
npm install
```

### Environment Variables

Create a `.env` file in the root:
```env
DATABASE_URL="postgresql://YOUR_USER@localhost:5432/finance_tracker?schema=public"
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=development
```

### Database Setup
```bash
npx prisma migrate dev
npx prisma db seed
```

### Run
```bash
npm run dev       # development with hot reload
npm run build     # compile TypeScript
npm start         # production
```

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login | No |
| POST | `/api/auth/refresh` | Refresh access token | No |
| POST | `/api/auth/logout` | Logout | No |

### Categories
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/categories` | Get all categories | Yes |
| POST | `/api/categories` | Create category | Yes |
| DELETE | `/api/categories/:id` | Delete category | Yes |

### Transactions
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/transactions` | Get all (filters + pagination) | Yes |
| GET | `/api/transactions/stats` | Get financial stats | Yes |
| GET | `/api/transactions/:id` | Get by ID | Yes |
| POST | `/api/transactions` | Create transaction | Yes |
| PATCH | `/api/transactions/:id` | Update transaction | Yes |
| DELETE | `/api/transactions/:id` | Delete transaction | Yes |

### Query Parameters for GET /api/transactions

| Param | Type | Example |
|---|---|---|
| `type` | `INCOME` or `EXPENSE` | `?type=INCOME` |
| `categoryId` | UUID | `?categoryId=abc-123` |
| `from` | ISO datetime | `?from=2024-01-01T00:00:00Z` |
| `to` | ISO datetime | `?to=2024-12-31T00:00:00Z` |
| `limit` | number (default 20) | `?limit=10` |
| `offset` | number (default 0) | `?offset=20` |

## Project Structure
```
src/
├── controllers/     # HTTP request handlers
├── services/        # Business logic + DB queries
├── routes/          # Express routers
├── middleware/       # Auth, validation, error handling, rate limiting
├── lib/             # Prisma client, JWT utilities
├── types/           # TypeScript interfaces and enums
├── dtos/            # Zod validation schemas
└── index.ts         # App entry point
prisma/
├── schema.prisma    # Database schema
├── migrations/      # SQL migration history
└── seed.ts          # Database seeder
```

## Architecture
```
Request → Rate Limiter → Helmet → CORS
        → Router
        → Auth Middleware (JWT verify)
        → Controller (extract + validate input)
        → Service (business logic + Prisma)
        → PostgreSQL
        → Response
```

