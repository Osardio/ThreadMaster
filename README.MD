# ThreadMaster
Cross stitch kit organizer

Dependencies: DB <- backend <- frontend

## BACKEND

Prerequisites:
- Running PostgreSQL Database 15 or higher
- Node.js 18

Prepare database connection string as follows:
- `postgresql://<superuser_name>:<superuser_password>@<db_host>:<db_port>/<database_name>?schema=<database_schema>`

Example: 
- `postgresql://postgres:postgrespw@localhost:5432/threadmaster?schema=public`

For dev build, this connection string MUST be passed in `.env` file near `package.json` file:
```
DATABASE_URL=postgresql://postgres:postgrespw@localhost:5432/threadmaster?schema=public
```
or via environment variable `DATABASE_URL` (in `docker run` command). Otherwise, the default connection string pointing to `localhost:5432` will be used.

_Note:_ you can change default backend host via environment variable `PORT`. Defaults are:
```
PORT=7000
```

### Run development build:
1. `cd backend`
1. `npm install`
1. `npm run dev`

### Run production-ready build:
1. `cd backend`
1. `npm install`
1. `npm run serve`

### Deploy in a Docker container
1. `cd backend`
1. `docker build -t threadmaster_backend .`
1. `docker run --env-file env.docker --network="backend" -dp 7000:7000 threadmaster_backend`
- Last command assumes that you launched Postgres database in a docker network named `backend`.

## FRONTEND
Prerequisites: Node.js 18

### Run development build:
1. `cd frontend`
1. `npm install`
1. `npm run dev`

### Run production build:
1. `cd frontend`
1. `npm install`
1. `npm run serve`

### Deploy in a Docker container
1. `cd frontend`
1. `docker build -t threadmaster_frontend .`
1. `docker run -dp 7001:7001 threadmaster_frontend`

Default backend port is 7000, default frontend port is 7001.

_Note:_ you can change default backend host used by frontend container via environment variable `VITE_BACKEND_URL`. Defaults are:
```
VITE_BACKEND_URL=http://localhost:7000
``` 