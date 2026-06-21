# NestJS REST API

Full CRUD REST API with Swagger docs and health check endpoint.

---

## Project Structure

```
src/
├── main.ts                        # Entry point, Swagger setup
├── app.module.ts                  # Root module
├── items/                         # CRUD resource
│   ├── dto/
│   │   ├── create-item.dto.ts
│   │   └── update-item.dto.ts
│   ├── entities/
│   │   └── item.entity.ts
│   ├── items.controller.ts
│   ├── items.module.ts
│   ├── items.service.ts
│   └── items.service.spec.ts
└── health/                        # Health check (separate controller)
    ├── health.controller.ts
    └── health.module.ts
```

---

## NPM Commands

### Install dependencies
```bash
npm install
```

### Development (watch mode)
```bash
npm run start:dev
```

### Production build
```bash
npm run build
npm run start:prod
```

### Run tests
```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov
```

### Lint & format
```bash
npm run lint
npm run format
```

---

## API Endpoints

All routes are prefixed with `/api/v1`.

### Items

| Method   | Route              | Description        |
|----------|--------------------|--------------------|
| `POST`   | `/api/v1/items`    | Create a new item  |
| `GET`    | `/api/v1/items`    | Get all items      |
| `GET`    | `/api/v1/items/:id`| Get one item       |
| `PUT`    | `/api/v1/items/:id`| Update an item     |
| `DELETE` | `/api/v1/items/:id`| Delete an item     |

### Health

| Method | Route            | Description        |
|--------|------------------|--------------------|
| `GET`  | `/api/v1/health` | Application health |

---

## Swagger Docs

Once running, visit: **http://localhost:3000/docs**

---

## Adding MySQL (TypeORM)

When ready to connect a database, install:

```bash
npm install @nestjs/typeorm typeorm mysql2
```

Then:
1. Add `TypeOrmModule.forRoot({ ... })` to `AppModule`
2. Decorate `Item` entity with `@Entity()`, `@Column()`, etc.
3. Inject `@InjectRepository(Item)` into `ItemsService`
4. Replace in-memory Map logic with repository calls

The commented-out env vars in `.env.example` are ready to go.
