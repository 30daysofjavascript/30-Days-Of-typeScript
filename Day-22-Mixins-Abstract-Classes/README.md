# 📘 Day 22 — Mixins & Abstract Classes

> **Level:** 🔴 Expert | **Estimated Time:** 2–3 hours

---

## 🎯 What You'll Learn

See `index.ts` for full in-depth coverage with annotated examples.

---

## 📖 Key Concepts

### Abstract Classes

Abstract classes define a template — they can have both abstract methods (must be implemented) and concrete methods (shared implementation):

```ts
abstract class Shape {
  constructor(public color: string) {}
  abstract area(): number;         // subclasses MUST implement
  abstract perimeter(): number;    // subclasses MUST implement
  describe(): string {             // shared implementation
    return `${this.color} ${this.constructor.name}: area=${this.area().toFixed(2)}`;
  }
}
// new Shape(); // ❌ Cannot instantiate abstract class
```

### Mixins

A mixin is a function that takes a class and returns it enhanced with new behavior:

```ts
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt = new Date();
    updatedAt = new Date();
    touch() { this.updatedAt = new Date(); }
  };
}

function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActive = false;
    activate()   { this.isActive = true; }
    deactivate() { this.isActive = false; }
  };
}

// Apply multiple mixins:
class User extends Serializable(Activatable(Timestamped(BaseEntity))) {
  constructor(id: number, public name: string) { super(id); }
}
// User now has: id, name, createdAt, updatedAt, touch(), isActive, activate(), serialize()
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

## 🔗 Further Reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Total TypeScript](https://www.totaltypescript.com)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

## ⏭️ Next Up

**[Day 23 — Index Signatures & Records →](../Day-23-Index-Signatures-Records/)**
