## 📘 Prisma Migrations – README Notes

### 📌 What is a Migration?

A **migration** is a version-controlled representation of your **database schema changes** over time. It helps you:

- Track schema history
- Apply changes to the database safely
- Reproduce consistent database structures across environments

Think of it like **Git for your database schema**.

---

### 🛠️ Command: `npx prisma migrate dev --name create_users_schema`

#### ✅ What it does:
1. Checks your `schema.prisma` file.
2. Compares it to your existing database structure.
3. Generates a new **migration file** in `prisma/migrations/` folder.
4. Runs that migration to update your actual database.
5. Regenerates Prisma Client to reflect updated types.

---

### 🎯 Why use `migrate dev`?

This command is used **during development** to:
- Apply schema changes immediately
- Get real-time feedback (errors/warnings)
- Auto-generate and apply migrations + client in one go

---

### 🔖 `--name` flag

```bash
--name create_users_schema
```

Adds a meaningful name to your migration folder like:

```
prisma/migrations/20250406_create_users_schema/
```

Helps document **what the migration does** — e.g., `add_posts_table`, `remove_old_field`, etc.

If you **don’t provide `--name`**, Prisma will prompt you interactively to enter a name.

---

### 🔬 What if you skip `migrate dev` and just use `generate`?

- `prisma generate` **only regenerates the Prisma Client** (TypeScript auto types)
- It does **not apply schema changes to the database**
- You risk **schema mismatches** between code and database

So always run `migrate dev` after editing your `schema.prisma`.

---

### 🧠 Summary Table

| Command                     | Purpose |
|----------------------------|---------|
| `prisma migrate dev`       | Create + apply migration + update client |
| `--name create_users_schema` | Label for migration folder |
| `prisma generate`          | Only update Prisma Client (no DB changes) |

---

### 📁 Where are migrations stored?

```bash
/prisma
  └── /migrations
        └── 20250406_create_users_schema/
              └── migration.sql
```

This folder can be committed to Git — useful for CI/CD, production sync, rollback, etc.

---

### 💡 Best Practice

- Use `migrate dev` **every time you change schema**
- Use meaningful `--name` flags
- Never skip migrations in team/production setups
- Don’t rely only on `generate` for syncing DB with code

---