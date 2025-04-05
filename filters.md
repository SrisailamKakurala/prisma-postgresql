Here are detailed notes on **Filtering and Searching in Prisma**, with both concepts and code examples, focused on PostgreSQL:

---

## 🔍 Prisma Filtering & Searching

---

### 🧠 **Concepts**

- **Filtering**: Narrowing down query results based on certain conditions.
- **Searching**: Matching data using patterns (like "starts with", "contains").

All of these are done using the `where` clause in Prisma queries.

---

## 📄 Basic Filtering

```ts
const users = await prisma.user.findMany({
  where: {
    email: 'sri@example.com',
  },
});
```

✅ This returns all users with that exact email.

---

## 🔁 Combining Filters

### 🔹 AND

```ts
where: {
  AND: [
    { name: { contains: 'sri' } },
    { email: { endsWith: '@gmail.com' } }
  ]
}
```

### 🔹 OR

```ts
where: {
  OR: [
    { name: { startsWith: 'A' } },
    { name: { startsWith: 'S' } }
  ]
}
```

### 🔹 NOT

```ts
where: {
  NOT: {
    email: { contains: 'spam' }
  }
}
```

---

## 🔎 Advanced String Search

```ts
where: {
  name: {
    contains: 'sri',     // anywhere in string
    mode: 'insensitive', // case-insensitive search
  },
}
```

---

## 📆 Date Filters

```ts
where: {
  created_at: {
    gte: new Date('2024-01-01'),
    lt: new Date('2025-01-01'),
  },
}
```

- `gt` / `lt` / `gte` / `lte`: Greater/Less Than operators
- Useful for filtering records created in a date range

---

## 🔢 Number Filters

```ts
where: {
  age: {
    gt: 18,
    lt: 60,
  },
}
```

---

## 🎯 Searching in Related Models

Let’s say each `Post` has a `User`:

```ts
const posts = await prisma.post.findMany({
  where: {
    user: {
      name: { contains: 'sri' },
    },
  },
  include: { user: true },
});
```

This filters posts where the author's name contains `'sri'`.

---

## 🧵 Filtering on Arrays

If a model has an array of strings (e.g., tags):

```ts
model Post {
  id    Int      @id @default(autoincrement())
  title String
  tags  String[]
}
```

Search for posts that contain `"prisma"` in tags:

```ts
where: {
  tags: {
    has: 'prisma',
  },
}
```

Other operators:
- `hasEvery`: All values must be present
- `hasSome`: At least one value must be present
- `isEmpty`: True/False

---

## 🧩 Full-text Search (PostgreSQL-specific)

You need to use raw queries for real full-text search:

```ts
const posts = await prisma.$queryRaw`
  SELECT * FROM "Post"
  WHERE to_tsvector("title") @@ to_tsquery('prisma');
`;
```

---

## 🧠 Summary Table

| Operation        | Example Syntax                             |
|------------------|---------------------------------------------|
| Equals           | `where: { email: "a@b.com" }`               |
| Not Equal        | `where: { NOT: { email: "a@b.com" } }`      |
| Contains         | `where: { name: { contains: "Sri" } }`      |
| Starts With      | `where: { name: { startsWith: "A" } }`      |
| Ends With        | `where: { name: { endsWith: "Z" } }`        |
| In Array         | `where: { role: { in: ["ADMIN", "USER"] } }`|
| Greater Than     | `where: { age: { gt: 21 } }`                |
| Related Models   | `where: { user: { name: { contains: "S" }}}`|
| Nested Filtering | Supported in any depth                      |

---

Let me know if you want pagination and sorting included as well.