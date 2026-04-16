# 📘 Day 29 — tsconfig & Tooling

> **Level:** 🔴 Expert | **Estimated Time:** 2–3 hours

---

## 🎯 What You'll Learn

See `index.ts` for full in-depth coverage with annotated examples.

---

## 📖 Key Concepts

### tsconfig.json Essential Options

```json
{
  "compilerOptions": {
    // Compilation targets
    "target": "ES2022",        // output JS version
    "lib": ["ES2022", "DOM"],  // available APIs

    // Module system
    "module": "commonjs",       // for Node.js
    "moduleResolution": "bundler", // for Vite/webpack

    // Strict mode (ALWAYS enable!)
    "strict": true,             // enables all strict checks

    // Individual strict checks (all included in "strict")
    "strictNullChecks": true,   // null/undefined are distinct
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitThis": true,

    // Extra safety
    "noUnusedLocals": true,       // warn on unused variables
    "noUnusedParameters": true,   // warn on unused params
    "noImplicitReturns": true,    // all paths must return
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true, // arr[0] is T | undefined

    // Paths
    "outDir": "./dist",
    "rootDir": "./src",
    "paths": { "@/*": ["src/*"] }
  }
}
```

### Popular Presets

```bash
# Node.js API
npm install @tsconfig/node20 --save-dev
# { "extends": "@tsconfig/node20/tsconfig.json" }

# React with Vite
# Use the default Vite template — already configured
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

**[Day 30 — Final Project →](../Day-30-Final-Project/)**
