# 📘 Day 15 — Utility Types

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.ts` — every concept explained with full inline commentary.

---

## 📖 Key Concepts

### Built-in Utility Types Cheat Sheet

| Utility | What it Does | Example |
|---------|-------------|---------|
| `Partial<T>` | All properties optional | `Partial<User>` |
| `Required<T>` | All properties required | `Required<Config>` |
| `Readonly<T>` | All properties readonly | `Readonly<User>` |
| `Pick<T,K>` | Keep only K keys | `Pick<User,"id"\|"name">` |
| `Omit<T,K>` | Remove K keys | `Omit<User,"password">` |
| `Record<K,V>` | Object of K→V | `Record<string,number>` |
| `Exclude<T,U>` | Remove U from union T | `Exclude<string\|null, null>` |
| `Extract<T,U>` | Keep only U from union T | `Extract<string\|number, string>` |
| `NonNullable<T>` | Remove null/undefined | `NonNullable<string\|null>` |
| `ReturnType<T>` | Return type of function | `ReturnType<typeof fn>` |
| `Parameters<T>` | Param types of function | `Parameters<typeof fn>` |
| `Awaited<T>` | Unwrap Promise | `Awaited<Promise<string>>` |

```ts
// Real-world combinations:
type CreateDTO = Omit<User, "id" | "createdAt">;
type UpdateDTO = Partial<Omit<User, "id" | "createdAt">>;
type SafeUser  = Readonly<Omit<User, "password">>;
```

---

## 💡 Key Takeaways

- TypeScript's type system is one of the most expressive in any mainstream language
- Invest time learning these type-level programming tools — they unlock code that is safe AND flexible
- Start with basic utility types, then gradually adopt mapped/conditional types as needed

---

## 📝 Exercises

Open `index.ts` and complete the exercises at the bottom of the file.

---

## 🔗 Further Reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)

---

## ⏭️ Next Up

**[Day 16 — Mapped Types →](../Day-16-Mapped-Types/)**
