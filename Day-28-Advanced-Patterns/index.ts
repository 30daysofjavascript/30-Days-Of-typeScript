// ============================================================
// 🚀 DAY 28 — Advanced TypeScript Patterns
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. BUILDER PATTERN
// ─────────────────────────────────────────────

// Type-safe builder using template method
class QueryBuilder<T extends object> {
  private _table: string = "";
  private _conditions: string[] = [];
  private _columns: (keyof T)[] = [];
  private _limit?: number;
  private _offset?: number;
  private _orderBy?: { column: keyof T; direction: "ASC" | "DESC" };

  static for<T extends object>(table: string): QueryBuilder<T> {
    const qb = new QueryBuilder<T>();
    qb._table = table;
    return qb;
  }

  select(...columns: (keyof T)[]): this {
    this._columns = columns;
    return this;
  }

  where(condition: string): this {
    this._conditions.push(condition);
    return this;
  }

  limit(n: number): this { this._limit = n; return this; }
  offset(n: number): this { this._offset = n; return this; }

  orderBy(column: keyof T, direction: "ASC" | "DESC" = "ASC"): this {
    this._orderBy = { column, direction };
    return this;
  }

  build(): string {
    const cols = this._columns.length > 0 ? this._columns.join(", ") : "*";
    let query = `SELECT ${cols} FROM ${this._table}`;
    if (this._conditions.length > 0) query += ` WHERE ${this._conditions.join(" AND ")}`;
    if (this._orderBy) query += ` ORDER BY ${String(this._orderBy.column)} ${this._orderBy.direction}`;
    if (this._limit !== undefined) query += ` LIMIT ${this._limit}`;
    if (this._offset !== undefined) query += ` OFFSET ${this._offset}`;
    return query;
  }
}

interface User { id: number; name: string; email: string; active: boolean; createdAt: Date }

const query = QueryBuilder.for<User>("users")
  .select("id", "name", "email")
  .where("active = true")
  .where("createdAt > '2024-01-01'")
  .orderBy("name", "ASC")
  .limit(25)
  .build();

// ─────────────────────────────────────────────
// 2. FLUENT API / METHOD CHAINING
// ─────────────────────────────────────────────

// Use 'this' return type for inheritable fluent APIs
class Validator<T> {
  protected value: T;
  protected errors: string[] = [];

  constructor(value: T) {
    this.value = value;
  }

  addRule(predicate: (val: T) => boolean, message: string): this {
    if (!predicate(this.value)) this.errors.push(message);
    return this; // 'this' returns the correct subclass type!
  }

  isValid(): boolean { return this.errors.length === 0; }
  getErrors(): string[] { return [...this.errors]; }
  getResult(): { valid: boolean; errors: string[] } {
    return { valid: this.isValid(), errors: this.getErrors() };
  }
}

class StringValidator extends Validator<string> {
  minLength(n: number): this {
    return this.addRule(v => v.length >= n, `Minimum length is ${n}`);
  }
  maxLength(n: number): this {
    return this.addRule(v => v.length <= n, `Maximum length is ${n}`);
  }
  matches(pattern: RegExp): this {
    return this.addRule(v => pattern.test(v), `Must match ${pattern}`);
  }
  email(): this {
    return this.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }
  noWhitespace(): this {
    return this.addRule(v => !v.includes(" "), "No whitespace allowed");
  }
}

const emailResult = new StringValidator("alice@example.com")
  .minLength(5)
  .maxLength(100)
  .email()
  .getResult();

// ─────────────────────────────────────────────
// 3. OBSERVER PATTERN WITH TYPED EVENTS
// ─────────────────────────────────────────────

type Observer<T> = (event: T) => void;

class Observable<T> {
  private observers: Set<Observer<T>> = new Set();

  subscribe(observer: Observer<T>): () => void {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }

  notify(event: T): void {
    this.observers.forEach(obs => obs(event));
  }
}

type UserEvent =
  | { type: "created"; user: User }
  | { type: "updated"; userId: number; changes: Partial<User> }
  | { type: "deleted"; userId: number };

const userEvents = new Observable<UserEvent>();

const unsubscribe = userEvents.subscribe(event => {
  switch (event.type) {
    case "created":  console.log("New user:", event.user.name); break;
    case "updated":  console.log("Updated user:", event.userId); break;
    case "deleted":  console.log("Deleted user:", event.userId); break;
  }
});

// ─────────────────────────────────────────────
// 4. PROXY PATTERN FOR VALIDATION
// ─────────────────────────────────────────────

type Schema<T> = {
  [K in keyof T]: (value: T[K]) => boolean;
};

function createValidatedProxy<T extends object>(target: T, schema: Partial<Schema<T>>): T {
  return new Proxy(target, {
    set(obj, prop, value) {
      const key = prop as keyof T;
      const validator = schema[key];
      if (validator && !validator(value)) {
        throw new TypeError(`Invalid value for ${String(prop)}: ${JSON.stringify(value)}`);
      }
      (obj as any)[prop] = value;
      return true;
    }
  });
}

const userProxy = createValidatedProxy<User>(
  { id: 1, name: "Alice", email: "a@a.com", active: true, createdAt: new Date() },
  {
    name: v => v.length >= 2,
    email: v => v.includes("@"),
  }
);

// userProxy.name = "A"; // ❌ Throws: Invalid value for name
userProxy.name = "Bob"; // ✅

// ─────────────────────────────────────────────
// 5. DEPENDENCY INJECTION CONTAINER
// ─────────────────────────────────────────────

type Token<T> = { readonly __type: T; readonly name: string };

function createToken<T>(name: string): Token<T> {
  return { name } as Token<T>;
}

class Container {
  private bindings = new Map<Token<any>, () => any>();

  bind<T>(token: Token<T>, factory: () => T): this {
    this.bindings.set(token, factory);
    return this;
  }

  singleton<T>(token: Token<T>, factory: () => T): this {
    let instance: T;
    return this.bind(token, () => {
      if (!instance) instance = factory();
      return instance;
    });
  }

  resolve<T>(token: Token<T>): T {
    const factory = this.bindings.get(token);
    if (!factory) throw new Error(`No binding for token: ${token.name}`);
    return factory();
  }
}

// Define tokens
const DB_TOKEN      = createToken<Database>("database");
const USER_SVC_TOKEN = createToken<UserService>("userService");

interface Database { query<T>(sql: string): Promise<T[]> }
interface UserService { getUser(id: number): Promise<User> }

const container = new Container();
container
  .singleton(DB_TOKEN, (): Database => ({
    query: async <T>(sql: string): Promise<T[]> => {
      console.log("Executing:", sql);
      return [] as T[];
    }
  }))
  .bind(USER_SVC_TOKEN, (): UserService => {
    const db = container.resolve(DB_TOKEN);
    return {
      getUser: async (id: number): Promise<User> => {
        const [user] = await db.query<User>(`SELECT * FROM users WHERE id = ${id}`);
        return user;
      }
    };
  });

// ─────────────────────────────────────────────
// 6. OPAQUE TYPES / BRANDED TYPES
// ─────────────────────────────────────────────

declare const brand: unique symbol;
type Brand<T, TBrand> = T & { readonly [brand]: TBrand };

type UserId    = Brand<number, "UserId">;
type ProductId = Brand<string, "ProductId">;
type Email     = Brand<string, "Email">;

// Constructors enforce the brand
function userId(id: number): UserId {
  if (!Number.isInteger(id) || id <= 0) throw new Error("Invalid user ID");
  return id as UserId;
}

function productId(id: string): ProductId {
  if (!id.startsWith("PROD-")) throw new Error("Invalid product ID");
  return id as ProductId;
}

function email(value: string): Email {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error("Invalid email");
  return value as Email;
}

function getUser(id: UserId): User | null { return null; }
function getProduct(id: ProductId): User | null { return null; }

const uid = userId(123);
// getUser(123);       // ❌ number not assignable to UserId
// getUser(productId("PROD-1")); // ❌ ProductId not assignable to UserId
getUser(uid);          // ✅

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Implement a type-safe StateMachine<States, Events> that:
// - Only allows valid transitions
// - Types the context data for each state
// - Provides current() and send() methods

// Exercise 2:
// Build a type-safe curry function that preserves all argument and return types.

// Exercise 3:
// Create a 'Proxy<T>' wrapper that makes all properties lazy
// (computed on first access, then cached).

// Exercise 4:
// Implement a type-safe pub/sub bus where:
// - Topics are defined in an interface
// - Subscribers get correctly typed payloads
// - Publishers are type-checked against the schema

// Exercise 5:
// Write a fully typed memoize function that:
// - Caches by argument identity
// - Supports TTL expiration
// - Has a maxSize option
