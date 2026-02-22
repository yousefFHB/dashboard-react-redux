# Dashboard React Redux

Admin dashboard project with a React + Redux frontend and a Node.js + TypeScript backend (JWT auth + MongoDB).

This repository currently contains two applications:

- `Frontend`: Dashboard UI, authentication screen, and CRUD-style management pages.
- `blog-tutorials/node-api-jwt-auth`: Backend API for authentication and user management.

## Homepage Preview

![Homepage preview](Frontend/src/assests/Images/Home-page.png)

## What Has Been Implemented

### Frontend (`Frontend`)

- Built with Vite + React 19 + Tailwind CSS.
- Routing with `react-router-dom` (login page + nested dashboard layout).
- Global state with Redux Toolkit (`auth`, `brand`, `product` slices).
- Auth gate in layout: only `admin` and `super_admin` roles can access `/dashboard`.
- Login page currently uses mocked authentication data (no backend call yet).
- `Home`: metrics/cards/charts and analytics widgets.
- `Brands`: create, list, update, delete (stored in Redux state).
- `Products`: fetch initial products from Fake Store API + local create/update/delete.
- `Category`: routes are scaffolded, UI pages are currently placeholders.
- Reusable UI pieces: sidebar, top navigation, footer, loading component, toast notifications.

### Backend (`blog-tutorials/node-api-jwt-auth`)

- Built with Express + TypeScript + MongoDB (Mongoose).
- JWT-based authentication and role-based route protection.
- Seeders run at startup (roles + default super admin user).
- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/login-password`
- `POST /auth/admins` (super admin only)
- `GET /users` (admin/super admin)
- `GET /users/me` (authenticated user)
- CORS enabled for local frontend integration.

## Project Structure

```text
.
|-- Frontend
|   |-- src
|   |   |-- Pages
|   |   |-- Components
|   |   |-- Store
|   |   |-- Router
|   |   `-- Utils
|   `-- package.json
`-- blog-tutorials
    `-- node-api-jwt-auth
        |-- src
        |   |-- controllers
        |   |-- models
        |   |-- config
        |   `-- seeders
        `-- package.json
```

## Frontend Setup and Usage

### Prerequisites

- Node.js 20+
- npm

### Run Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on Vite default port (usually `http://localhost:5173`).

### Frontend Environment

Create `Frontend/.env`:

```env
VITE_BASE_URL=http://localhost:4500/
```

Note: `VITE_BASE_URL` is already wired in `Frontend/src/Utils/FetchData.js`.

## Backend Setup and Usage

### Prerequisites

- Node.js 20+
- yarn
- MongoDB (local or Docker)

### 1) Start MongoDB (Docker example)

```bash
docker run -d --rm -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=secret -p 27018:27017 --name mongodb mongo:8.0
```

### 2) Configure backend `.env`

Create `blog-tutorials/node-api-jwt-auth/.env`:

```env
HOST=http://localhost
PORT=4500
MONGODB_URL=mongodb://user:secret@localhost:27018/admin
JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRE=3600
```

### 3) Install and run backend

```bash
cd blog-tutorials/node-api-jwt-auth
yarn install
yarn start
```

Backend runs on `http://localhost:4500`.

### Default Seeded Super Admin

When backend starts, it seeds this account:

- Email: `ned@stark.com`
- Password: `123456`

Use it only for local development; change in production-like environments.

## If You Want to Use the Backend With This Frontend

Right now, frontend login is mocked in `Frontend/src/Pages/Auth/index.jsx`.

To connect real backend auth:

1. Replace mocked auth in `handleSubmit` with an API request to `POST /auth/login`.
2. Send this body:

```json
{
  "email": "ned@stark.com",
  "password": "123456"
}
```

3. On success, store `data.token` in Redux `auth.token` and `data.user` in Redux `auth.user`.
4. Keep `Authorization: Bearer <token>` header for protected backend routes (`/users`, `/users/me`).

Important integration note:

- Current frontend `Brands/Products/Category` pages are mostly local-state CRUD and Fake Store API driven.
- If you want full backend-powered CRUD for those modules, backend endpoints for brands/products/categories must be added first (they are not implemented yet in `node-api-jwt-auth`).

## Available Scripts

### Frontend (`Frontend`)

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run preview` - preview build
- `npm run lint` - lint source

### Backend (`blog-tutorials/node-api-jwt-auth`)

- `yarn start` - run API with `ts-node`
- `yarn build` - compile TypeScript
- `yarn lint` - lint source
- `yarn lint:fix` - auto-fix lint issues

## Current Status

- Frontend dashboard experience is implemented and usable locally.
- Backend authentication API is implemented and can be connected.
- Category and full backend CRUD for dashboard entities are pending.
