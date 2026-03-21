// ============================================================
// 🚀 DAY 23 — Index Signatures & Records
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. INDEX SIGNATURES — Dynamic Keys
// When you don't know all the keys ahead of time
// ─────────────────────────────────────────────

// String index signature: any string key → value type
interface StringMap {
  [key: string]: string;
}

const translations: StringMap = {
  hello: "Hola",
  world: "Mundo",
  goodbye: "Adiós",
};
translations["newKey"] = "value"; // ✅ dynamic addition allowed
const val: string = translations["anything"]; // ✅ always string

// Number index signature: any number key → value type
interface NumberedList {
  [index: number]: string;
}
const list: NumberedList = { 0: "zero", 1: "one", 2: "two" };

// ─────────────────────────────────────────────
// 2. INDEX SIGNATURES WITH KNOWN PROPERTIES
// ─────────────────────────────────────────────

interface WithKnownKeys {
  [key: string]: string | number;  // index signature
  id: number;                       // ✅ number is in string | number
  name: string;                     // ✅ string is in string | number
  // active: boolean;               // ❌ boolean NOT in string | number
}

// All known properties must conform to the index signature type!

// Better pattern: separate known from dynamic
interface UserAttributes {
  id: number;
  name: string;
  metadata: Record<string, unknown>; // dynamic part is isolated
}

// ─────────────────────────────────────────────
// 3. RECORD<K, V> — Typed Object
// Cleaner alternative to index signatures when keys are known
// ─────────────────────────────────────────────

// Record<Keys, ValueType>
type ColorMap = Record<string, string>;
const colors: ColorMap = { red: "#FF0000", blue: "#0000FF" };

// Record with union key type (exhaustive — all keys required)
type StatusCount = Record<"active" | "inactive" | "deleted", number>;
const counts: StatusCount = { active: 100, inactive: 25, deleted: 5 };
// Must provide ALL three keys!

// Record with complex value type
type UserCache = Record<string, { user: User2; fetchedAt: Date }>;

interface User2 { id: number; name: string; }

const cache: UserCache = {
  "user-1": { user: { id: 1, name: "Alice" }, fetchedAt: new Date() },
};

// ─────────────────────────────────────────────
// 4. PARTIAL RECORD — Not All Keys Required
// ─────────────────────────────────────────────

type PartialStatusMap = Partial<Record<"active" | "inactive" | "deleted", number>>;
// { active?: number; inactive?: number; deleted?: number }

// ─────────────────────────────────────────────
// 5. USING keyof WITH INDEX SIGNATURES
// ─────────────────────────────────────────────

function getValueByKey<T>(obj: T, key: keyof T): T[keyof T] {
  return obj[key];
}

// Type-safe key access
function safeGet<T extends Record<string, unknown>>(
  obj: T,
  key: string
): unknown {
  return obj[key];
}

// Assert a key exists before accessing
function requireKey<T extends object, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  if (!(key in obj)) throw new Error(`Key "${String(key)}" not found`);
  return obj[key];
}

// ─────────────────────────────────────────────
// 6. READONLY RECORDS
// ─────────────────────────────────────────────

// Readonly prevents modification
type ReadonlyColorMap = Readonly<Record<string, string>>;
const frozenColors: ReadonlyColorMap = { red: "#FF0000" };
// frozenColors.blue = "#0000FF"; // ❌ readonly

// ReadonlyRecord utility type
type ReadonlyRecord<K extends string | number | symbol, V> = {
  readonly [P in K]: V;
};

// ─────────────────────────────────────────────
// 7. MAPPED TYPES AS RECORDS
// ─────────────────────────────────────────────

type Keys = "name" | "email" | "age";

// All fields required (like Record<Keys, string>)
type RequiredForm = { [K in Keys]: string };

// Some fields optional
type OptionalForm = { [K in Keys]?: string };

// Mixed — some required, some optional
type MixedForm = { [K in Keys]: K extends "name" ? string : string | undefined };

// ─────────────────────────────────────────────
// 8. PRACTICAL PATTERNS WITH RECORDS
// ─────────────────────────────────────────────

// Config registry
type PluginConfig = Record<string, {
  enabled: boolean;
  options: Record<string, unknown>;
}>;

// Route handlers
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type RouteHandler = (req: { params: Record<string, string>; body: unknown }) => unknown;
type Router = Partial<Record<HttpMethod, Record<string, RouteHandler>>>;

const router: Router = {
  GET: {
    "/users":      () => ({ users: [] }),
    "/users/:id":  (req) => ({ id: req.params.id }),
  },
  POST: {
    "/users": (req) => ({ created: req.body }),
  }
};

// Translation table
type Locale = "en" | "es" | "fr" | "de";
type TranslationTable = Record<string, Record<Locale, string>>;

const i18n: TranslationTable = {
  greeting: { en: "Hello", es: "Hola",  fr: "Bonjour",  de: "Hallo" },
  farewell: { en: "Bye",   es: "Adiós", fr: "Au revoir", de: "Tschüss" },
};

function translate(key: string, locale: Locale): string {
  return i18n[key]?.[locale] ?? key;
}
console.log(translate("greeting", "es")); // "Hola"

// Enum-to-label mapping (common pattern)
enum Status { Active = "ACTIVE", Inactive = "INACTIVE", Pending = "PENDING" }

const STATUS_LABELS: Record<Status, string> = {
  [Status.Active]:   "Active User",
  [Status.Inactive]: "Inactive User",
  [Status.Pending]:  "Pending Review",
};

// ─────────────────────────────────────────────
// 9. WEAKLY TYPED vs STRONGLY TYPED RECORDS
// ─────────────────────────────────────────────

// Weakly typed (too loose)
const weakMap: Record<string, any> = {};  // any defeats TypeScript!

// Moderately typed (better)
const mediumMap: Record<string, unknown> = {}; // must check before use

// Strongly typed (best)
const strongMap: Record<string, { count: number; label: string }> = {};

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Create a type-safe in-memory store using Record:
// class Store<T extends {id: string}> using Record<string, T>

// Exercise 2:
// Create a type 'RequiredRecord<K extends string, V>' where
// ALL keys from K must be present (non-partial Record).

// Exercise 3:
// Write a 'mapRecord<K extends string, V, U>(
//   record: Record<K, V>,
//   fn: (value: V, key: K) => U
// ): Record<K, U>'

// Exercise 4:
// Build a type-safe feature flag system:
// type Flags = { darkMode: boolean; betaFeatures: boolean; ... }
// const flags: Flags = createFlags({ ...defaults, ...overrides })

// Exercise 5:
// Create a 'RecordProxy<T>' that intercepts reads/writes to
// a Record using Proxy and logs all access.
