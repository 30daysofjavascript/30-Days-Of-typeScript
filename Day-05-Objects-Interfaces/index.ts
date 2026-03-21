// ============================================================
// 🚀 DAY 05 — Objects & Interfaces
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. INLINE OBJECT TYPES
// ─────────────────────────────────────────────

// Inline type annotation for one-off objects
let user: { name: string; age: number; email: string } = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
};

// Reusable? Use an interface instead (see below)

// ─────────────────────────────────────────────
// 2. INTERFACES — The Primary Tool for Object Shapes
// ─────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const alice: User = { id: 1, name: "Alice", email: "a@a.com", age: 30 };

// ─────────────────────────────────────────────
// 3. OPTIONAL PROPERTIES (?)
// ─────────────────────────────────────────────

interface UserProfile {
  id: number;
  name: string;
  email: string;
  bio?: string;         // optional — may or may not exist
  website?: string;
  avatar?: string;
}

const minimalUser: UserProfile = { id: 1, name: "Bob", email: "b@b.com" }; // ✅
const fullUser: UserProfile = {
  id: 2, name: "Carol", email: "c@c.com",
  bio: "Developer", website: "carol.dev",
};

// TypeScript knows bio could be undefined
function displayBio(profile: UserProfile): string {
  return profile.bio ?? "No bio provided"; // handle potentially undefined
}

// ─────────────────────────────────────────────
// 4. READONLY PROPERTIES
// Prevent modification after object creation
// ─────────────────────────────────────────────

interface Config {
  readonly apiKey: string;
  readonly baseUrl: string;
  timeout: number;       // mutable
}

const config: Config = {
  apiKey: "secret-key",
  baseUrl: "https://api.example.com",
  timeout: 5000,
};

config.timeout = 10000;   // ✅ mutable property
// config.apiKey = "new";  // ❌ Cannot assign to 'apiKey' because it is read-only

// ─────────────────────────────────────────────
// 5. METHOD SIGNATURES IN INTERFACES
// ─────────────────────────────────────────────

interface Calculator {
  // Method signature syntax 1: method shorthand
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;

  // Method signature syntax 2: property with function type
  multiply: (a: number, b: number) => number;

  // Optional method
  divide?: (a: number, b: number) => number;
}

const calc: Calculator = {
  add:      (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide:   (a, b) => a / b,
};

// ─────────────────────────────────────────────
// 6. INTERFACE EXTENSION (Inheritance)
// Build new interfaces by extending existing ones
// ─────────────────────────────────────────────

interface Animal {
  name: string;
  age: number;
}

interface Pet extends Animal {
  owner: string;
  vaccinated: boolean;
}

interface Dog extends Pet {
  breed: string;
  trained: boolean;
}

const myDog: Dog = {
  name: "Rex",
  age: 3,
  owner: "Alice",
  vaccinated: true,
  breed: "Labrador",
  trained: false,
};

// Extend multiple interfaces
interface Flyable { fly(): void; }
interface Swimmable { swim(): void; }

interface Duck extends Animal, Flyable, Swimmable {
  quack(): void;
}

// ─────────────────────────────────────────────
// 7. INTERFACE MERGING (Declaration Merging)
// Multiple interface declarations with same name are MERGED
// ─────────────────────────────────────────────

interface Window {
  myCustomProp: string; // Adding to the global Window type
}

// This is how TypeScript libraries extend built-in types!
// The two Window declarations are merged automatically.

interface Plugin {
  name: string;
}
interface Plugin {         // Merges with the first declaration
  version: string;
  init(): void;
}
// Now Plugin requires: { name, version, init }

// ─────────────────────────────────────────────
// 8. NESTED INTERFACES & OBJECTS
// ─────────────────────────────────────────────

interface Address {
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface Company {
  id: number;
  name: string;
  address: Address;         // nested interface
  employees: Employee[];    // array of interface
  ceo?: Employee;           // optional nested
}

interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  manager?: Employee;       // recursive — employee can have a manager
}

const company: Company = {
  id: 1,
  name: "Acme Corp",
  address: {
    street: "123 Main St",
    city: "Anytown",
    country: "US",
    postalCode: "12345",
  },
  employees: [
    { id: 1, name: "Alice", department: "Engineering", salary: 120000 },
    { id: 2, name: "Bob",   department: "Sales",       salary: 80000 },
  ],
};

// ─────────────────────────────────────────────
// 9. INTERFACE vs TYPE ALIAS — Key Differences
// ─────────────────────────────────────────────

// INTERFACE:
interface IUser { name: string; age: number; }

// TYPE ALIAS:
type TUser = { name: string; age: number; };

// For objects, they're mostly interchangeable, BUT:

// 1. Interfaces can be EXTENDED (inheritance)
interface Admin extends IUser { role: string; }

// 2. Type aliases can't be re-opened; interfaces can be merged
// interface IUser { role: string; } // ✅ merges with above
// type TUser = { name: string } & { role: string }; // must use & for types

// 3. Type aliases can represent ANYTHING (primitives, unions, tuples)
type ID       = string | number;     // ← can't do this with interface
type Pair<T>  = [T, T];              // ← tuple type
type Callback = (err: Error | null) => void; // ← function type

// RECOMMENDATION:
// - Use interface for object shapes (classes, API responses)
// - Use type for unions, primitives, tuples, function types
// - Be consistent in your codebase

// ─────────────────────────────────────────────
// 10. INDEX SIGNATURES (preview — Day 23 in depth)
// When an object can have dynamic keys
// ─────────────────────────────────────────────

interface StringMap {
  [key: string]: string; // any string key → string value
}

const translations: StringMap = {
  hello: "Hola",
  world: "Mundo",
  goodbye: "Adiós",
};
// translations["newKey"] = "value"; // ✅ dynamic keys allowed

// Combined with known properties
interface HeaderMap {
  [key: string]: string;
  "Content-Type": string;  // required header
  "Authorization"?: string; // optional specific header
}

// ─────────────────────────────────────────────
// 11. FUNCTION TYPES IN INTERFACES
// ─────────────────────────────────────────────

interface Validator<T> {
  validate(value: T): boolean;
  errorMessage: string;
  transform?(value: T): T; // optional transformer
}

const emailValidator: Validator<string> = {
  errorMessage: "Invalid email format",
  validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
};

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Create interfaces for a library system:
// Book: title, author, isbn, year, available (boolean), genre (optional)
// Member: id, name, email, borrowedBooks (Book[])
// Library: name, books (Book[]), members (Member[])
//   with methods: addBook, removeBook, lendBook, returnBook

// Exercise 2:
// Create a Vehicle interface, then extend it into Car, Truck, Motorcycle.
// Each should have appropriate unique properties.

// Exercise 3:
// Create a generic interface Repository<T> with:
// findById(id: number): T | null
// findAll(): T[]
// create(item: Omit<T, 'id'>): T
// update(id: number, updates: Partial<T>): T | null
// delete(id: number): boolean

// Exercise 4:
// Use interface merging to add a custom 'appState' property to Window

// Exercise 5:
// When would you use interface vs type alias?
// Give 3 examples where each is the better choice.
