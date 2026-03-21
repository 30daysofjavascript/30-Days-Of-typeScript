# 📘 Day 21 — Decorators

> **Level:** 🔴 Expert | **Estimated Time:** 2–3 hours

---

## 🎯 What You'll Learn

See `index.ts` for full in-depth coverage with annotated examples.

---

## 📖 Key Concepts

### Decorator Types

Decorators are special functions that annotate or modify classes, methods, properties, or parameters. They run at **class definition time** (not call time).

```ts
// Class decorator — modify/replace the class
function Singleton<T extends { new(...args: any[]): {} }>(Ctor: T) {
  let instance: InstanceType<T>;
  return class extends Ctor {
    constructor(...args: any[]) {
      super(...args);
      if (instance) return instance;
      instance = this as any;
    }
  };
}

// Method decorator — modify the method descriptor
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`[LOG] ${key}(${args.join(", ")})`);
    const result = original.apply(this, args);
    console.log(`[LOG] ${key} returned:`, result);
    return result;
  };
}

// Property decorator — intercept property access
function Required(target: any, key: string) {
  Object.defineProperty(target, key, {
    set(value) { if (!value) throw new Error(`${key} is required`); }
  });
}

// Decorator factory — decorator with parameters
function Retry(times: number) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      for (let i = 0; i < times; i++) {
        try { return await original.apply(this, args); }
        catch(e) { if (i === times - 1) throw e; }
      }
    };
  };
}
```

### Enable Decorators

```json
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true  // for reflect-metadata
  }
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

## 🔗 Further Reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Total TypeScript](https://www.totaltypescript.com)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

## ⏭️ Next Up

**[Day 22 — Mixins & Abstract Classes →](../Day-22-Mixins-Abstract-Classes/)**
