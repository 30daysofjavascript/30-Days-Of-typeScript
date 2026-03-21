// ============================================================
// 🚀 DAY 22 — Mixins & Abstract Classes
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. ABSTRACT CLASSES — FULL COVERAGE
// ─────────────────────────────────────────────

abstract class Repository<T extends { id: number }> {
  protected abstract tableName: string;
  protected items: T[] = [];

  // Abstract methods — subclasses MUST implement
  abstract validate(item: Omit<T, "id">): boolean;
  abstract serialize(item: T): string;

  // Concrete methods — shared implementation
  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  findAll(filter?: Partial<T>): T[] {
    if (!filter) return [...this.items];
    return this.items.filter(item =>
      Object.entries(filter).every(([key, val]) => item[key as keyof T] === val)
    );
  }

  create(data: Omit<T, "id">): T {
    if (!this.validate(data)) throw new Error("Validation failed");
    const id = Math.max(0, ...this.items.map(i => i.id)) + 1;
    const item = { ...data, id } as T;
    this.items.push(item);
    return item;
  }

  update(id: number, updates: Partial<Omit<T, "id">>): T | null {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) return null;
    this.items[idx] = { ...this.items[idx], ...updates };
    return this.items[idx];
  }

  delete(id: number): boolean {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) return false;
    this.items.splice(idx, 1);
    return true;
  }

  count(): number { return this.items.length; }
}

interface User { id: number; name: string; email: string; active: boolean }
interface Post { id: number; title: string; content: string; userId: number }

class UserRepository extends Repository<User> {
  protected tableName = "users";

  validate(user: Omit<User, "id">): boolean {
    return user.name.length >= 2 && user.email.includes("@");
  }

  serialize(user: User): string { return JSON.stringify(user); }

  findActive(): User[] { return this.findAll({ active: true }); }
}

class PostRepository extends Repository<Post> {
  protected tableName = "posts";

  validate(post: Omit<Post, "id">): boolean {
    return post.title.length > 0 && post.content.length > 0;
  }

  serialize(post: Post): string { return JSON.stringify(post); }

  findByUser(userId: number): Post[] { return this.findAll({ userId }); }
}

// ─────────────────────────────────────────────
// 2. WHAT ARE MIXINS?
// Mixins share behavior across multiple class hierarchies.
// JavaScript supports single inheritance, but mixins let
// you "mix in" capabilities from multiple sources.
// ─────────────────────────────────────────────

// A mixin is a function that takes a class and returns
// a new class with added behavior.
type Constructor<T = {}> = new (...args: any[]) => T;

// ─────────────────────────────────────────────
// 3. CREATING MIXINS
// ─────────────────────────────────────────────

// Timestamp mixin — adds createdAt/updatedAt
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    touch(): void {
      this.updatedAt = new Date();
    }
  };
}

// Activatable mixin — adds active status
function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActive: boolean = false;

    activate(): void   { this.isActive = true; }
    deactivate(): void { this.isActive = false; }
    toggle(): void     { this.isActive = !this.isActive; }
  };
}

// Serializable mixin
function Serializable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    serialize(): string {
      return JSON.stringify(this);
    }

    static deserialize<T>(this: new (...args: any[]) => T, data: string): T {
      return Object.assign(new this(), JSON.parse(data));
    }
  };
}

// Loggable mixin
function Loggable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    private _log: { message: string; timestamp: Date }[] = [];

    log(message: string): void {
      const entry = { message, timestamp: new Date() };
      this._log.push(entry);
      console.log(`[${entry.timestamp.toISOString()}] ${message}`);
    }

    getLog(): { message: string; timestamp: Date }[] {
      return [...this._log];
    }

    clearLog(): void { this._log = []; }
  };
}

// Validatable mixin with rules
function Validatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    private _errors: Record<string, string[]> = {};

    addError(field: string, message: string): void {
      if (!this._errors[field]) this._errors[field] = [];
      this._errors[field].push(message);
    }

    getErrors(): Record<string, string[]> { return { ...this._errors }; }
    clearErrors(): void { this._errors = {}; }
    isValid(): boolean   { return Object.keys(this._errors).length === 0; }

    hasError(field: string): boolean {
      return (this._errors[field]?.length ?? 0) > 0;
    }
  };
}

// ─────────────────────────────────────────────
// 4. COMPOSING MIXINS
// ─────────────────────────────────────────────

// Base class
class BaseEntity {
  constructor(public id: number) {}
}

// Apply multiple mixins
class UserModel extends Serializable(Loggable(Timestamped(Activatable(BaseEntity)))) {
  constructor(id: number, public name: string, public email: string) {
    super(id);
  }

  updateEmail(email: string): void {
    this.email = email;
    this.touch();    // from Timestamped
    this.log(`Email updated to: ${email}`); // from Loggable
  }
}

const user2 = new UserModel(1, "Alice", "alice@example.com");
user2.activate();
user2.updateEmail("newalice@example.com");
console.log(user2.serialize()); // from Serializable
console.log(user2.getLog());    // from Loggable

// ─────────────────────────────────────────────
// 5. MIXIN TYPES
// Properly type mixin return types
// ─────────────────────────────────────────────

// Get the instance type from a mixin
type TimestampedType = InstanceType<ReturnType<typeof Timestamped>>;
// Has: createdAt, updatedAt, touch()

// Use intersection to describe composited class
type UserModelType = BaseEntity
  & InstanceType<ReturnType<typeof Timestamped>>
  & InstanceType<ReturnType<typeof Activatable>>
  & InstanceType<ReturnType<typeof Loggable>>
  & InstanceType<ReturnType<typeof Serializable>>
  & { name: string; email: string; updateEmail(e: string): void };

// ─────────────────────────────────────────────
// 6. CONSTRAINED MIXINS
// Mixins that require a base class to have certain properties
// ─────────────────────────────────────────────

// This mixin requires the base class to have a 'name' property
interface Named { name: string; }
type NamedConstructor = Constructor<Named>;

function Greetable<TBase extends NamedConstructor>(Base: TBase) {
  return class extends Base {
    greet(): string {
      return `Hello! I'm ${this.name}`; // ✅ TypeScript knows 'name' exists
    }
    introduce(other: Named): string {
      return `${this.name}, meet ${other.name}!`;
    }
  };
}

class Person extends Greetable(class { constructor(public name: string) {} }) {
  constructor(name: string, public age: number) {
    super(name);
  }
}

const person = new Person("Alice", 30);
console.log(person.greet()); // "Hello! I'm Alice"

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Create a Cacheable mixin that stores method results in a Map
// and returns cached values for repeated calls with same args.

// Exercise 2:
// Create an Observable mixin that emits events when properties change:
// user.on("nameChange", (old, new) => console.log(...));

// Exercise 3:
// Build a Paginated mixin for a list class:
// this.page(n), this.nextPage(), this.prevPage(), this.totalPages

// Exercise 4:
// Create a SoftDeletable mixin:
// softDelete(): sets deletedAt
// restore(): clears deletedAt
// isDeleted: boolean property

// Exercise 5:
// Compose all mixins from this file into one mega-entity class
// and demonstrate all capabilities working together.
