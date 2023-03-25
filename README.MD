# ThreadMaster
Cross stitch kit organizer

Dependencies: DB <- backend <- frontend

## BACKEND

Prerequisites:
- Running PostgreSQL Database 15 or higher
- Node.js 18

Prepare database connection string as follows:
- `postgresql://<superuser_name>:<superuser_password>@<db_url>:<db_port>/<database_name>?schema=<database_schema>`

Example: 
- `postgresql://postgres:postgrespw@localhost:5432/threadmaster?schema=public`

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
1. `docker run -dp 7000:7000 threadmaster_backend`

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

_Note:_ you can change backend port used by this container via environment variable `VITE_BACKEND_URL`. Default backend port is 7000.