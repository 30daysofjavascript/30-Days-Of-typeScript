// ============================================================
// 🚀 DAY 16 — Mapped Types
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================
// Mapped types create new types by iterating over the keys
// of an existing type and transforming each property.

// ─────────────────────────────────────────────
// 1. BASIC MAPPED TYPE SYNTAX
// { [K in keyof T]: transformation }
// ─────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

// Make all properties optional (recreating Partial<T>)
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// Make all properties required (recreating Required<T>)
type MyRequired<T> = {
  [K in keyof T]-?: T[K];  // -? removes the optional modifier
};

// Make all properties readonly (recreating Readonly<T>)
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Remove readonly (Mutable)
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];  // -readonly removes readonly modifier
};

// ─────────────────────────────────────────────
// 2. TRANSFORMING VALUE TYPES
// ─────────────────────────────────────────────

// Convert all values to string
type Stringify<T> = {
  [K in keyof T]: string;
};
type StringUser = Stringify<User>;
// { id: string; name: string; email: string; active: string }

// Convert all values to a specific type
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
type NullableUser = Nullable<User>;
// { id: number|null; name: string|null; ... }

// Wrap all values in an array
type Arrayed<T> = {
  [K in keyof T]: T[K][];
};

// Wrap all values in a Promise
type Promised<T> = {
  [K in keyof T]: Promise<T[K]>;
};

// ─────────────────────────────────────────────
// 3. FILTERING KEYS WITH CONDITIONAL TYPES
// ─────────────────────────────────────────────

// Keep only properties of a specific type
type PickByValue<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

type StringProps  = PickByValue<User, string>;        // { name: string; email: string }
type BooleanProps = PickByValue<User, boolean>;        // { active: boolean }
type NumberProps  = PickByValue<User, number>;         // { id: number }

// ─────────────────────────────────────────────
// 4. KEY REMAPPING WITH as (TypeScript 4.1+)
// Transform the key names, not just values
// ─────────────────────────────────────────────

// Add "get" prefix to all keys
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
//   getActive: () => boolean;
// }

// Add "set" prefix to all keys
type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

// Create both getters and setters
type Accessors<T> = Getters<T> & Setters<T>;

// ─────────────────────────────────────────────
// 5. FILTERING KEYS WITH KEY REMAPPING
// Map to never to exclude keys
// ─────────────────────────────────────────────

// Remove methods from an object type (keep only data properties)
type DataOnly<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

class UserClass {
  id: number = 0;
  name: string = "";
  greet(): string { return ""; }
  save(): void {}
}

type UserData = DataOnly<UserClass>;
// { id: number; name: string } — methods removed!

// ─────────────────────────────────────────────
// 6. RECURSIVE MAPPED TYPES
// ─────────────────────────────────────────────

// Deep readonly — every nested object is also readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Function
      ? T[K]                   // don't transform functions
      : DeepReadonly<T[K]>     // recurse into objects
    : T[K];
};

// Deep partial — every nested object has optional properties
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type Config = {
  server: { host: string; port: number };
  database: { url: string; pool: { min: number; max: number } };
  features: string[];
};

type ReadonlyConfig = DeepReadonly<Config>;
type PartialConfig  = DeepPartial<Config>;

// ─────────────────────────────────────────────
// 7. MAPPED TYPES WITH UNIONS
// ─────────────────────────────────────────────

// Create an event handler type from a list of events
type Events = "click" | "hover" | "focus" | "blur";

type EventHandlers = {
  [K in Events as `on${Capitalize<K>}`]?: (event: Event) => void;
};
// { onClick?: ..., onHover?: ..., onFocus?: ..., onBlur?: ... }

// Flags type — every string key maps to boolean
type Flags<T extends string> = {
  [K in T]: boolean;
};

type FeatureFlags = Flags<"darkMode" | "betaFeatures" | "notifications">;
// { darkMode: boolean; betaFeatures: boolean; notifications: boolean }

// ─────────────────────────────────────────────
// 8. PRACTICAL MAPPED TYPE PATTERNS
// ─────────────────────────────────────────────

// Validation schema — each field maps to a validator function
type ValidationSchema<T> = {
  [K in keyof T]: (value: T[K]) => string | null; // null = valid
};

type UserValidation = ValidationSchema<Pick<User, "name" | "email">>;
const userValidation: UserValidation = {
  name:  v => v.length < 2 ? "Too short" : null,
  email: v => !v.includes("@") ? "Invalid email" : null,
};

// Form state — each field has value, error, touched
type FormState<T> = {
  [K in keyof T]: {
    value: T[K];
    error: string | null;
    touched: boolean;
  };
};

// Diff — identify changed properties between two objects
type Diff<T> = {
  [K in keyof T]?: { from: T[K]; to: T[K] };
};

function diff<T extends object>(original: T, updated: T): Diff<T> {
  const result: Diff<T> = {};
  (Object.keys(original) as (keyof T)[]).forEach(key => {
    if (original[key] !== updated[key]) {
      result[key] = { from: original[key], to: updated[key] };
    }
  });
  return result;
}

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Create a mapped type 'ReadonlyDeep<T>' that makes ALL nested
// properties readonly including arrays (readonly T[]).

// Exercise 2:
// Create a 'StoreActions<T>' mapped type that generates:
// - set_<fieldName>(value: T[K]): void
// - get_<fieldName>(): T[K]
// for each property K in T.

// Exercise 3:
// Create a 'Builder<T>' mapped type where every method returns
// the Builder itself (for chaining), plus a build() method.

// Exercise 4:
// Create a 'Serialized<T>' mapped type that converts:
// - Date → string
// - Set<T> → T[]
// - Map<K,V> → [K,V][]
// - everything else → unchanged

// Exercise 5:
// Implement a 'FlipRecord<T extends Record<string,string>>' that
// swaps keys and values: FlipRecord<{a:"x", b:"y"}> → {x:"a", y:"b"}
