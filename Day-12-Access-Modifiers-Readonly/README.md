# 📘 Day 12 — Access Modifiers & Readonly

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.ts` — every concept explained with full inline commentary.

---

## 📖 Key Concepts

### Access Modifiers

| Modifier | Accessible In | Description |
|----------|--------------|-------------|
| `public` (default) | Everywhere | No restriction |
| `private` | Class body only | TypeScript compile-time check |
| `#field` | Class body only | JavaScript runtime enforcement |
| `protected` | Class + subclasses | Inherited access |
| `readonly` | After set in constructor | Cannot be reassigned |

```ts
class BankAccount {
  public owner: string;          // anyone can read/write
  private balance: number;       // compile-time private
  #pin: string;                  // runtime private (truly inaccessible)
  protected log: string[] = [];  // accessible in subclasses

  constructor(owner: string, balance: number, pin: string) {
    this.owner   = owner;
    this.balance = balance;
    this.#pin    = pin;
  }
}

// TypeScript 'private' vs JS '#private':
// TypeScript: compile-time only — (obj as any).balance still works at runtime
// JS #private: runtime enforcement — TRULY inaccessible outside class
```

### Readonly

```ts
class Config {
  readonly host: string;   // set once in constructor, then immutable
  readonly port: number = 3000; // initialized inline

  constructor(host: string) { this.host = host; }
}

// Readonly<T> — makes ALL properties readonly
const user: Readonly<User> = { id: 1, name: "Alice" };
// user.name = "Bob"; // ❌
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


## ⏭️ Next Up

**[Day 13 — Generics: Basics →](../Day-13-Generics-Basics/)**
