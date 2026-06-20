# Personal Blogging Platform API

A secure RESTful API for a personal blogging platform where users can register, log in, and manage their own blog posts. Built with Node.js, Express, PostgreSQL, and Prisma ORM.

> 📖 Interactive API docs available at `/api-docs` once the server is running.

---

## Tech Stack

| | |
|---|---|
| **Runtime** | Node.js + Express |
| **Database** | PostgreSQL (hosted on Neon) |
| **ORM** | Prisma |
| **Auth** | JWT + bcryptjs |
| **Validation** | Joi |
| **Docs** | Swagger / OpenAPI 3.0 |

**Why PostgreSQL?** The data has a clear relational structure — one user owns many posts. PostgreSQL handles this naturally with foreign keys and enforces data integrity at the database level, which is exactly what we need here.

---

## Project Structure

```
├── config/
│   ├── db.js                     # Prisma connection handler
│   ├── env.js                    # Env validation + config object
│   └── prisma.js                 # PrismaClient singleton
├── controllers/
│   ├── auth.controller.js        # Register / Login handlers
│   └── post.controller.js        # CRUD handlers
├── docs/
│   └── swagger.js                # Swagger/OpenAPI config
├── middlewares/
│   ├── auth.middleware.js        # JWT protect middleware
│   ├── error.middleware.js       # Global error handler
│   └── validation.middleware.js  # Joi validation wrapper
├── prisma/
│   └── schema.prisma             # Database schema
├── repositories/
│   ├── post.repository.js        # Post DB queries
│   └── user.repository.js        # User DB queries
├── routes/
│   ├── auth.routes.js            # /auth endpoints
│   └── post.routes.js            # /posts endpoints
├── services/
│   ├── auth.service.js           # Auth business logic
│   └── post.service.js           # Post business logic
├── utils/
│   ├── AppError.js               # Custom error class
│   ├── catchAsync.js             # Async error wrapper
│   ├── generateToken.js          # JWT generator
│   └── sendResponse.js           # Standardized response helper
├── validations/
│   ├── auth.validation.js        # Register/login schemas
│   └── post.validation.js        # Create/update schemas
├── app.js
└── server.js
```

---

## Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/Habiba-Adel/Personal-Blogging-Platform.git
cd Personal-Blogging-Platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your `.env` file

```env
PORT=5000
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
```

### 4. Push the schema to the database

```bash
npx prisma db push
npx prisma generate
```

### 5. Start the server

```bash
npm run dev
```

Server runs at `http://localhost:5000`  
Swagger UI at `http://localhost:5000/api-docs`

---

## API Endpoints

### Auth

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Create a new user account |
| `POST` | `/auth/login` | Public | Log in and receive a JWT |

### Posts

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/posts` | Public | Fetch all blog posts |
| `POST` | `/posts` | 🔒 Private | Create a new post |
| `PUT` | `/posts/:id` | 🔒 Private | Update your post |
| `DELETE` | `/posts/:id` | 🔒 Private | Delete your post |

> Private routes require the header: `Authorization: Bearer <your_token>`

---

## Request Examples

### Register
```json
POST /auth/register
Content-Type: application/json

{
  "name": "Habiba",
  "email": "habiba@example.com",
  "password": "mypassword123"
}
```

### Login
```json
POST /auth/login
Content-Type: application/json

{
  "email": "habiba@example.com",
  "password": "mypassword123"
}
```

### Create a Post
```json
POST /posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my first blog post."
}
```

### Update a Post (partial update supported)
```json
PUT /posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title"
}
```

---

## Validation Rules

- `name` — required string
- `email` — must be valid email format
- `password` — minimum 8 characters (on register)
- `title` — required, non-empty (on create); optional (on update)
- `content` — required, non-empty (on create); optional (on update)
- `PUT` body — at least one of `title` or `content` must be provided

---

## Error Handling

Every error returns a consistent JSON shape:

```json
{
  "success": false,
  "message": "Descriptive error message here",
  "data": null
}
```

| Status Code | When it's returned |
|---|---|
| `400` | Validation failed / user already exists |
| `401` | Missing, invalid, or expired token / wrong credentials |
| `403` | Authenticated but not the post owner |
| `404` | Post not found |
| `429` | Rate limit exceeded (100 req / 15 min per IP) |
| `500` | Unexpected server error |

---

## Security Highlights

- Passwords hashed with **bcryptjs** (salt rounds: 10) — never stored in plain text
- JWT tokens signed with a secret key and expire in **7 days**
- Rate limiting via `express-rate-limit` — 100 requests per 15 minutes per IP
- All sensitive config (DB URL, JWT secret) lives in `.env` — never committed to the repo
- Env variables validated at startup — server refuses to start if any are missing

---

## Database Schema

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
}
```

One `User` → many `Posts`. The `authorId` foreign key links every post back to its owner, which is how ownership checks on update/delete work.

---

## API Documentation

Interactive Swagger UI: [`/api-docs`](https://your-deployed-url.up.railway.app/api-docs)

All endpoints are documented with request bodies, parameters, required auth, and response codes.
