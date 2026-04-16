# 📘 Day 02 — Basic Types

> **Level:** 🟢 Beginner | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- All TypeScript primitive types: `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`
- The special types: `any`, `unknown`, `never`, `void`
- When to use each type and common pitfalls
- Type assertions (`as`) and non-null assertion (`!`)

---

## 📖 Type Reference

### Primitive Types

| Type | Example | Use Case |
|------|---------|----------|
| `string` | `"hello"` | Text values |
| `number` | `42`, `3.14` | All numeric values |
| `boolean` | `true`, `false` | Logical values |
| `bigint` | `9007199254740991n` | Integers beyond 2^53-1 |
| `symbol` | `Symbol("id")` | Unique property keys |
| `null` | `null` | Intentional absence |
| `undefined` | `undefined` | Uninitialized value |

### Special Types

| Type | Meaning | Rule |
|------|---------|------|
| `any` | Anything goes — disables type checking | ❌ Avoid |
| `unknown` | Could be anything — must check before use | ✅ Prefer over `any` |
| `never` | This code path is unreachable | Used for exhaustive checks |
| `void` | Function returns nothing meaningful | Used as return type |

---

## 📖 Concepts Covered

### `any` vs `unknown`

```ts
let a: any     = "hello";
let u: unknown = "hello";

// any — no checks needed (dangerous!)
a.toUpperCase(); // ✅ no error, but crashes if a is a number

// unknown — MUST check type first
u.toUpperCase(); // ❌ Error: Object is of type 'unknown'
if (typeof u === "string") {
  u.toUpperCase(); // ✅ Safe — TypeScript knows it's a string here
}
```

> 🔑 **Rule:** Use `unknown` for external/unverified data; avoid `any` entirely.

### `never` — Exhaustive Checks

```ts
type Color = "red" | "blue" | "green";

function getHex(color: Color): string {
  switch (color) {
    case "red":   return "#FF0000";
    case "blue":  return "#0000FF";
    case "green": return "#00FF00";
    default:
      const check: never = color; // ← If you add "yellow" and forget to handle it,
      throw new Error(`Unhandled color: ${color}`); // TypeScript errors here!
  }
}
```

### `void` vs `never`

```ts
function log(msg: string): void {
  console.log(msg); // Returns undefined (but we don't care about the return)
}

function crash(msg: string): never {
  throw new Error(msg); // NEVER returns — execution ends here
}
```

### Type Assertions

```ts
// Use when YOU know more than TypeScript
const input = document.getElementById("name") as HTMLInputElement;
input.value; // ✅ TypeScript knows it's an input, not just an HTMLElement

// Non-null assertion — use when value is definitely not null/undefined
const el = document.querySelector(".title")!;
el.textContent; // ✅ No null check needed
```

---

## 💡 Key Takeaways

- **`strict: true`** makes `null` and `undefined` separate from other types — always enable it
- **`any`** defeats TypeScript — treat it as a code smell
- **`unknown`** is the safe version of `any` — always check the type before use
- **`never`** enables exhaustive type checking in switch statements
- **`void`** just means "the return value doesn't matter" — not the same as `undefined`
- Type assertions (`as`) don't change runtime behavior — use them carefully

---

## 📝 Exercises

1. What type does TypeScript infer for each: `100`, `"hello" + " world"`, `5 > 3`, `null`?
2. Fix the type errors: `let price: number = "19.99"`, `let active: boolean = 1`
3. Write a function that takes `unknown` and safely returns its string representation
4. Write a function that always throws — what should its return type be?
5. Demonstrate why `unknown` is safer than `any` with a code example

---



## ⏭️ Next Up

**[Day 03 — Type Inference & Annotations →](../Day-03-Type-Inference-Annotations/)**
