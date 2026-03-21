// ============================================================
// 🚀 DAY 15 — Utility Types
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================
// TypeScript ships with built-in generic types that transform
// existing types. These are called "utility types".

// ─────────────────────────────────────────────
// BASE TYPE FOR EXAMPLES
// ─────────────────────────────────────────────
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "viewer";
  active: boolean;
  createdAt: Date;
  address?: string;
}

// ─────────────────────────────────────────────
// 1. Partial<T> — Make ALL properties optional
// Great for update functions where you only pass changed fields
// ─────────────────────────────────────────────

function updateUser(id: number, updates: Partial<User>): User {
  // Only the changed fields are passed
  const existing = {} as User; // pretend fetched from DB
  return { ...existing, ...updates };
}
updateUser(1, { name: "Bob" });           // ✅ only name
updateUser(1, { email: "b@b.com", active: false }); // ✅ two fields

// ─────────────────────────────────────────────
// 2. Required<T> — Make ALL properties required
// Opposite of Partial — removes all ?
// ─────────────────────────────────────────────

interface Config {
  host?: string;
  port?: number;
  ssl?: boolean;
  timeout?: number;
}

type StrictConfig = Required<Config>;
// { host: string; port: number; ssl: boolean; timeout: number }

// ─────────────────────────────────────────────
// 3. Readonly<T> — Make ALL properties readonly
// ─────────────────────────────────────────────

const frozenUser: Readonly<User> = {
  id: 1, name: "Alice", email: "a@a.com", password: "x",
  role: "user", active: true, createdAt: new Date()
};
// frozenUser.name = "Bob"; // ❌ readonly

// Useful for function params to prevent mutation:
function displayUser(user: Readonly<User>): void {
  console.log(user.name);
  // user.name = "Hacked"; // ❌ caught by TypeScript
}

// ─────────────────────────────────────────────
// 4. Pick<T, K> — Keep only specified keys
// ─────────────────────────────────────────────

type UserPreview = Pick<User, "id" | "name" | "role">;
// { id: number; name: string; role: "admin"|"user"|"viewer" }

type LoginForm = Pick<User, "email" | "password">;
// { email: string; password: string }

function showUserCard(user: Pick<User, "id" | "name" | "email">): void {
  console.log(`${user.id}: ${user.name} <${user.email}>`);
}

// ─────────────────────────────────────────────
// 5. Omit<T, K> — Remove specified keys
// ─────────────────────────────────────────────

type SafeUser    = Omit<User, "password">;      // user without password
type CreateUser  = Omit<User, "id" | "createdAt">; // for creation (no id yet)
type PublicUser  = Omit<User, "password" | "email">;

function createUser(data: Omit<User, "id" | "createdAt">): User {
  return { ...data, id: Date.now(), createdAt: new Date() };
}

// ─────────────────────────────────────────────
// 6. Record<K, V> — Object with specific key/value types
// ─────────────────────────────────────────────

type UserById   = Record<number, User>;
type ColorMap   = Record<string, string>;
type StatusMap  = Record<"active" | "inactive" | "deleted", number>;

const colorMap: ColorMap = { red: "#FF0000", green: "#00FF00" };

const statusCounts: StatusMap = {
  active: 100,
  inactive: 25,
  deleted: 5,
};

// Record with union keys (exhaustive)
type PageComponents = Record<"header" | "main" | "footer" | "sidebar", React_Component>;
interface React_Component { render(): string }

// ─────────────────────────────────────────────
// 7. Exclude<T, U> — Remove types from a union
// ─────────────────────────────────────────────

type AllTypes    = string | number | boolean | null | undefined;
type Defined     = Exclude<AllTypes, null | undefined>; // string | number | boolean
type NotString   = Exclude<AllTypes, string>;           // number | boolean | null | undefined
type OnlyPrimary = Exclude<"a" | "b" | "c" | "d", "b" | "d">; // "a" | "c"

// ─────────────────────────────────────────────
// 8. Extract<T, U> — Keep only matching types from union
// ─────────────────────────────────────────────

type Strings = Extract<AllTypes, string>;          // string
type Numbers = Extract<AllTypes, number | string>; // number | string

// ─────────────────────────────────────────────
// 9. NonNullable<T> — Remove null and undefined
// ─────────────────────────────────────────────

type MaybeString  = string | null | undefined;
type DefiniteStr  = NonNullable<MaybeString>;  // string

type Clean<T> = NonNullable<T>;

// ─────────────────────────────────────────────
// 10. ReturnType<T> — Extract function return type
// ─────────────────────────────────────────────

function createSession(userId: number) {
  return { token: "abc123", userId, expiresAt: new Date() };
}

type Session = ReturnType<typeof createSession>;
// { token: string; userId: number; expiresAt: Date }

// Works great with async functions:
async function fetchUser(id: number) {
  return { id, name: "Alice", email: "a@a.com" };
}
type FetchedUser = Awaited<ReturnType<typeof fetchUser>>;
// { id: number; name: string; email: string }

// ─────────────────────────────────────────────
// 11. Parameters<T> — Extract function parameter types
// ─────────────────────────────────────────────

function search(query: string, page: number, limit: number) { }
type SearchParams = Parameters<typeof search>; // [string, number, number]

// Use to forward arguments:
function wrappedSearch(...args: Parameters<typeof search>): void {
  console.log("Searching with:", args);
  search(...args);
}

// ─────────────────────────────────────────────
// 12. InstanceType<T> — Extract class instance type
// ─────────────────────────────────────────────

class MyService {
  doSomething(): void { console.log("done"); }
}

type ServiceInstance = InstanceType<typeof MyService>; // MyService

// Useful with abstract classes and class constructors
function createInstance<T extends abstract new (...args: any[]) => any>(
  Ctor: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  return new (Ctor as any)(...args);
}

// ─────────────────────────────────────────────
// 13. Awaited<T> — Unwrap Promise type
// ─────────────────────────────────────────────

type P1 = Awaited<Promise<string>>;            // string
type P2 = Awaited<Promise<Promise<number>>>;   // number (deeply unwrapped)
type P3 = Awaited<string>;                      // string (not a promise, unchanged)

// ─────────────────────────────────────────────
// 14. String Utility Types
// ─────────────────────────────────────────────

type Lower   = Lowercase<"HELLO WORLD">;   // "hello world"
type Upper   = Uppercase<"hello world">;   // "HELLO WORLD"
type Caps    = Capitalize<"hello">;        // "Hello"
type Uncaps  = Uncapitalize<"Hello">;      // "hello"

// Very useful with template literal types (Day 18):
type EventName<T extends string> = `on${Capitalize<T>}`;
type Events = EventName<"click" | "change" | "blur">;
// "onClick" | "onChange" | "onBlur"

// ─────────────────────────────────────────────
// 15. COMBINING UTILITY TYPES
// ─────────────────────────────────────────────

// Create DTO — no id/timestamps, all fields required
type CreateUserDTO = Required<Omit<User, "id" | "createdAt">>;

// Update DTO — no id/timestamps, all fields optional
type UpdateUserDTO = Partial<Omit<User, "id" | "createdAt">>;

// Safe User — no password, readonly
type SafeReadonlyUser = Readonly<Omit<User, "password">>;

// API Response wrapping any data type
type ApiResponse<T> = {
  data: T;
  meta: { total: number; page: number; limit: number };
  timestamp: string;
};

type UsersResponse = ApiResponse<User[]>;
type UserResponse  = ApiResponse<SafeReadonlyUser>;

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1: Given this interface:
// interface Product { id: number; name: string; price: number; stock: number; category: string }
// Create: CreateProduct, UpdateProduct, ProductSummary, ProductCard types

// Exercise 2:
// Create a type-safe merge function using Partial and Required:
// function merge<T>(base: T, overrides: Partial<T>): T

// Exercise 3:
// Create these transformation types using combinations of utilities:
// - NullablePartial<T> — all fields optional and nullable
// - StrictPick<T, K> — like Pick but also makes picked keys Required
// - OmitNullable<T> — removes all nullable properties from T

// Exercise 4:
// Use ReturnType and Parameters to create a middleware wrapper:
// function withLogging<T extends (...args: any[]) => any>(fn: T): T

// Exercise 5:
// Create a FormValues<T> type that converts all properties of T to string
// (since HTML form inputs always give strings).
