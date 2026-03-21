# 📘 Day 23 — Index Signatures & Records

> **Level:** 🔴 Expert | **Estimated Time:** 2–3 hours

---

## 🎯 What You'll Learn

See `index.ts` for full in-depth coverage with annotated examples.

---

## 📖 Key Concepts

### Index Signatures

Allow objects with dynamic keys of a specific type:

```ts
// Any string key → string value
interface StringMap { [key: string]: string; }

// With required known properties (must match index type!)
interface WithRequired {
  [key: string]: string | number; // index signature
  id: number;                     // ✅ number extends string|number
  name: string;                   // ✅ string extends string|number
}
```

### Record<K, V>

Cleaner alternative for typed objects:

```ts
// All keys from a union → same value type
type StatusCount = Record<"active" | "inactive" | "deleted", number>;
// { active: number; inactive: number; deleted: number }
// ALL keys required — TypeScript enforces exhaustiveness!

type UserCache = Record<string, { user: User; fetchedAt: Date }>;

// Partial<Record<K, V>> — only some keys need to be present
type PartialFlags = Partial<Record<"dark" | "beta" | "notifications", boolean>>;
```

### When to Use Which

| Use | When |
|-----|------|
| `Record<string, V>` | Dynamic keys, same value type |
| `Record<"a"\|"b", V>` | Known keys, all required |
| `Partial<Record<K,V>>` | Known keys, some optional |
| `{ [key: string]: V }` | Legacy pattern — prefer Record |

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

## 🔗 Further Reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Total TypeScript](https://www.totaltypescript.com)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

## ⏭️ Next Up

**[Day 24 — keyof, typeof & infer →](../Day-24-Keyof-Typeof-Infer/)**
