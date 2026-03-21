// ============================================================
// 🚀 DAY 18 — Template Literal Types
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================
// Template literal types combine string literal types using
// the same backtick syntax as template strings.

// ─────────────────────────────────────────────
// 1. BASIC TEMPLATE LITERAL TYPES
// ─────────────────────────────────────────────

type World = "world";
type Greeting = `hello ${World}`; // "hello world"

type EventName = "click" | "focus" | "blur";
type EventHandler = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur"

type CSSProperty = `--${string}`; // CSS custom property
const myProp: CSSProperty = "--primary-color"; // ✅
// const bad: CSSProperty = "color"; // ❌

// ─────────────────────────────────────────────
// 2. DISTRIBUTION OVER UNIONS
// Template literal types distribute over union members
// ─────────────────────────────────────────────

type Color  = "red" | "green" | "blue";
type Size   = "sm" | "md" | "lg";

type ColoredSize  = `${Color}-${Size}`;
// "red-sm" | "red-md" | "red-lg" | "green-sm" | ...

type Button = `btn-${Color}`; // "btn-red" | "btn-green" | "btn-blue"

// Generate all getter/setter names
type Field = "name" | "email" | "age";
type Getters = `get${Capitalize<Field>}`; // "getName" | "getEmail" | "getAge"
type Setters = `set${Capitalize<Field>}`; // "setName" | "setEmail" | "setAge"

// ─────────────────────────────────────────────
// 3. INTRINSIC STRING MANIPULATION TYPES
// ─────────────────────────────────────────────

type Up    = Uppercase<"hello world">;    // "HELLO WORLD"
type Down  = Lowercase<"HELLO WORLD">;    // "hello world"
type Cap   = Capitalize<"hello world">;   // "Hello world"
type Uncap = Uncapitalize<"Hello World">; // "hello World"

// Combine with template literals
type TableName<T extends string>  = `${Lowercase<T>}s`;
type TypeName2<T extends string>  = `${Capitalize<T>}Type`;
type EventKey<T extends string>   = `on${Capitalize<T>}`;

type UserTable = TableName<"User">;  // "users"
type UserType  = TypeName2<"user">;  // "UserType"
type ClickKey  = EventKey<"click">; // "onClick"

// ─────────────────────────────────────────────
// 4. EXTRACTING PARTS OF STRINGS WITH infer
// ─────────────────────────────────────────────

// Extract the event name from handler name
type GetEventName<T extends string> =
  T extends `on${infer E}` ? Uncapitalize<E> : never;

type ClickEvent  = GetEventName<"onClick">;  // "click"
type ChangeEvent = GetEventName<"onChange">; // "change"
type Invalid     = GetEventName<"button">;   // never

// Extract prefix and suffix
type SplitAt<T extends string, Sep extends string> =
  T extends `${infer Before}${Sep}${infer After}`
    ? { before: Before; after: After }
    : never;

type Split = SplitAt<"hello_world", "_">;
// { before: "hello"; after: "world" }

// Extract path parameters from URL strings
type ExtractParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<`/${Rest}`>
    : T extends `${string}:${infer Param}`
      ? Param
      : never;

type RouteParams = ExtractParams<"/users/:userId/posts/:postId">;
// "userId" | "postId"

// ─────────────────────────────────────────────
// 5. BUILDING TYPE-SAFE APIs WITH TEMPLATE LITERALS
// ─────────────────────────────────────────────

// Type-safe CSS class builder
type Breakpoint   = "sm" | "md" | "lg" | "xl";
type FlexAlign    = "start" | "center" | "end" | "stretch";
type FlexJustify  = "start" | "center" | "end" | "between" | "around";

type FlexClass =
  | `flex-${FlexAlign}`
  | `justify-${FlexJustify}`
  | `${Breakpoint}:flex-${FlexAlign}`;

const cls: FlexClass = "flex-center";          // ✅
const cls2: FlexClass = "md:flex-start";       // ✅
// const cls3: FlexClass = "xl:flex-invalid";  // ❌

// Type-safe event system
type EventMap = {
  userCreated: { id: number; name: string };
  userDeleted: { id: number };
  orderPlaced: { orderId: string; total: number };
};

type EventKeys = keyof EventMap; // "userCreated" | "userDeleted" | "orderPlaced"
type EventPrefixed = `event:${EventKeys}`;
// "event:userCreated" | "event:userDeleted" | "event:orderPlaced"

// Type-safe i18n key paths
type TranslationKeys = {
  nav: { home: string; about: string; contact: string };
  error: { notFound: string; serverError: string };
};

type DotPath<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends object
    ? DotPath<T[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`;
}[keyof T & string];

type TranslationKey = DotPath<TranslationKeys>;
// "nav.home" | "nav.about" | "nav.contact" | "error.notFound" | "error.serverError"

// ─────────────────────────────────────────────
// 6. DEEP PATH ACCESS WITH TEMPLATE LITERALS
// ─────────────────────────────────────────────

// Access nested object via dot-notation string path
type DeepGet<T, Path extends string> =
  Path extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? DeepGet<T[Key], Rest>
      : never
    : Path extends keyof T
      ? T[Path]
      : never;

type Config = {
  server: { host: string; port: number };
  database: { url: string };
};

type Host = DeepGet<Config, "server.host">; // string
type Port = DeepGet<Config, "server.port">; // number
type URL  = DeepGet<Config, "database.url">; // string

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Create a type 'SnakeCase<T extends string>' that converts
// "CamelCase" → "camel_case". Test with "UserProfile", "getFirstName".

// Exercise 2:
// Create a type 'APIRoute<T extends string>' that prefixes with "/api/v1/":
// APIRoute<"users"> → "/api/v1/users"

// Exercise 3:
// Build a type-safe SQL query builder type:
// type SelectQuery<T extends object, Cols extends keyof T & string>
// that creates "SELECT col1, col2 FROM table" strings.

// Exercise 4:
// Create 'SplitString<S, Sep>' that splits "a.b.c" by "." into ["a","b","c"].

// Exercise 5:
// Create a 'Join<T extends string[], Sep extends string>' that
// does the opposite: ["a","b","c"] joined by "." → "a.b.c"
