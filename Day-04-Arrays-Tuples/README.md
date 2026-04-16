# 📘 Day 04 — Arrays & Tuples

> **Level:** 🟢 Beginner | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Two array type syntaxes: T[] and Array<T>
- Typed array operations (map, filter, reduce — all typed!)
- Readonly arrays with readonly T[] and ReadonlyArray<T>
- Tuples — fixed-length, mixed-type arrays
- Named tuple elements (TypeScript 4.0+)
- Optional and rest elements in tuples
- Real-world tuple use cases (useState-style, CSV parsing, multi-returns)

---

## 📖 Quick Reference

```ts
// Array types
const nums: number[]     = [1, 2, 3];
const strs: Array<string> = ["a", "b", "c"];

// Readonly
const frozen: readonly number[] = [1, 2, 3];
// frozen.push(4); // ❌ Error!

// Tuples — position matters!
type Point    = [x: number, y: number];
type RGB      = [red: number, green: number, blue: number];
type Entry    = [key: string, value: unknown];

const p: Point = [10, 20];
const [x, y]   = p;  // destructure with types preserved

// Return multiple values
function minMax(arr: number[]): [min: number, max: number] {
  return [Math.min(...arr), Math.max(...arr)];
}
const [min, max] = minMax([3,1,4,1,5]);
```

---

## 💡 Key Takeaways

- TypeScript's type system is structural — it checks the *shape* of values, not their class
- Types exist only at compile time — they're completely erased in the output JavaScript
- The more specific your types, the better IntelliSense, safety, and refactoring support you get
- When in doubt: be explicit. TypeScript is documentation that the compiler enforces

---

## 📝 Exercises

Open `index.ts` and complete the numbered exercises at the bottom of the file.

---



## ⏭️ Next Up

**[Day 05 — Objects & Interfaces →](../Day-05-Objects-Interfaces/)**
