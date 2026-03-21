// ============================================================
// 🚀 DAY 09 — Enums
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. NUMERIC ENUMS (default)
// Members get auto-incremented numbers starting at 0
// ─────────────────────────────────────────────

enum Direction {
  North,  // 0
  South,  // 1
  East,   // 2
  West,   // 3
}

const dir: Direction = Direction.North;
console.log(dir);          // 0
console.log(Direction[0]); // "North" — reverse mapping!

// Custom starting value
enum Priority {
  Low    = 1,
  Medium = 2,
  High   = 3,
  Critical = 10,
}

// ─────────────────────────────────────────────
// 2. STRING ENUMS (preferred in modern code)
// Each member gets an explicit string value
// No reverse mapping, but values are readable
// ─────────────────────────────────────────────

enum Status {
  Pending   = "PENDING",
  Active    = "ACTIVE",
  Inactive  = "INACTIVE",
  Deleted   = "DELETED",
}

const userStatus: Status = Status.Active;
console.log(userStatus); // "ACTIVE" — readable!

enum HttpMethod {
  Get    = "GET",
  Post   = "POST",
  Put    = "PUT",
  Patch  = "PATCH",
  Delete = "DELETE",
}

enum Color {
  Red   = "#FF0000",
  Green = "#00FF00",
  Blue  = "#0000FF",
}

// ─────────────────────────────────────────────
// 3. USING ENUMS IN FUNCTIONS
// ─────────────────────────────────────────────

function getStatusMessage(status: Status): string {
  switch (status) {
    case Status.Pending:  return "Your request is pending review";
    case Status.Active:   return "Your account is active";
    case Status.Inactive: return "Your account is inactive";
    case Status.Deleted:  return "This account has been deleted";
    // TypeScript warns if you miss a case! (with strict return check)
  }
}

// ─────────────────────────────────────────────
// 4. CONST ENUMS — Zero Runtime Cost
// Inlined at compile time — no JS object generated
// Use when you don't need to iterate over enum values
// ─────────────────────────────────────────────

const enum Permission {
  Read   = 1,
  Write  = 2,
  Delete = 4,
  Admin  = 8,
}

// This compiles to: const hasRead = (1 /* Read */ & perms) !== 0;
function hasPermission(userPerms: number, perm: Permission): boolean {
  return (userPerms & perm) !== 0;
}

// ─────────────────────────────────────────────
// 5. ENUMS AS BIT FLAGS (using numeric enums)
// ─────────────────────────────────────────────

enum FileAccess {
  None   = 0,
  Read   = 1 << 0, // 1
  Write  = 1 << 1, // 2
  Execute = 1 << 2, // 4
  ReadWrite = Read | Write, // 3
  All    = Read | Write | Execute, // 7
}

const myPerms = FileAccess.Read | FileAccess.Write; // 3
console.log((myPerms & FileAccess.Read) !== 0);  // true — has read
console.log((myPerms & FileAccess.Execute) !== 0); // false — no execute

// ─────────────────────────────────────────────
// 6. ENUMS vs UNION TYPES — Which to Use?
// ─────────────────────────────────────────────

// UNION TYPE approach (often preferred):
type DirectionUnion = "north" | "south" | "east" | "west";

// ENUM approach:
enum DirectionEnum {
  North = "north",
  South = "south",
  East  = "east",
  West  = "west",
}

// When to use ENUMS:
// ✅ When values are used as bit flags (bitwise operations)
// ✅ When you need runtime iteration (Object.values(MyEnum))
// ✅ When you want reverse mapping (numeric enums)
// ✅ When sharing between multiple files is cleaner with one name

// When to use UNION TYPES:
// ✅ Simple string/number constants
// ✅ When you don't need extra features
// ✅ Better tree-shaking (no JS object generated)
// ✅ Less surprising behavior (enums can be tricky)

// ─────────────────────────────────────────────
// 7. ITERATING OVER ENUMS
// ─────────────────────────────────────────────

// Numeric enums have reverse mappings — filter them out:
for (const key in Direction) {
  if (isNaN(Number(key))) { // filter out the numeric reverse mappings
    console.log(`${key}: ${Direction[key as keyof typeof Direction]}`);
  }
}

// String enums are cleaner to iterate:
for (const [key, value] of Object.entries(Status)) {
  console.log(`${key}: ${value}`);
}

// ─────────────────────────────────────────────
// 8. HETEROGENEOUS ENUMS (avoid!)
// Mix of string and number values — rarely useful
// ─────────────────────────────────────────────

enum Mixed {
  No  = 0,
  Yes = "YES", // avoid this pattern
}

// ─────────────────────────────────────────────
// 9. ENUM WITH NAMESPACING
// Add static methods to enums using namespace merging
// ─────────────────────────────────────────────

enum Weekday {
  Monday    = 1,
  Tuesday   = 2,
  Wednesday = 3,
  Thursday  = 4,
  Friday    = 5,
  Saturday  = 6,
  Sunday    = 7,
}

namespace Weekday {
  export function isWeekend(day: Weekday): boolean {
    return day === Weekday.Saturday || day === Weekday.Sunday;
  }
  export function fromString(s: string): Weekday | undefined {
    return (Weekday as any)[s];
  }
}

console.log(Weekday.isWeekend(Weekday.Saturday)); // true
console.log(Weekday.isWeekend(Weekday.Monday));    // false

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Create a string enum 'Planet' with all 8 planets.
// Write a function that returns the planet's position from the sun.

// Exercise 2:
// Create a bit-flag enum for CSS display values:
// None=0, Block=1, Inline=2, Flex=4, Grid=8
// Write a function that returns CSS class names for the flags.

// Exercise 3:
// Create an enum for card suits and values, then write a
// function that compares two cards and returns which is higher.

// Exercise 4:
// Compare: implement 'OrderStatus' as both an enum AND a union type.
// Test: which is cleaner in a switch statement? Which iterates more easily?

// Exercise 5:
// Use a const enum for HTTP status codes (200, 201, 400, 401, 404, 500).
// Write a function that takes a status code and returns a human-readable message.
