# Full Stack Application

A full stack application built with NestJS (API) and React (Frontend), containerized with Docker and ready for AWS deployment.

---

## Prerequisites

- Node.js v20+
- npm v9+
- Docker and Docker Compose
- MySQL (for the countries endpoint)

---

## Getting Started

### Running Locally Without Docker

**API**
```bash
cd api
npm install
npm run start:dev
```
Runs on http://localhost:3001
Swagger docs at http://localhost:3001/docs

**Frontend**
```bash
cd client
npm install
npm run dev
```
Runs on http://localhost:3000

---

### Running With Docker Compose

From the root directory:

```bash
docker-compose up --build
```

| Service  | URL                        |
|----------|----------------------------|
| API      | http://localhost:3001      |
| Swagger  | http://localhost:3001/docs |
| Frontend | http://localhost:3000      |

To stop:
```bash
docker-compose down
```

---

## Environment Variables

### API (`api/.env`)

| Variable    | Description         | Default     |
|-------------|---------------------|-------------|
| PORT        | API port            | 3001        |
| NODE_ENV    | Environment         | development |
| DB_HOST     | MySQL host          | localhost   |
| DB_PORT     | MySQL port          | 3306        |
| DB_USERNAME | MySQL username      |             |
| DB_PASSWORD | MySQL password      |             |
| DB_DATABASE | MySQL database name |             |

### Frontend (`client/.env`)

| Variable     | Description         | Default                      |
|--------------|---------------------|------------------------------|
| VITE_API_URL | NestJS API base URL | http://localhost:3001/api/v1 |

---

## API Endpoints

All routes are prefixed with `/api/v1`.

### Items
| Method | Route      | Description    | Auth Required |
|--------|------------|----------------|---------------|
| GET    | /items     | Get all items  | No            |
| GET    | /items/:id | Get one item   | No            |
| POST   | /items     | Create an item | Yes           |
| PUT    | /items/:id | Update an item | Yes           |
| DELETE | /items/:id | Delete an item | Yes           |

### Countries
| Method | Route            | Description                   | Auth Required |
|--------|------------------|-------------------------------|---------------|
| GET    | /countries       | Get all countries (paginated) | No            |
| GET    | /countries/:code | Get one country               | No            |

### Health
| Method | Route   | Description  | Auth Required |
|--------|---------|--------------|---------------|
| GET    | /health | Health check | No            |

---

## Testing

### API
```bash
cd api

# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

### Frontend
```bash
cd client

# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov
```

---

## AWS Deployment

This project is containerized and ready for deployment on AWS. Three options are available depending on your requirements:

### Elastic Beanstalk
Simplest option. Best for getting up and running quickly with minimal infrastructure management. Upload the `docker-compose.yml` directly to Elastic Beanstalk.

### Fargate
Serverless containers. No server management required. Best for containerized workloads where you want AWS to handle the underlying infrastructure.

### EKS (Elastic Kubernetes Service)
Most control and flexibility. Best for complex microservices at scale. Requires Kubernetes knowledge and more configuration overhead.

---

## Tech Stack

### API
- NestJS
- TypeORM
- MySQL
- Swagger
- Jest

### Frontend
- React
- TypeScript
- Vite
- React Router
- Jest
- Testing Library