Yes Sri — besides `log`, the `PrismaClient` constructor supports **several other powerful options** to fine-tune how Prisma behaves.

Here’s a complete breakdown of **all available attributes** you can pass to the `PrismaClient` constructor:

---

### 🛠️ PrismaClient Constructor Options

```ts
const prisma = new PrismaClient({
  log: [],
  datasources: {},
  errorFormat: '',
  rejectOnNotFound: {},
});
```

Let’s go through each in detail 👇

---

### 1. 🔍 `log`

We already covered this — it controls what gets logged.  
Possible values: `"query"`, `"info"`, `"warn"`, `"error"`  
Emit options: `"stdout"` (default) or `"event"`

---

### 2. 🌐 `datasources`

Used when you define **multiple environments** or **override DB URLs** programmatically.

#### Example:

```ts
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://user:pass@host:port/dbname',
    },
  },
});
```

- You can override the `.env` file's `DATABASE_URL` here.
- If you use **multiple databases** (e.g., analytics, logging), you'd configure them here too.

---

### 3. 🧼 `errorFormat`

Controls how Prisma formats error messages.

| Value       | Description                                    |
|-------------|------------------------------------------------|
| `"pretty"`  | Developer-friendly formatting (default in dev) |
| `"colorless"` | Strips out ANSI colors                       |
| `"minimal"` | Just the raw message                          |

#### Example:

```ts
const prisma = new PrismaClient({
  errorFormat: 'pretty',
});
```

---

### 4. 🚫 `rejectOnNotFound`

Used to **throw an error** if a record is not found, instead of returning `null`.

#### Example (global):

```ts
const prisma = new PrismaClient({
  rejectOnNotFound: true,
});
```

#### Example (per model):

```ts
const prisma = new PrismaClient({
  rejectOnNotFound: {
    findUnique: {
      User: true,
    },
  },
});
```

So this will throw an error instead of silently returning `null` if the user is not found.

---

### ✅ Full Example with All Attributes

```ts
const prisma = new PrismaClient({
  log: [{ level: 'query', emit: 'event' }],
  datasources: {
    db: {
      url: 'postgresql://user:pass@localhost:5432/mydb',
    },
  },
  errorFormat: 'pretty',
  rejectOnNotFound: {
    findUnique: {
      User: true,
    },
  },
});
```

---

### 🧠 TL;DR

| Attribute          | Purpose                                         |
|--------------------|-------------------------------------------------|
| `log`              | Control what gets logged                        |
| `datasources`      | Override or define DB connections               |
| `errorFormat`      | Choose dev-friendly or raw error messages       |
| `rejectOnNotFound` | Automatically throw if no record is returned    |

Let me know if you want a **use-case-driven explanation** or best practice setup for production vs development.