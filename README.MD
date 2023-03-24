# ThreadMaster
Cross stitch kit organizer

## BACKEND

Prerequisites:
- PostgreSQL Database 15 or higher
- Node.js 18

Prepare database connection string as follows:
- `postgresql://<superuser_name>:<superuser_password>@<db_url>:<db_port>/<database_name>?schema=<database_schema>`

Example: 
- `postgresql://postgres:postgrespw@localhost:5432/threadmaster?schema=public`

### Development build:
1. `cd backend`
1. `npm install`
1. `npx prisma migrate dev`
1. `ts-node index.ts`

### Production-ready build:
1. `cd backend`
1. `npm ci --production`
1. `npx prisma migrate deploy`
1. `ts-node index.ts`


## FRONTEND
Prerequisites: Node.js 18

### Development build:
1. `cd frontend`
1. `npm install`
1. `npm run dev`

### Production build:
1. `cd frontend`
1. `npm install`
1. `npm run serve`

### Production build (with Docker)
