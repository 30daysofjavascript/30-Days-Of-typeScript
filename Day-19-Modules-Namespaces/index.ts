// ============================================================
// 🚀 DAY 19 — Modules & Namespaces
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. ES MODULE IMPORTS/EXPORTS IN TYPESCRIPT
// ─────────────────────────────────────────────

// Named exports
export const PI = 3.14159;
export type UserId = string | number;
export interface Config { host: string; port: number; }
export function greet(name: string): string { return `Hello, ${name}!`; }
export class Logger { log(msg: string) { console.log(msg); } }

// Default export
export default class App {
  name: string;
  constructor(name: string) { this.name = name; }
}

// Re-export from other modules
// export { something } from "./other-module";
// export * from "./other-module";
// export * as utils from "./utils";

// Import examples (imagine these are separate files):
// import App from "./app";                        // default
// import { PI, greet, type UserId } from "./mod"; // named + type
// import * as Utils from "./utils";               // namespace
// import type { Config } from "./types";          // type-only import

// ─────────────────────────────────────────────
// 2. TYPE-ONLY IMPORTS/EXPORTS (TypeScript 3.8+)
// Ensures the import is erased at runtime
// ─────────────────────────────────────────────

// import type { User } from "./user";    // type only — zero JS output
// export type { User };                  // type only export

// Why use type-only imports?
// ✅ Zero runtime impact — definitely erased
// ✅ Clearer intent — "this is only used as a type"
// ✅ Better tree-shaking
// ✅ Avoids circular dependency issues

// Inline type imports (TypeScript 4.5+)
// import { type User, createUser } from "./user";
// ↑ User is type-only, createUser is a value

// ─────────────────────────────────────────────
// 3. MODULE AUGMENTATION
// Add types to existing modules (like extending global libs)
// ─────────────────────────────────────────────

// Augmenting a third-party module:
// declare module "express" {
//   interface Request {
//     user?: AuthenticatedUser;    // add 'user' to Express Request
//     correlationId?: string;
//   }
// }

// Augmenting global types:
declare global {
  interface Window {
    analytics: {
      track(event: string, properties?: Record<string, unknown>): void;
      identify(userId: string): void;
    };
    __APP_VERSION__: string;
  }

  interface Array<T> {
    // Adding custom method to ALL arrays
    groupBy<K extends string | number>(fn: (item: T) => K): Record<K, T[]>;
  }
}

// After augmentation, these are valid:
// window.analytics.track("page_view");
// [1,2,3].groupBy(n => n % 2 === 0 ? "even" : "odd");

// ─────────────────────────────────────────────
// 4. NAMESPACES (legacy — prefer modules in modern TS)
// Group related types and values under a name
// ─────────────────────────────────────────────

namespace Geometry {
  export interface Point   { x: number; y: number }
  export interface Circle  { center: Point; radius: number }
  export interface Rect    { topLeft: Point; width: number; height: number }

  export function area(shape: Circle | Rect): number {
    if ("radius" in shape) {
      return Math.PI * shape.radius ** 2;
    }
    return shape.width * shape.height;
  }

  export namespace Utils {
    export function distance(a: Point, b: Point): number {
      return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }
  }
}

const circle: Geometry.Circle = { center: { x: 0, y: 0 }, radius: 5 };
console.log(Geometry.area(circle));
console.log(Geometry.Utils.distance({ x: 0, y: 0 }, { x: 3, y: 4 })); // 5

// ─────────────────────────────────────────────
// 5. NAMESPACE MERGING WITH ENUMS/CLASSES
// Add methods to enums and classes via namespace merging
// ─────────────────────────────────────────────

enum Direction { North = "N", South = "S", East = "E", West = "W" }

namespace Direction {
  export function opposite(d: Direction): Direction {
    const map = {
      [Direction.North]: Direction.South,
      [Direction.South]: Direction.North,
      [Direction.East]:  Direction.West,
      [Direction.West]:  Direction.East,
    };
    return map[d];
  }

  export function fromDegrees(degrees: number): Direction {
    const normalized = ((degrees % 360) + 360) % 360;
    if (normalized < 45 || normalized >= 315) return Direction.North;
    if (normalized < 135) return Direction.East;
    if (normalized < 225) return Direction.South;
    return Direction.West;
  }
}

console.log(Direction.opposite(Direction.North)); // "S"

// ─────────────────────────────────────────────
// 6. MODULE RESOLUTION STRATEGIES
// ─────────────────────────────────────────────

// Configured in tsconfig.json:
// "moduleResolution": "bundler" | "node16" | "nodenext" | "node"

// Path aliases (tsconfig.json):
// {
//   "compilerOptions": {
//     "paths": {
//       "@/*": ["./src/*"],
//       "@utils/*": ["./src/utils/*"],
//       "@types/*": ["./src/types/*"]
//     }
//   }
// }

// Then you can import as:
// import { formatDate } from "@utils/date";
// import type { User } from "@types/user";

// ─────────────────────────────────────────────
// 7. AMBIENT MODULES — Describing Non-TypeScript Files
// ─────────────────────────────────────────────

// For CSS modules:
// declare module "*.css" {
//   const styles: Record<string, string>;
//   export default styles;
// }

// For images:
// declare module "*.png" {
//   const src: string;
//   export default src;
// }

// For JSON:
// declare module "*.json" {
//   const value: unknown;
//   export default value;
// }

// For any module you don't have types for:
// declare module "some-untyped-library" {
//   export function doSomething(x: string): number;
//   export const version: string;
//   export default class Library {
//     constructor(options: { debug?: boolean });
//     connect(): Promise<void>;
//   }
// }

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Create a module structure for a "math" library:
// - math/add.ts, math/multiply.ts, math/index.ts (barrel)
// - Use type-only imports where appropriate

// Exercise 2:
// Augment the Express Request interface to include:
// - currentUser?: { id: string; role: string }
// - requestId: string

// Exercise 3:
// Create a namespace 'Validators' with:
// - Interface ValidatorFn<T>
// - Functions: isEmail, isUrl, isPhone, isStrongPassword
// - Namespace Validators.Combinators with: and, or, not

// Exercise 4:
// Write ambient module declarations for these:
// - A "uuid" module that exports generate(): string and validate(s: string): boolean
// - A "*.svg" module that exports a React component

// Exercise 5:
// Set up path aliases in tsconfig.json so that:
// "@/components/*" → "src/components/*"
// "@/hooks/*" → "src/hooks/*"
// Then write the matching imports.
