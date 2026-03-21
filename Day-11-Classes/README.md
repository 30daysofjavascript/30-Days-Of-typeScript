# 📘 Day 11 — Classes in TypeScript

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Class property declarations and initialization
- Constructor parameter shorthand (public/private/readonly in params)
- Inheritance with extends and super
- Getters and setters with type checking
- Static properties and methods
- Abstract classes — define contracts for subclasses
- Implementing interfaces with implements
- Method overriding and the override keyword (TypeScript 4.3+)

---

## 📖 Quick Reference

```ts
class Animal {
  constructor(
    public name: string,      // auto-declares this.name
    protected sound: string   // auto-declares this.sound
  ) {}

  speak(): string { return `${this.name}: ${this.sound}`; }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name, "Woof");       // must call super first
  }
  override speak(): string {   // override keyword (TS 4.3+)
    return super.speak() + "!";
  }
}

// Abstract class — cannot be instantiated
abstract class Shape {
  abstract area(): number;     // subclasses must implement
  describe(): string {         // concrete method
    return `Area: ${this.area()}`;
  }
}

// Implementing interfaces
interface Serializable { serialize(): string; }
class User implements Serializable {
  serialize(): string { return JSON.stringify(this); }
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

## 🔗 Further Reading

- [TypeScript Handbook — Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)

---

## ⏭️ Next Up

**[Day 12 — Access Modifiers & Readonly →](../Day-12-Access-Modifiers-Readonly/)**
