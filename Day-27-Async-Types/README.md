# 📘 Day 27 — Async TypeScript

> **Level:** 🔴 Expert | **Estimated Time:** 2–3 hours

---

## 🎯 What You'll Learn

See `index.ts` for full in-depth coverage with annotated examples.

---

## 📖 Key Concepts

### Typed Async Functions

```ts
// Always type your async functions explicitly
async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Awaited<T> — extract the resolved type
type ResolvedUser = Awaited<ReturnType<typeof fetchUser>>; // User

// Promise.all — all in parallel, TypeScript infers the tuple
const [user, posts] = await Promise.all([
  fetchUser(1),                          // Promise<User>
  fetchPosts(1),                         // Promise<Post[]>
]);
// user: User, posts: Post[]
```

### Async Generators

```ts
// AsyncGenerator<YieldType, ReturnType, NextType>
async function* paginate<T>(
  fetcher: (page: number) => Promise<T[]>
): AsyncGenerator<T[], void, undefined> {
  let page = 1;
  while (true) {
    const items = await fetcher(page++);
    if (items.length === 0) return;
    yield items;
  }
}

for await (const page of paginate(fetchUsers)) {
  page.forEach(user => console.log(user.name)); // page: User[]
}
```

---

## 💡 Key Takeaways

- TypeScript's type system enables you to make illegal states unrepresentable
- Advanced types (mapped, conditional, template literal) are type-level programming
- The best TypeScript code is not just safe — it's also self-documenting
- Types are tools: use them to prevent bugs, not to fight the compiler

---

## 📝 Exercises

Open `index.ts` and complete the exercises at the bottom of the file.

---


## ⏭️ Next Up

**[Day 28 — Advanced Type Patterns →](../Day-28-Advanced-Patterns/)**
