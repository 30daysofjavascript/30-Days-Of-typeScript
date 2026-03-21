// ============================================================
// 🚀 DAY 25 — Discriminated Unions
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. WHAT IS A DISCRIMINATED UNION?
// A union type where each member has a common "discriminant"
// property with a unique literal type — enabling exhaustive checks.
// ─────────────────────────────────────────────

// Without discriminated union — hard to handle safely:
type BadShape = { radius?: number; width?: number; height?: number };

// WITH discriminated union — type-safe and exhaustive:
type Circle    = { kind: "circle";    radius: number };
type Square    = { kind: "square";    side: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Triangle  = { kind: "triangle";  base: number;  height: number };
type Shape = Circle | Square | Rectangle | Triangle;

// TypeScript narrows correctly in each branch:
function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":    return Math.PI * shape.radius ** 2;
    case "square":    return shape.side ** 2;
    case "rectangle": return shape.width * shape.height;
    case "triangle":  return 0.5 * shape.base * shape.height;
    // If you add a new shape, TypeScript errors here:
    default:
      const _exhaustive: never = shape;
      throw new Error(`Unknown shape: ${JSON.stringify(shape)}`);
  }
}

// ─────────────────────────────────────────────
// 2. RESULT TYPE — Success or Failure
// One of the most useful discriminated unions
// ─────────────────────────────────────────────

type Ok<T>  = { ok: true;  value: T };
type Err<E> = { ok: false; error: E };
type Result<T, E = Error> = Ok<T> | Err<E>;

// Helper constructors
const ok  = <T>(value: T): Ok<T>   => ({ ok: true, value });
const err = <E>(error: E): Err<E>  => ({ ok: false, error });

// Safe division — never throws
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return err("Division by zero");
  return ok(a / b);
}

// Using Result
const result = divide(10, 3);
if (result.ok) {
  console.log(`Result: ${result.value.toFixed(2)}`); // ✅ value: number
} else {
  console.error(`Error: ${result.error}`);            // ✅ error: string
}

// Chain results
function safeSqrt(n: number): Result<number, string> {
  if (n < 0) return err("Cannot sqrt negative number");
  return ok(Math.sqrt(n));
}

// Map result value
function mapResult<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
  return result.ok ? ok(fn(result.value)) : result;
}

// ─────────────────────────────────────────────
// 3. STATE MACHINES WITH DISCRIMINATED UNIONS
// ─────────────────────────────────────────────

type Idle    = { status: "idle" };
type Loading = { status: "loading"; startedAt: Date };
type Success<T> = { status: "success"; data: T; fetchedAt: Date };
type Failure = { status: "failure"; error: Error; retryCount: number };

type AsyncState<T> = Idle | Loading | Success<T> | Failure;

interface User { id: number; name: string; email: string }

function renderState(state: AsyncState<User[]>): string {
  switch (state.status) {
    case "idle":    return "Click to load";
    case "loading": return `Loading since ${state.startedAt.toISOString()}`;
    case "success": return `${state.data.length} users loaded at ${state.fetchedAt.toISOString()}`;
    case "failure": return `Error (attempt ${state.retryCount}): ${state.error.message}`;
  }
}

// Transition functions — type-safe state machine
function startLoading(state: Idle | Failure): Loading {
  return { status: "loading", startedAt: new Date() };
}

function handleSuccess<T>(state: Loading, data: T): Success<T> {
  return { status: "success", data, fetchedAt: new Date() };
}

function handleFailure(state: Loading, error: Error, prevState?: Failure): Failure {
  return {
    status: "failure",
    error,
    retryCount: (prevState?.retryCount ?? 0) + 1
  };
}

// ─────────────────────────────────────────────
// 4. ACTION TYPES PATTERN (Redux-style)
// ─────────────────────────────────────────────

type AddTodo    = { type: "ADD_TODO";    payload: { text: string; id: string } };
type ToggleTodo = { type: "TOGGLE_TODO"; payload: { id: string } };
type RemoveTodo = { type: "REMOVE_TODO"; payload: { id: string } };
type ClearTodos = { type: "CLEAR_TODOS" };

type TodoAction = AddTodo | ToggleTodo | RemoveTodo | ClearTodos;

interface Todo { id: string; text: string; done: boolean }
interface TodoState { todos: Todo[]; }

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      return {
        todos: [...state.todos, {
          id: action.payload.id,
          text: action.payload.text,
          done: false
        }]
      };
    case "TOGGLE_TODO":
      return {
        todos: state.todos.map(t =>
          t.id === action.payload.id ? { ...t, done: !t.done } : t
        )
      };
    case "REMOVE_TODO":
      return { todos: state.todos.filter(t => t.id !== action.payload.id) };
    case "CLEAR_TODOS":
      return { todos: [] };
  }
}

// ─────────────────────────────────────────────
// 5. DISCRIMINATED UNION WITH GENERIC PAYLOAD
// ─────────────────────────────────────────────

// Generic action creator
type Action<T extends string, P = void> = P extends void
  ? { type: T }
  : { type: T; payload: P };

// Type-safe action factory
function createAction<T extends string>(type: T): () => Action<T>;
function createAction<T extends string, P>(type: T, payload: P): Action<T, P>;
function createAction<T extends string, P>(type: T, payload?: P): Action<T, P> | Action<T> {
  return payload !== undefined
    ? { type, payload } as Action<T, P>
    : { type } as Action<T>;
}

// ─────────────────────────────────────────────
// 6. TAGGED UNION PATTERNS
// ─────────────────────────────────────────────

// HTTP response union
type HttpResponse<T> =
  | { status: 200; body: T }
  | { status: 201; body: T; location: string }
  | { status: 204 }
  | { status: 400; errors: Record<string, string[]> }
  | { status: 401; message: string }
  | { status: 404; message: string }
  | { status: 500; message: string; stack?: string };

function handleResponse<T>(response: HttpResponse<T>): void {
  switch (response.status) {
    case 200: console.log("OK:", response.body); break;
    case 201: console.log("Created:", response.body, "at", response.location); break;
    case 204: console.log("No content"); break;
    case 400: console.log("Validation errors:", response.errors); break;
    case 401: console.log("Unauthorized:", response.message); break;
    case 404: console.log("Not found:", response.message); break;
    case 500: console.log("Server error:", response.message); break;
  }
}

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Create a discriminated union for a payment system:
// CreditCard: { method: "credit"; cardNumber: string; expiry: string }
// BankTransfer: { method: "bank"; iban: string; bic: string }
// Crypto: { method: "crypto"; wallet: string; currency: "BTC"|"ETH"|"USDT" }
// Write a function processPayment(payment) that handles each type.

// Exercise 2:
// Implement a full Result<T, E> monad with:
// - map(fn): Result<U, E>
// - flatMap(fn): Result<U, E>
// - mapError(fn): Result<T, F>
// - getOrElse(default): T
// - toPromise(): Promise<T>

// Exercise 3:
// Build a router using discriminated unions:
// type Route = { path: "/"; component: "Home" } | { path: "/users"; component: "UserList" } | ...
// function navigate(route: Route): void

// Exercise 4:
// Create a WebSocket message union with exhaustive handling.

// Exercise 5:
// Implement an undo/redo system using discriminated union actions.
