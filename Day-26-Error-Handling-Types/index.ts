// ============================================================
// 🚀 DAY 26 — Error Handling with Types
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. THE PROBLEM WITH throw
// TypeScript can't type thrown values (they're always 'unknown' in catch)
// ─────────────────────────────────────────────

function riskyFunction(): number {
  if (Math.random() < 0.5) throw new Error("Something went wrong");
  return 42;
}

try {
  const value = riskyFunction();
} catch (error) {
  // 'error' is type 'unknown' in TypeScript 4.4+ with useUnknownInCatchVariables
  // You MUST check the type before using it
  if (error instanceof Error) {
    console.log(error.message); // ✅ string
  }
}

// ─────────────────────────────────────────────
// 2. TYPED CUSTOM ERRORS
// ─────────────────────────────────────────────

// Base error class
class AppError extends Error {
  public readonly name: string;
  public readonly code: string;
  public readonly statusCode: number;
  public readonly timestamp: Date;

  constructor(message: string, code: string, statusCode: number = 500) {
    super(message);
    this.name       = new.target.name; // gets subclass name automatically
    this.code       = code;
    this.statusCode = statusCode;
    this.timestamp  = new Date();
    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, new.target);
    }
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
    };
  }
}

class ValidationError extends AppError {
  public readonly fields: Record<string, string[]>;

  constructor(fields: Record<string, string[]>) {
    const message = Object.entries(fields)
      .map(([f, errs]) => `${f}: ${errs.join(", ")}`)
      .join("; ");
    super(message, "VALIDATION_ERROR", 400);
    this.fields = fields;
  }

  getFieldError(field: string): string[] {
    return this.fields[field] ?? [];
  }
}

class NotFoundError extends AppError {
  constructor(public readonly resource: string, public readonly id: string | number) {
    super(`${resource} with id "${id}" not found`, "NOT_FOUND", 404);
  }
}

class AuthenticationError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, "UNAUTHENTICATED", 401);
  }
}

class AuthorizationError extends AppError {
  constructor(
    public readonly required: string[],
    public readonly actual: string[]
  ) {
    super(`Required roles: ${required.join(", ")}`, "FORBIDDEN", 403);
  }
}

class NetworkError extends AppError {
  constructor(
    public readonly url: string,
    public readonly statusCode: number,
    message: string
  ) {
    super(message, "NETWORK_ERROR", statusCode);
  }
}

// ─────────────────────────────────────────────
// 3. RESULT TYPE — Explicit Error Handling
// Instead of throwing, return a Result that forces handling
// ─────────────────────────────────────────────

type Ok<T>  = { readonly ok: true;  readonly value: T };
type Err<E extends Error = Error> = { readonly ok: false; readonly error: E };
type Result<T, E extends Error = Error> = Ok<T> | Err<E>;

const Result = {
  ok:  <T>(value: T): Ok<T>   => ({ ok: true, value }),
  err: <E extends Error>(error: E): Err<E> => ({ ok: false, error }),

  fromPromise: async <T, E extends Error = Error>(
    promise: Promise<T>
  ): Promise<Result<T, E>> => {
    try {
      return Result.ok(await promise);
    } catch (error) {
      return Result.err(error instanceof Error ? error as E : new Error(String(error)) as E);
    }
  },

  // Unwrap or throw
  unwrap: <T>(result: Result<T>): T => {
    if (result.ok) return result.value;
    throw result.error;
  },

  // Unwrap with default
  unwrapOr: <T>(result: Result<T>, defaultValue: T): T => {
    return result.ok ? result.value : defaultValue;
  },
};

// Type-safe functions that use Result:
function parseJSON<T>(json: string): Result<T, SyntaxError> {
  try {
    return Result.ok(JSON.parse(json) as T);
  } catch (e) {
    return Result.err(e as SyntaxError);
  }
}

function validateAge(age: unknown): Result<number, ValidationError> {
  if (typeof age !== "number") {
    return Result.err(new ValidationError({ age: ["Must be a number"] }));
  }
  if (age < 0 || age > 150) {
    return Result.err(new ValidationError({ age: ["Must be between 0 and 150"] }));
  }
  return Result.ok(age);
}

// ─────────────────────────────────────────────
// 4. ERROR HANDLING IN ASYNC CODE
// ─────────────────────────────────────────────

async function fetchUser(id: number): Promise<Result<User, NotFoundError | NetworkError>> {
  try {
    const res = await fetch(`/api/users/${id}`);
    if (res.status === 404) return Result.err(new NotFoundError("User", id));
    if (!res.ok) return Result.err(new NetworkError(`/api/users/${id}`, res.status, res.statusText));
    const user: User = await res.json();
    return Result.ok(user);
  } catch (e) {
    return Result.err(new NetworkError(`/api/users/${id}`, 0, "Network failure"));
  }
}

interface User { id: number; name: string; }

async function example() {
  const result = await fetchUser(1);
  if (result.ok) {
    console.log("Got user:", result.value.name);
  } else if (result.error instanceof NotFoundError) {
    console.log(`${result.error.resource} #${result.error.id} not found`);
  } else {
    console.log(`Network error ${result.error.statusCode}: ${result.error.message}`);
  }
}

// ─────────────────────────────────────────────
// 5. ERROR TYPE GUARDS
// ─────────────────────────────────────────────

function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

function isNotFoundError(error: unknown): error is NotFoundError {
  return error instanceof NotFoundError;
}

// Generic error guard factory
function isErrorOfType<T extends { new (...args: any[]): Error }>(
  ErrorClass: T
): (error: unknown) => error is InstanceType<T> {
  return (error: unknown): error is InstanceType<T> => error instanceof ErrorClass;
}

const isAuthError = isErrorOfType(AuthenticationError);
const isNetworkErr = isErrorOfType(NetworkError);

// ─────────────────────────────────────────────
// 6. ERROR BOUNDARY UTILITIES
// ─────────────────────────────────────────────

// Try to execute — return Result, never throw
function tryCatch<T, E extends Error = Error>(fn: () => T): Result<T, E> {
  try {
    return Result.ok(fn());
  } catch (error) {
    return Result.err(error instanceof Error ? error as E : new Error(String(error)) as E);
  }
}

async function tryCatchAsync<T, E extends Error = Error>(
  fn: () => Promise<T>
): Promise<Result<T, E>> {
  try {
    return Result.ok(await fn());
  } catch (error) {
    return Result.err(error instanceof Error ? error as E : new Error(String(error)) as E);
  }
}

// Usage:
const parseResult = tryCatch(() => JSON.parse('{"valid": true}'));
const badResult   = tryCatch(() => JSON.parse("bad json"));

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Add a 'chain' method to Result that runs a function on Ok values:
// result.chain(value => Result.ok(value * 2))

// Exercise 2:
// Create an error hierarchy for a file system:
// FileError → FileNotFoundError, PermissionDeniedError, DiskFullError
// With appropriate extra properties on each.

// Exercise 3:
// Write a 'collectResults<T>(results: Result<T>[])' that
// returns Result<T[], ValidationError> gathering ALL errors.

// Exercise 4:
// Build a retry function that only retries NetworkError,
// immediately throws other error types.

// Exercise 5:
// Create an Either<L, R> type (similar to Result but more general)
// with map, mapLeft, fold, and chain methods.
