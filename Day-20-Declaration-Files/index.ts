// ============================================================
// 🚀 DAY 20 — Declaration Files (.d.ts)
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================
// .d.ts files are pure type declarations — no runtime code.
// They describe the shape of existing JavaScript to TypeScript.

// ─────────────────────────────────────────────
// 1. WHAT ARE .d.ts FILES?
// - Type declarations for JavaScript code
// - Used by TypeScript to understand external libraries
// - Zero runtime output — just metadata for the compiler
// - Published alongside npm packages as @types/* or bundled
// ─────────────────────────────────────────────

// Example: imagine this is a plain JavaScript library (no types)
// math-lib.js:
// function add(a, b) { return a + b; }
// const VERSION = "1.0.0";
// module.exports = { add, VERSION };

// We describe it with a .d.ts file:
// math-lib.d.ts:
declare function add(a: number, b: number): number;
declare const VERSION: string;

// After this, TypeScript understands the JS library!

// ─────────────────────────────────────────────
// 2. GLOBAL DECLARATIONS
// ─────────────────────────────────────────────

// Declare global variables (loaded via <script> tags, CDN, etc.)
declare const __ENV__: "development" | "production" | "test";
declare const __VERSION__: string;
declare const __BUILD_DATE__: string;

// Declare global functions
declare function require(module: string): any;
declare function __webpack_require__(id: string): any;

// Declare global namespaces (like jQuery $ or lodash _)
declare namespace _ {
  function isString(value: unknown): value is string;
  function isNumber(value: unknown): value is number;
  function chunk<T>(arr: T[], size: number): T[][];
  function flatten<T>(arr: Array<T | T[]>): T[];
}

// Usage (no import needed — these are globally available):
// _.chunk([1,2,3,4,5], 2); // [[1,2],[3,4],[5]]

// ─────────────────────────────────────────────
// 3. MODULE DECLARATIONS
// ─────────────────────────────────────────────

// Describing a CommonJS module:
declare module "my-library" {
  // Named exports
  export function connect(url: string): Promise<Connection>;
  export function disconnect(): Promise<void>;

  // Types
  export interface Connection {
    query<T>(sql: string, params?: unknown[]): Promise<T[]>;
    close(): Promise<void>;
  }

  export interface Config {
    url: string;
    poolSize?: number;
    timeout?: number;
  }

  // Default export
  export default function createClient(config: Config): Connection;
}

// For UMD libraries (works as both module and global)
declare module "moment" {
  function moment(date?: string | Date | number): moment.Moment;
  namespace moment {
    interface Moment {
      format(pattern: string): string;
      add(amount: number, unit: string): Moment;
      subtract(amount: number, unit: string): Moment;
      isValid(): boolean;
    }
    function utc(date?: string | Date): Moment;
    function now(): number;
  }
  export = moment;
}

// ─────────────────────────────────────────────
// 4. DECLARATION MERGING IN .d.ts FILES
// ─────────────────────────────────────────────

// Augmenting existing type declarations (e.g., Express):
// In express.d.ts or a separate types/express.d.ts:

declare namespace Express {
  interface Request {
    user?: {
      id: string;
      email: string;
      roles: string[];
    };
    correlationId: string;
    startTime: number;
  }

  interface Response {
    success<T>(data: T, status?: number): void;
    error(message: string, status?: number): void;
  }
}

// Augmenting global interfaces:
interface Array<T> {
  first(): T | undefined;
  last(): T | undefined;
  compact(): NonNullable<T>[];
}

// ─────────────────────────────────────────────
// 5. WRITING A COMPLETE .d.ts FILE
// Example: declaring a charting library
// ─────────────────────────────────────────────

declare module "mini-chart" {
  // Configuration types
  export interface ChartConfig {
    type: "line" | "bar" | "pie" | "scatter";
    title?: string;
    responsive?: boolean;
    animation?: boolean | { duration: number };
  }

  export interface Dataset {
    label: string;
    data: number[];
    color?: string;
    borderWidth?: number;
  }

  export interface DataSource {
    labels: string[];
    datasets: Dataset[];
  }

  // Events
  export interface ChartEvents {
    onClick?: (index: number, dataset: Dataset) => void;
    onHover?: (index: number) => void;
  }

  // The main chart class
  export class Chart {
    constructor(
      container: HTMLElement | string,
      config: ChartConfig,
      events?: ChartEvents
    );

    setData(data: DataSource): void;
    update(partial?: Partial<ChartConfig>): void;
    resize(): void;
    destroy(): void;
    toBase64(): string;
    on(event: keyof ChartEvents, handler: ChartEvents[keyof ChartEvents]): void;
  }

  // Factory function
  export function createChart(
    container: HTMLElement,
    data: DataSource,
    config?: Partial<ChartConfig>
  ): Chart;

  // Constants
  export const VERSION: string;
  export const DEFAULT_COLORS: readonly string[];
}

// ─────────────────────────────────────────────
// 6. USING @types PACKAGES
// ─────────────────────────────────────────────

// Most popular JS libraries have community-maintained types:
// npm install --save-dev @types/node
// npm install --save-dev @types/express
// npm install --save-dev @types/jest
// npm install --save-dev @types/lodash
// npm install --save-dev @types/react @types/react-dom

// Check if a library has types: https://www.typescriptlang.org/dt/search

// tsconfig.json controls which @types are included:
// {
//   "compilerOptions": {
//     "types": ["node", "jest"]  // only include these @types
//   }
// }

// ─────────────────────────────────────────────
// 7. GENERATING .d.ts FILES FROM YOUR OWN CODE
// ─────────────────────────────────────────────

// tsconfig.json settings:
// {
//   "compilerOptions": {
//     "declaration": true,        // generate .d.ts files
//     "declarationDir": "./types", // where to put them
//     "declarationMap": true,     // generate .d.ts.map for navigation
//     "emitDeclarationOnly": true // only emit .d.ts, no .js
//   }
// }

// When to use emitDeclarationOnly: true:
// - Building a library that others will use
// - You're using a different bundler (webpack/esbuild) for JS
// - You want to separate type generation from JS compilation

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Write a .d.ts file for this JS library:
// const formatDate = (date, format) => { /* ... */ };
// const parseDate = (str) => new Date(str);
// module.exports = { formatDate, parseDate };

// Exercise 2:
// Augment the String prototype to add:
// - .toCamelCase(): string
// - .toSnakeCase(): string
// - .truncate(maxLength: number): string

// Exercise 3:
// Write ambient declarations for a global analytics script loaded via CDN
// that exposes: window.ga(command, ...args), window.gtag(command, ...args)

// Exercise 4:
// Create a type-only declaration for a "feature flags" service:
// declare const flags: { isEnabled(flag: string): boolean; getAll(): Record<string,boolean> }

// Exercise 5:
// Explain when you'd write your own .d.ts vs using @types/*.
// What tsconfig settings do you need to generate .d.ts from your own library?
