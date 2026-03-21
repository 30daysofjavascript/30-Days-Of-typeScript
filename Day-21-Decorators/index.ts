// ============================================================
// 🚀 DAY 21 — Decorators
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================
// Decorators are a Stage 3 TC39 proposal, available in TypeScript
// with "experimentalDecorators": true in tsconfig.json.
// Two flavors: Legacy (TS 4.x) and Modern (TS 5.x / Stage 3).
// This file covers BOTH.

// ─────────────────────────────────────────────
// 1. WHAT ARE DECORATORS?
// Special functions that can modify classes, methods,
// properties, or parameters at definition time.
// Syntax: @decoratorName before the declaration
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// 2. CLASS DECORATOR
// Receives the class constructor
// ─────────────────────────────────────────────

// Adds a timestamp to class instances
function Timestamped<T extends { new (...args: any[]): {} }>(Constructor: T) {
  return class extends Constructor {
    createdAt = new Date();
    updatedAt = new Date();
  };
}

// Seals the class (no new properties can be added after creation)
function Sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// Singleton pattern via decorator
function Singleton<T extends { new (...args: any[]): {} }>(Constructor: T) {
  let instance: InstanceType<T>;
  return class extends Constructor {
    constructor(...args: any[]) {
      super(...args);
      if (instance) return instance;
      instance = this as any;
    }
  };
}

@Timestamped
@Sealed
class User {
  constructor(public name: string, public email: string) {}
}

const u1 = new User("Alice", "alice@example.com");
// u1.createdAt; // Date — added by @Timestamped

// ─────────────────────────────────────────────
// 3. METHOD DECORATOR
// Receives: target, propertyKey, descriptor
// ─────────────────────────────────────────────

// Log method calls
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`[LOG] ${propertyKey} called with:`, args);
    const result = original.apply(this, args);
    console.log(`[LOG] ${propertyKey} returned:`, result);
    return result;
  };
  return descriptor;
}

// Measure execution time
function Timer(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = original.apply(this, args);
    const end = performance.now();
    console.log(`[TIMER] ${propertyKey} took ${(end - start).toFixed(2)}ms`);
    return result;
  };
  return descriptor;
}

// Retry on failure
function Retry(times: number = 3, delay: number = 1000) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      for (let attempt = 1; attempt <= times; attempt++) {
        try {
          return await original.apply(this, args);
        } catch (error) {
          if (attempt === times) throw error;
          console.log(`[RETRY] ${propertyKey} attempt ${attempt} failed, retrying...`);
          await new Promise(r => setTimeout(r, delay * attempt));
        }
      }
    };
    return descriptor;
  };
}

// Deprecated warning
function Deprecated(message: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.warn(`⚠️ DEPRECATED: ${propertyKey} — ${message}`);
      return original.apply(this, args);
    };
    return descriptor;
  };
}

class UserService {
  @Log
  @Timer
  findUser(id: number): { id: number; name: string } {
    return { id, name: "Alice" };
  }

  @Retry(3, 500)
  async fetchFromAPI(url: string): Promise<unknown> {
    const res = await fetch(url);
    return res.json();
  }

  @Deprecated("Use findUser() instead")
  getUser(id: number) {
    return this.findUser(id);
  }
}

// ─────────────────────────────────────────────
// 4. PROPERTY DECORATOR
// ─────────────────────────────────────────────

// Validate on assignment
function Min(minValue: number) {
  return function (target: any, propertyKey: string) {
    let value: number;
    Object.defineProperty(target, propertyKey, {
      get() { return value; },
      set(newValue: number) {
        if (newValue < minValue) {
          throw new RangeError(`${propertyKey} must be >= ${minValue}`);
        }
        value = newValue;
      },
      enumerable: true,
      configurable: true,
    });
  };
}

function Required2(target: any, propertyKey: string) {
  let value: any;
  Object.defineProperty(target, propertyKey, {
    get() { return value; },
    set(newValue: any) {
      if (newValue === null || newValue === undefined || newValue === "") {
        throw new TypeError(`${propertyKey} is required`);
      }
      value = newValue;
    },
    enumerable: true,
    configurable: true,
  });
}

class Product {
  @Required2
  name!: string;

  @Min(0)
  price!: number;

  @Min(0)
  stock!: number;
}

// ─────────────────────────────────────────────
// 5. PARAMETER DECORATOR
// ─────────────────────────────────────────────

const PARAMS_KEY = Symbol("validatedParams");

function Validate(target: any, methodName: string, paramIndex: number) {
  const existing: number[] = Reflect.getOwnMetadata(PARAMS_KEY, target, methodName) || [];
  existing.push(paramIndex);
  Reflect.defineMetadata(PARAMS_KEY, existing, target, methodName);
}

function ValidateParams(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const validatedIndices: number[] = Reflect.getOwnMetadata(PARAMS_KEY, target, methodName) || [];
    validatedIndices.forEach(idx => {
      if (args[idx] === null || args[idx] === undefined) {
        throw new TypeError(`Parameter at index ${idx} in ${methodName} cannot be null/undefined`);
      }
    });
    return original.apply(this, args);
  };
}

// ─────────────────────────────────────────────
// 6. DECORATOR FACTORIES (decorators with arguments)
// ─────────────────────────────────────────────

// Role-based access control
function RequireRole(...roles: string[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const currentUser = (this as any).currentUser;
      if (!currentUser || !roles.some(r => currentUser.roles.includes(r))) {
        throw new Error(`Access denied. Required roles: ${roles.join(", ")}`);
      }
      return original.apply(this, args);
    };
    return descriptor;
  };
}

// Cache results
function Memoize(ttl: number = 60000) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const cache = new Map<string, { value: any; expiry: number }>();
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args);
      const cached = cache.get(key);
      if (cached && Date.now() < cached.expiry) return cached.value;
      const result = original.apply(this, args);
      cache.set(key, { value: result, expiry: Date.now() + ttl });
      return result;
    };
    return descriptor;
  };
}

class AdminService {
  private currentUser = { roles: ["admin"] };

  @RequireRole("admin", "superadmin")
  deleteUser(id: number): void {
    console.log(`Deleting user ${id}`);
  }

  @Memoize(30000)
  @Timer
  getStats(): Record<string, number> {
    return { users: 1000, orders: 5000 }; // expensive computation
  }
}

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Create a @Readonly class decorator that freezes all instances.

// Exercise 2:
// Create a @Throttle(ms) method decorator that prevents
// a method from being called more than once per N milliseconds.

// Exercise 3:
// Create a @Transform(fn) property decorator that runs a
// transformation function whenever the property is set.

// Exercise 4:
// Build a @Injectable() decorator for a simple DI system that
// registers classes in a container so they can be injected.

// Exercise 5:
// Create a @Validate decorator that reads validation rules
// from method parameter decorators and enforces them.
