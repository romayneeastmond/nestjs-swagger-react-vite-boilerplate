# Debugging Tips

## GitHub Codespaces

Codespaces is essentially VS Code running in a browser backed by a cloud container. The terminal, file explorer, and editor are identical to VS Code desktop.

- All `npm` commands work exactly the same in the Codespaces terminal
- Ports are forwarded automatically — when NestJS starts on 3001 Codespaces will prompt you to open it in a browser
- The forwarded URL will look like `https://your-codespace-name-3001.app.github.dev` instead of `localhost:3001`
- `.env` files will not be present since they are in `.gitignore` — recreate them manually or set them as Codespaces Secrets under your GitHub repository settings

### Setting Codespaces Secrets
1. Go to your GitHub repository
2. Click **Settings**
3. Click **Secrets and variables** in the left sidebar
4. Click **Codespaces**
5. Click **New repository secret**
6. Add each variable from your `.env` files

---

## NestJS Console Logging

### Basic value output
```ts
console.log('item:', item);
```

### Deep nested objects
Better than console.log for complex or nested objects since it expands the full structure:
```ts
console.dir(item, { depth: null });
```

### Readable JSON output
Useful for checking the exact shape of an object:
```ts
console.log(JSON.stringify(item, null, 2));
```

### NestJS Built-in Logger
If asked about logging in an interview context, NestJS has a built in Logger class that prefixes output with the context name and timestamp, making it easier to trace which service or controller a log came from:

```ts
import { Logger } from '@nestjs/common';

const logger = new Logger('ItemsService');
logger.log('Fetching items');
logger.error('Something went wrong', error.stack);
logger.warn('This is a warning');
```

NestJS logs appear in the **Codespaces terminal**.

---

## React Console Logging

### Component render debugging
```ts
console.log('ItemListPage render, items:', items);
```

### Checking API responses
```ts
console.dir(response, { depth: null });
```

### Tracking state changes
```ts
console.log('form state:', JSON.stringify(form, null, 2));
```

React logs appear in the **browser DevTools console**, not the terminal.

---

## Quick Reference

| Log Type                       | Best Tool                            | Where it appears             |
|--------------------------------|--------------------------------------|------------------------------|
| Simple values                  | `console.log`                        | Terminal or browser DevTools |
| Complex nested objects         | `console.dir` with `{ depth: null }` | Terminal or browser DevTools |
| Object shape inspection        | `JSON.stringify` with null, 2        | Terminal or browser DevTools |
| NestJS service/controller logs | NestJS `Logger` class                | Codespaces terminal          |
| React component/state logs     | `console.log` or `console.dir`       | Browser DevTools console     |