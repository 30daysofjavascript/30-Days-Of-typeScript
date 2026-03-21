// ============================================================
// 🚀 DAY 29 — tsconfig.json & TypeScript Tooling
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================
// This file covers configuration — most content is in README.md
// The code here demonstrates how config options affect TypeScript behavior.

// ─────────────────────────────────────────────
// 1. STRICT MODE EFFECTS
// With "strict": true (enabling all these):
// ─────────────────────────────────────────────

// strictNullChecks — null/undefined are NOT assignable to other types
let name: string = "Alice";
// name = null;   // ❌ Error with strictNullChecks
let maybeName: string | null = null; // ✅ explicit union

// strictPropertyInitialization — class props must be initialized
class Config {
  host: string;  // ❌ Error: not initialized (without definite assignment)
  port!: number; // ✅ ! = "I'll handle this myself" (definite assignment)
  ssl: boolean = false; // ✅ initialized with default

  constructor(host: string) {
    this.host = host;
    // TypeScript checks: this.port is never assigned → error without !
  }
}

// noImplicitAny — can't have implicit 'any'
// function greet(name) { return name; } // ❌ 'name' has implicit 'any'
function greet(name: string): string { return name; } // ✅ explicit

// noImplicitThis — 'this' must be typed
function incrementCounter(this: { count: number }): void {
  this.count++;
}

// strictFunctionTypes — function parameter types checked covariantly
type Handler  = (arg: string) => void;
type Handler2 = (arg: string | number) => void;
// let h: Handler = (arg: string | number) => {}; // ❌ stricter check

// ─────────────────────────────────────────────
// 2. TARGET AND LIB OPTIONS
// ─────────────────────────────────────────────

// target: "ES2022" means TS compiles to ES2022 features
// Available targets: ES5, ES6/ES2015, ES2016-ES2022, ESNext

// lib: what built-in APIs are available
// "lib": ["ES2022", "DOM"] — gives you browser APIs + modern JS
// "lib": ["ES2022"] — Node.js (no DOM)
// "lib": ["ESNext"] — latest features

// With target ES5, this would compile to prototype methods:
class MyArray<T> extends Array<T> {
  first(): T | undefined { return this[0]; }
}

// With target ES2022, class fields use native syntax
class Point {
  x = 0; // native class field in ES2022+
  y = 0;
}

// ─────────────────────────────────────────────
// 3. MODULE OPTIONS
// ─────────────────────────────────────────────

// "module": "commonjs" — for Node.js (require/module.exports)
// "module": "esnext" — for modern bundlers (import/export)
// "module": "node16" — for Node.js 16+ ESM support
// "moduleResolution": "bundler" — for Vite/webpack (default for React apps)

// esModuleInterop: true — allows:
import fs from "fs"; // without esModuleInterop you'd need: import * as fs from "fs"

// allowSyntheticDefaultImports — allows default imports from modules without them
// import _ from "lodash"; // without this flag, would need: import * as _ from "lodash"

// ─────────────────────────────────────────────
// 4. PATH ALIASES
// ─────────────────────────────────────────────

// tsconfig.json:
// {
//   "compilerOptions": {
//     "baseUrl": ".",
//     "paths": {
//       "@/*": ["src/*"],
//       "@components/*": ["src/components/*"],
//       "@utils/*": ["src/utils/*"],
//       "@types/*": ["src/types/*"]
//     }
//   }
// }

// Then in code:
// import { Button } from "@components/Button";
// import { formatDate } from "@utils/date";
// import type { User } from "@types/user";

// ─────────────────────────────────────────────
// 5. DECLARATION GENERATION
// ─────────────────────────────────────────────

// For library authors:
// {
//   "compilerOptions": {
//     "declaration": true,          // generate .d.ts files
//     "declarationMap": true,       // generate .d.ts.map (go-to-def in editors)
//     "declarationDir": "./types",  // output dir for .d.ts files
//     "emitDeclarationOnly": true   // only emit types, not JS (use another bundler)
//   }
// }

// ─────────────────────────────────────────────
// 6. INCREMENTAL COMPILATION
// ─────────────────────────────────────────────

// {
//   "compilerOptions": {
//     "incremental": true,           // cache compilation info
//     "tsBuildInfoFile": "./.tsbuildinfo" // where to store the cache
//   }
// }

// Project references for monorepos:
// tsconfig.json (root):
// { "references": [{ "path": "./packages/core" }, { "path": "./packages/ui" }] }
// Then: tsc --build (compiles all, in dependency order)

// ─────────────────────────────────────────────
// 7. USEFUL COMPILER FLAGS
// ─────────────────────────────────────────────

// noUnusedLocals: true        — error on unused variables
// noUnusedParameters: true    — error on unused function params
// noImplicitReturns: true     — all code paths must return a value
// noFallthroughCasesInSwitch: true — no switch case fallthrough
// exactOptionalPropertyTypes: true — disallow undefined for optional props
// noUncheckedIndexedAccess: true   — array access returns T|undefined
// allowUnreachableCode: false — warn on unreachable code

// noUncheckedIndexedAccess example:
const arr = [1, 2, 3];
// With noUncheckedIndexedAccess:
// const first: number | undefined = arr[0]; // index access gives T | undefined

// exactOptionalPropertyTypes example:
interface OptProps {
  name?: string; // With exact: ONLY string | absent (not string | undefined)
}

// ─────────────────────────────────────────────
// 8. WORKING WITH THIRD-PARTY TYPES
// ─────────────────────────────────────────────

// Three scenarios when using a library:
// 1. Library ships its own types (best): just import and use
// 2. Library has @types: npm install @types/library-name --save-dev
// 3. No types available: write your own or use declare module

// Checking if types exist:
// npm info <package-name> types  (check 'types' field in package.json)
// Or: https://www.typescriptlang.org/dt/search

// ─────────────────────────────────────────────
// 9. COMMON TSCONFIG SETUPS
// ─────────────────────────────────────────────

// Node.js App:
const nodeConfig = {
  compilerOptions: {
    target: "ES2022",
    module: "commonjs",
    lib: ["ES2022"],
    outDir: "./dist",
    rootDir: "./src",
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
  }
};

// React App (Vite):
const reactConfig = {
  compilerOptions: {
    target: "ES2020",
    lib: ["ES2020", "DOM", "DOM.Iterable"],
    module: "ESNext",
    moduleResolution: "bundler",
    jsx: "react-jsx",
    strict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true,
  }
};

// Library (ESM):
const libConfig = {
  compilerOptions: {
    target: "ES2020",
    module: "ESNext",
    declaration: true,
    declarationMap: true,
    emitDeclarationOnly: true,
    strict: true,
    outDir: "./dist",
  }
};

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Create a tsconfig.json for a Node.js Express API with:
// - strict mode on
// - ES2022 target
// - path aliases (@/routes, @/middleware, @/models)
// - incremental compilation

// Exercise 2:
// Create a tsconfig.json for a React app using Vite with:
// - strict mode
// - path aliases
// - no unused locals/parameters

// Exercise 3:
// What does each of these options do and when would you use them?
// - skipLibCheck: true
// - isolatedModules: true
// - noEmit: true
// - composite: true

// Exercise 4:
// Set up a monorepo with two packages (core and ui) using project references.
// Write the root tsconfig.json and each package's tsconfig.json.

// Exercise 5:
// Write a script that validates all files in a TypeScript project compile
// without errors, and outputs a summary of any issues found.
