// ============================================================
// 🚀 DAY 12 — Access Modifiers & Readonly
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. ACCESS MODIFIERS OVERVIEW
// public    — accessible everywhere (default)
// private   — only inside THIS class
// protected — inside THIS class + subclasses
// readonly  — can be set once (constructor only), then immutable
// ─────────────────────────────────────────────

class BankAccount {
  public readonly id: string;           // read from outside, set once
  public owner: string;                  // readable and writable from outside
  private balance: number;               // only accessible inside BankAccount
  protected transactionLog: string[];    // accessible in subclasses too

  constructor(owner: string, initialBalance: number = 0) {
    this.id      = `ACC-${Date.now()}`;
    this.owner   = owner;
    this.balance = initialBalance;
    this.transactionLog = [];
  }

  // Public method — callable from anywhere
  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.balance += amount;
    this.logTransaction("DEPOSIT", amount);
  }

  withdraw(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    if (amount > this.balance) throw new Error("Insufficient funds");
    this.balance -= amount;
    this.logTransaction("WITHDRAWAL", amount);
  }

  // Protected — subclasses can log too
  protected logTransaction(type: string, amount: number): void {
    this.transactionLog.push(`${type}: ${amount} @ ${new Date().toISOString()}`);
  }

  // Private — internal helper
  private formatBalance(): string {
    return `$${this.balance.toFixed(2)}`;
  }

  getBalance(): number { return this.balance; }

  getStatement(): string {
    return [
      `Account: ${this.owner} (${this.id})`,
      `Balance: ${this.formatBalance()}`,
      "Transactions:",
      ...this.transactionLog.map(t => `  ${t}`)
    ].join("\n");
  }
}

class SavingsAccount extends BankAccount {
  private interestRate: number;

  constructor(owner: string, balance: number, interestRate: number = 0.05) {
    super(owner, balance);
    this.interestRate = interestRate;
  }

  applyInterest(): void {
    const interest = this.getBalance() * this.interestRate;
    this.deposit(interest);
    // ✅ Can access protected method from parent:
    this.logTransaction("INTEREST", interest);
    // ❌ Cannot access private balance directly:
    // this.balance += interest; // Error!
  }

  getTransactionCount(): number {
    // ✅ Can access protected property from parent:
    return this.transactionLog.length;
  }
}

const savings = new SavingsAccount("Alice", 1000, 0.05);
savings.deposit(500);
savings.applyInterest();
console.log(savings.getStatement());
// savings.balance  // ❌ private
// savings.transactionLog // ❌ protected — only accessible in class/subclasses

// ─────────────────────────────────────────────
// 2. #PRIVATE FIELDS (ECMAScript Private)
// JavaScript-level private — truly inaccessible at runtime
// Different from TypeScript's 'private' keyword
// ─────────────────────────────────────────────

class User {
  readonly #id: string;
  #password: string;

  constructor(id: string, password: string) {
    this.#id       = id;
    this.#password = password;
  }

  checkPassword(input: string): boolean {
    return this.#password === input;
  }

  changePassword(oldPass: string, newPass: string): void {
    if (!this.checkPassword(oldPass)) throw new Error("Wrong password");
    if (newPass.length < 8) throw new Error("Password too short");
    this.#password = newPass;
  }

  get id(): string { return this.#id; }
}

const user = new User("user-1", "secret123");
console.log(user.id);                // ✅
// user.#password;                   // ❌ SyntaxError — truly private
user.checkPassword("secret123");     // ✅

// TypeScript 'private' vs JS '#private':
// TypeScript's 'private' is compile-time only — erasable, accessible at runtime via (obj as any).prop
// JS '#private' is runtime-enforced — impossible to access outside class

// ─────────────────────────────────────────────
// 3. READONLY PROPERTIES
// ─────────────────────────────────────────────

class Config {
  readonly host: string;
  readonly port: number;
  readonly isProduction: boolean;
  private _timeout: number = 5000;

  constructor(host: string, port: number, isProd: boolean = false) {
    this.host = host;
    this.port = port;
    this.isProduction = isProd;
    // After constructor, these CANNOT be changed
  }

  // Can change mutable properties but not readonly ones
  setTimeout(ms: number): void {
    this._timeout = ms;
    // this.port = 9999; // ❌ Cannot assign to 'port' (readonly)
  }

  get timeout(): number { return this._timeout; }
}

const config = new Config("api.example.com", 443, true);
console.log(config.host); // "api.example.com"
// config.host = "other.com"; // ❌ readonly

// ─────────────────────────────────────────────
// 4. READONLY WITH INTERFACES & TYPES
// ─────────────────────────────────────────────

interface Immutable {
  readonly id: number;
  readonly name: string;
  readonly createdAt: Date;
}

// Readonly<T> utility type makes ALL properties readonly
type ReadonlyUser = Readonly<{
  id: number;
  name: string;
  email: string;
}>;

const frozenUser: ReadonlyUser = { id: 1, name: "Alice", email: "a@a.com" };
// frozenUser.name = "Bob"; // ❌

// DeepReadonly pattern (recursive)
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type Config2 = DeepReadonly<{
  server: { host: string; port: number };
  database: { url: string; name: string };
}>;

// ─────────────────────────────────────────────
// 5. OVERRIDE KEYWORD (TypeScript 4.3+)
// Explicitly mark overridden methods — prevents accidental overrides
// ─────────────────────────────────────────────

class BaseLogger {
  log(message: string): void {
    console.log(`[BASE] ${message}`);
  }
  warn(message: string): void {
    console.warn(`[WARN] ${message}`);
  }
}

class PrefixLogger extends BaseLogger {
  constructor(private prefix: string) { super(); }

  override log(message: string): void { // ← 'override' keyword
    super.log(`${this.prefix} ${message}`);
  }
  // override nonExistentMethod() {} // ❌ Error: not in base class!
}

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Refactor this class to use appropriate access modifiers:
// - id should be readonly
// - password should be truly private (#)
// - name should be publicly readable but not writable from outside
// - a _role internal field should be protected

// Exercise 2:
// Create a Stack<T> class where the internal array is private,
// but has public push, pop, peek, isEmpty, and size methods.

// Exercise 3:
// Create a Game class hierarchy:
// - Game: abstract, has protected score, abstract methods start/end
// - PlatformGame extends Game: adds lives, level
// - PuzzleGame extends Game: adds hints, currentPuzzle
// Use appropriate access modifiers throughout.

// Exercise 4:
// Create a DeepReadonly<T> utility type that recursively makes all
// nested properties readonly (including nested arrays and objects).

// Exercise 5:
// When should you use TypeScript's 'private' keyword vs JavaScript's '#private'?
// Write examples showing the difference in real-world usage.
