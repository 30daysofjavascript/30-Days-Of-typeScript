// ============================================================
// 🚀 DAY 08 — Literal Types & Type Aliases
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. LITERAL TYPES — Exact Values as Types
// ─────────────────────────────────────────────

// String literal types
type Direction = "north" | "south" | "east" | "west";
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type Status = "pending" | "active" | "inactive" | "deleted";
type LogLevel = "debug" | "info" | "warn" | "error";

// Number literal types
type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;
type Port = 80 | 443 | 3000 | 8080;
type ZeroOrOne = 0 | 1;

// Boolean literal types (less common, but valid)
type True  = true;
type False = false;

// Using literal types
function move(direction: Direction, steps: number): string {
  return `Moving ${direction} by ${steps} steps`;
}
move("north", 3);   // ✅
// move("up", 3);    // ❌ "up" is not a valid Direction

function request(method: HttpMethod, url: string): void {
  console.log(`${method} ${url}`);
}
request("GET", "/api/users");   // ✅
// request("FETCH", "/api");     // ❌ not a valid HTTP method

// ─────────────────────────────────────────────
// 2. LITERAL INFERENCE — const vs let
// ─────────────────────────────────────────────

// const → infers LITERAL type
const METHOD = "GET";    // type: "GET" (literal)
const CODE   = 200;      // type: 200 (literal)

// let → infers WIDENED type
let method = "GET";       // type: string (widened)
let code   = 200;         // type: number (widened)

// This matters when passing to typed functions:
// request(method, "/api"); // ❌ 'string' is not assignable to HttpMethod
// request(METHOD, "/api"); // ✅ "GET" is HttpMethod

// Solutions:
let method2 = "GET" as const;          // → type: "GET"
let method3: HttpMethod = "GET";       // → type: HttpMethod (still literal)

// ─────────────────────────────────────────────
// 3. TYPE ALIASES — Named Types
// ─────────────────────────────────────────────

// Simple alias for a primitive
type ID = string;
type Age = number;
type Email = string;

// Alias for complex union
type StringOrNumber = string | number;
type Nullable<T>    = T | null;
type Maybe<T>       = T | null | undefined;

// Alias for object type
type Point = { x: number; y: number };
type Size  = { width: number; height: number };

// Alias for function type
type Callback        = () => void;
type Handler<T>      = (value: T) => void;
type Transformer<T>  = (value: T) => T;
type AsyncFn<T, R>   = (arg: T) => Promise<R>;
type Predicate<T>    = (value: T) => boolean;

// ─────────────────────────────────────────────
// 4. COMBINING TYPE ALIASES
// ─────────────────────────────────────────────

type Name = { firstName: string; lastName: string };
type Contact = { email: Email; phone?: string };
type Timestamps = { createdAt: Date; updatedAt: Date };

// Intersection combines all
type Person = Name & Contact & Timestamps & { id: ID };

const alice: Person = {
  id: "user-1",
  firstName: "Alice",
  lastName: "Smith",
  email: "alice@example.com",
  createdAt: new Date(),
  updatedAt: new Date(),
};

// ─────────────────────────────────────────────
// 5. TEMPLATE LITERAL TYPES (preview — Day 18 in depth)
// ─────────────────────────────────────────────

type EventName   = `on${Capitalize<string>}`;   // e.g. "onClick", "onChange"
type CSSProperty = `--${string}`;               // CSS custom properties

type Getter<T extends string> = `get${Capitalize<T>}`;
type Setter<T extends string> = `set${Capitalize<T>}`;

type UserGetter = Getter<"name" | "email" | "age">;
// type: "getName" | "getEmail" | "getAge"

// ─────────────────────────────────────────────
// 6. RECURSIVE TYPE ALIASES
// ─────────────────────────────────────────────

// JSON type — can be any valid JSON value
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const config: JSONValue = {
  name: "app",
  version: 1,
  features: ["auth", "dashboard"],
  nested: { deep: { value: true } },
};

// Linked list
type ListNode<T> = {
  value: T;
  next: ListNode<T> | null;
};

const list: ListNode<number> = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: null
    }
  }
};

// Tree node
type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
};

// ─────────────────────────────────────────────
// 7. BRANDED TYPES — Type-Safe Primitives
// Prevent accidentally mixing semantically different strings/numbers
// ─────────────────────────────────────────────

// Without branded types, these are all just 'string':
type UserId    = string;
type ProductId = string;
// const userId: UserId = productId; // ✅ No error — but this is likely a bug!

// WITH branded types — structurally distinct
type Brand<T, B> = T & { readonly __brand: B };
type BrandedUserId    = Brand<string, "UserId">;
type BrandedProductId = Brand<string, "ProductId">;

// Factory functions to create branded values
function createUserId(id: string): BrandedUserId {
  return id as BrandedUserId;
}
function createProductId(id: string): BrandedProductId {
  return id as BrandedProductId;
}

function getUser(id: BrandedUserId): void {
  console.log(`Getting user: ${id}`);
}

const uid = createUserId("user-123");
const pid = createProductId("prod-456");

getUser(uid);  // ✅
// getUser(pid); // ❌ Argument of type 'BrandedProductId' is not assignable!
// getUser("raw-string"); // ❌ raw string not assignable

// ─────────────────────────────────────────────
// 8. CONST ASSERTION & LITERAL INFERENCE
// ─────────────────────────────────────────────

// Without as const
const config1 = {
  endpoint: "/api",
  method: "GET",
  retries: 3,
};
// config1.method type: string (widened)

// With as const — all properties become readonly literals
const config2 = {
  endpoint: "/api",
  method: "GET",
  retries: 3,
} as const;
// config2.method type: "GET" (literal!)
// config2.retries type: 3 (literal number!)
// config2 is Readonly<{endpoint:"/api", method:"GET", retries:3}>

// Extremely useful for config objects, status maps, etc.
const HTTP_STATUS = {
  OK:                  200,
  CREATED:             201,
  BAD_REQUEST:         400,
  UNAUTHORIZED:        401,
  NOT_FOUND:           404,
  INTERNAL_ERROR:      500,
} as const;

type HttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];
// type: 200 | 201 | 400 | 401 | 404 | 500

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Create a type 'CardSuit' for "hearts"|"diamonds"|"clubs"|"spades"
// and 'CardValue' for "A"|"2"|"3"|...|"K"
// Then create a 'Card' type combining them.

// Exercise 2:
// Create branded types for:
// - Celsius and Fahrenheit temperatures (prevent mixing!)
// - Meters and Feet distances

// Exercise 3:
// Build a type-safe state machine type:
// States: "idle" | "loading" | "success" | "error"
// Transitions: idle→loading, loading→success|error, error→idle

// Exercise 4:
// Using as const, create a ROUTES object and derive a 'Route' type from it.

// Exercise 5:
// Create a recursive type 'DeepReadonly<T>' that makes all nested
// properties readonly (not just the top level).
