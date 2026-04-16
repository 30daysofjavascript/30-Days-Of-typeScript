# 📘 Day 10 — Narrowing & Type Guards

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- typeof narrowing (string, number, boolean, undefined)
- instanceof narrowing for class instances
- in narrowing for property existence checks
- Equality narrowing (=== comparisons)
- Custom type guards with the 'value is T' return type
- Assertion functions with 'asserts value is T'
- Discriminated unions — the most powerful narrowing technique
- Control flow analysis — TypeScript tracks types across branches

---

## 📖 Quick Reference

```ts
// typeof narrowing
function print(val: string | number) {
  if (typeof val === "string") val.toUpperCase(); // string here
  else val.toFixed();                              // number here
}

// Custom type guard — val is Bird
function isBird(animal: Bird | Fish): animal is Bird {
  return "wings" in animal;
}

// Discriminated union — best pattern for complex types
type State =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error";   error: Error };

function render(state: State) {
  switch (state.status) {
    case "loading": return "Loading...";
    case "success": return state.data.join(", "); // data available
    case "error":   return state.error.message;   // error available
  }
}

// Assertion function — throws if not the type
function assertString(val: unknown): asserts val is string {
  if (typeof val !== "string") throw new TypeError("Expected string");
}
```

---

## 💡 Key Takeaways

- Narrowing is how TypeScript refines a union type to a more specific type in a branch
- Always use discriminated unions (with a `kind`/`type` field) for complex union types
- Custom type guards (value is T) give you full control over narrowing
- Exhaustive checks with `never` ensure you handle all cases as types evolve

---

## 📝 Exercises

Open `index.ts` and complete the exercises at the bottom of the file.

---


## ⏭️ Next Up

**[Day 11 — Classes in TypeScript →](../Day-11-Classes/)**
