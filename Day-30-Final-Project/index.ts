// ============================================================
// 🚀 DAY 30 — FINAL PROJECT: Type-Safe Todo API
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================
// This project combines EVERYTHING from the course:
// ✅ Interfaces & Types (Day 05, 08)
// ✅ Generics (Day 13-14)
// ✅ Utility Types (Day 15)
// ✅ Mapped & Conditional Types (Day 16-17)
// ✅ Discriminated Unions & Result (Day 25-26)
// ✅ Async/Await patterns (Day 27)
// ✅ Decorators (Day 21)
// ✅ Advanced Patterns (Day 28)
// ✅ Classes & Mixins (Day 11, 22)

// ─────────────────────────────────────────────
// 1. DOMAIN MODELS
// ─────────────────────────────────────────────

// Branded IDs — prevent mixing up IDs
declare const _brand: unique symbol;
type Brand<T, B> = T & { readonly [_brand]: B };
type TodoId     = Brand<string, "TodoId">;
type UserId     = Brand<string, "UserId">;
type ProjectId  = Brand<string, "ProjectId">;

function todoId(s: string):    TodoId    { return s as TodoId; }
function userId(s: string):    UserId    { return s as UserId; }
function projectId(s: string): ProjectId { return s as ProjectId; }

// Enums as const objects
const Priority = {
  Low:      "low",
  Medium:   "medium",
  High:     "high",
  Critical: "critical",
} as const;
type Priority = typeof Priority[keyof typeof Priority];

const TodoStatus = {
  Todo:       "todo",
  InProgress: "in_progress",
  Done:       "done",
  Archived:   "archived",
} as const;
type TodoStatus = typeof TodoStatus[keyof typeof TodoStatus];

// Core entity interfaces
interface Timestamps {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

interface SoftDeletable {
  readonly deletedAt: Date | null;
}

interface Todo extends Timestamps, SoftDeletable {
  readonly id:        TodoId;
  readonly userId:    UserId;
  title:              string;
  description:        string | null;
  status:             TodoStatus;
  priority:           Priority;
  dueDate:            Date | null;
  tags:               readonly string[];
  projectId:          ProjectId | null;
  completedAt:        Date | null;
}

interface Project extends Timestamps, SoftDeletable {
  readonly id:   ProjectId;
  readonly userId: UserId;
  name:          string;
  description:   string | null;
  color:         string;
}

// ─────────────────────────────────────────────
// 2. DTO TYPES — Data Transfer Objects
// ─────────────────────────────────────────────

type CreateTodoDTO = {
  title:       string;
  description?: string;
  priority?:   Priority;
  dueDate?:    Date | string | null;
  tags?:       string[];
  projectId?:  ProjectId | null;
};

type UpdateTodoDTO = Partial<Pick<Todo,
  "title" | "description" | "status" | "priority" | "dueDate" | "tags" | "projectId"
>>;

type TodoFilters = {
  status?:    TodoStatus | TodoStatus[];
  priority?:  Priority | Priority[];
  projectId?: ProjectId | null;
  tags?:      string[];
  search?:    string;
  dueBefore?: Date;
  dueAfter?:  Date;
  showDeleted?: boolean;
};

type SortField = "createdAt" | "updatedAt" | "dueDate" | "priority" | "title";
type SortOrder = "asc" | "desc";

type PaginationOptions = {
  page?:    number;
  limit?:   number;
  sort?:    SortField;
  order?:   SortOrder;
};

// ─────────────────────────────────────────────
// 3. RESULT TYPE FOR ERROR HANDLING
// ─────────────────────────────────────────────

type Ok<T>  = { ok: true;  value: T };
type Err<E extends Error = Error> = { ok: false; error: E };
type Result<T, E extends Error = Error> = Ok<T> | Err<E>;

class TodoError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = "TodoError";
  }
}
class NotFoundError    extends TodoError { constructor(id: string) { super(`Todo ${id} not found`, "NOT_FOUND"); } }
class ValidationError2 extends TodoError {
  constructor(public readonly fields: Record<string, string>) {
    super("Validation failed", "VALIDATION_ERROR");
  }
}

const Result = {
  ok:  <T>(value: T): Ok<T>   => ({ ok: true, value }),
  err: <E extends Error>(e: E): Err<E> => ({ ok: false, error: e }),
};

// ─────────────────────────────────────────────
// 4. VALIDATION LAYER
// ─────────────────────────────────────────────

type Validator2<T> = (value: T) => string | null;

const validators = {
  required: <T>(name: string): Validator2<T | null | undefined> =>
    v => v === null || v === undefined ? `${name} is required` : null,

  minLength: (min: number): Validator2<string> =>
    v => v.length < min ? `Minimum length is ${min}` : null,

  maxLength: (max: number): Validator2<string> =>
    v => v.length > max ? `Maximum length is ${max}` : null,

  isIn: <T>(values: T[]): Validator2<T> =>
    v => values.includes(v) ? null : `Must be one of: ${values.join(", ")}`,
};

function validateCreateTodo(dto: CreateTodoDTO): Result<CreateTodoDTO, ValidationError2> {
  const errors: Record<string, string> = {};

  const titleErr = [
    validators.required("title")(dto.title),
    validators.minLength(1)(dto.title),
    validators.maxLength(200)(dto.title),
  ].find(Boolean);

  if (titleErr) errors.title = titleErr;

  if (dto.priority) {
    const priorityErr = validators.isIn(Object.values(Priority))(dto.priority);
    if (priorityErr) errors.priority = priorityErr;
  }

  if (Object.keys(errors).length > 0) {
    return Result.err(new ValidationError2(errors));
  }
  return Result.ok(dto);
}

// ─────────────────────────────────────────────
// 5. REPOSITORY PATTERN WITH GENERICS
// ─────────────────────────────────────────────

interface Identifiable { id: Brand<string, any> }

abstract class InMemoryRepository<T extends Identifiable & Timestamps & SoftDeletable> {
  protected items = new Map<string, T>();
  protected abstract entityName: string;

  findById(id: T["id"]): Result<T, NotFoundError> {
    const item = this.items.get(id as string);
    if (!item || item.deletedAt !== null) {
      return Result.err(new NotFoundError(id as string));
    }
    return Result.ok(item);
  }

  findAll(filter?: Partial<T>): T[] {
    return [...this.items.values()].filter(item => {
      if (item.deletedAt !== null) return false;
      if (!filter) return true;
      return Object.entries(filter).every(([key, val]) =>
        (item as any)[key] === val
      );
    });
  }

  protected save(item: T): T {
    this.items.set(item.id as string, item);
    return item;
  }

  softDelete(id: T["id"]): Result<T, NotFoundError> {
    const result = this.findById(id);
    if (!result.ok) return result;
    const deleted = { ...result.value, deletedAt: new Date(), updatedAt: new Date() } as T;
    this.items.set(id as string, deleted);
    return Result.ok(deleted);
  }

  count(): number {
    return [...this.items.values()].filter(i => i.deletedAt === null).length;
  }
}

// ─────────────────────────────────────────────
// 6. TODO REPOSITORY
// ─────────────────────────────────────────────

class TodoRepository extends InMemoryRepository<Todo> {
  protected entityName = "Todo";

  create(userId: UserId, dto: CreateTodoDTO): Result<Todo, ValidationError2> {
    const validation = validateCreateTodo(dto);
    if (!validation.ok) return validation;

    const todo: Todo = {
      id:          todoId(`todo-${Date.now()}-${Math.random().toString(36).slice(2)}`),
      userId,
      title:       dto.title.trim(),
      description: dto.description?.trim() ?? null,
      status:      TodoStatus.Todo,
      priority:    dto.priority ?? Priority.Medium,
      dueDate:     dto.dueDate ? new Date(dto.dueDate) : null,
      tags:        dto.tags ?? [],
      projectId:   dto.projectId ?? null,
      completedAt: null,
      createdAt:   new Date(),
      updatedAt:   new Date(),
      deletedAt:   null,
    };

    return Result.ok(this.save(todo));
  }

  update(id: TodoId, dto: UpdateTodoDTO): Result<Todo, NotFoundError> {
    const existing = this.findById(id);
    if (!existing.ok) return existing;

    const updated: Todo = {
      ...existing.value,
      ...dto,
      completedAt: dto.status === TodoStatus.Done && existing.value.completedAt === null
        ? new Date()
        : existing.value.completedAt,
      updatedAt: new Date(),
    };

    return Result.ok(this.save(updated));
  }

  search(userId: UserId, filters: TodoFilters, pagination: PaginationOptions = {}): {
    todos: Todo[];
    total: number;
    page: number;
    totalPages: number;
  } {
    let todos = this.findAll().filter(t => t.userId === userId);

    // Apply filters
    if (filters.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
      todos = todos.filter(t => statuses.includes(t.status));
    }
    if (filters.priority) {
      const priorities = Array.isArray(filters.priority) ? filters.priority : [filters.priority];
      todos = todos.filter(t => priorities.includes(t.priority));
    }
    if (filters.projectId !== undefined) {
      todos = todos.filter(t => t.projectId === filters.projectId);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      todos = todos.filter(t =>
        t.title.toLowerCase().includes(q) ||
        (t.description?.toLowerCase().includes(q) ?? false)
      );
    }
    if (filters.tags?.length) {
      todos = todos.filter(t => filters.tags!.every(tag => t.tags.includes(tag)));
    }

    // Sort
    const sort  = pagination.sort ?? "createdAt";
    const order = pagination.order ?? "desc";
    todos.sort((a, b) => {
      const av = a[sort as keyof Todo] as any;
      const bv = b[sort as keyof Todo] as any;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return order === "asc" ? cmp : -cmp;
    });

    // Paginate
    const total     = todos.length;
    const limit     = pagination.limit ?? 20;
    const page      = pagination.page ?? 1;
    const totalPages = Math.ceil(total / limit);
    const paginated = todos.slice((page - 1) * limit, page * limit);

    return { todos: paginated, total, page, totalPages };
  }

  getStats(userId: UserId): Record<string, number> {
    const all = this.findAll().filter(t => t.userId === userId);
    return {
      total:      all.length,
      todo:       all.filter(t => t.status === TodoStatus.Todo).length,
      inProgress: all.filter(t => t.status === TodoStatus.InProgress).length,
      done:       all.filter(t => t.status === TodoStatus.Done).length,
      overdue:    all.filter(t => t.dueDate && t.dueDate < new Date() && t.status !== TodoStatus.Done).length,
    };
  }
}

// ─────────────────────────────────────────────
// 7. SERVICE LAYER
// ─────────────────────────────────────────────

class TodoService {
  constructor(private readonly repo: TodoRepository) {}

  createTodo(userId: UserId, dto: CreateTodoDTO): Result<Todo, ValidationError2> {
    return this.repo.create(userId, dto);
  }

  getTodo(userId: UserId, id: TodoId): Result<Todo, NotFoundError | TodoError> {
    const result = this.repo.findById(id);
    if (!result.ok) return result;
    if (result.value.userId !== userId) {
      return Result.err(new TodoError("Access denied", "FORBIDDEN"));
    }
    return result;
  }

  updateTodo(userId: UserId, id: TodoId, dto: UpdateTodoDTO): Result<Todo, NotFoundError | TodoError> {
    const existing = this.getTodo(userId, id);
    if (!existing.ok) return existing;
    return this.repo.update(id, dto);
  }

  deleteTodo(userId: UserId, id: TodoId): Result<Todo, NotFoundError | TodoError> {
    const existing = this.getTodo(userId, id);
    if (!existing.ok) return existing;
    return this.repo.softDelete(id);
  }

  listTodos(userId: UserId, filters: TodoFilters = {}, pagination: PaginationOptions = {}) {
    return this.repo.search(userId, filters, pagination);
  }

  getStats(userId: UserId) {
    return this.repo.getStats(userId);
  }

  completeTodo(userId: UserId, id: TodoId): Result<Todo, NotFoundError | TodoError> {
    return this.updateTodo(userId, id, { status: TodoStatus.Done });
  }

  bulkComplete(userId: UserId, ids: TodoId[]): Result<Todo, NotFoundError | TodoError>[] {
    return ids.map(id => this.completeTodo(userId, id));
  }
}

// ─────────────────────────────────────────────
// 8. DEMO
// ─────────────────────────────────────────────

const repo    = new TodoRepository();
const service = new TodoService(repo);
const alice   = userId("user-alice");

// Create todos
const t1 = service.createTodo(alice, { title: "Learn TypeScript", priority: "high", tags: ["learning"] });
const t2 = service.createTodo(alice, { title: "Build a project", priority: "medium" });
const t3 = service.createTodo(alice, { title: "Write tests", priority: "low" });

if (t1.ok) console.log("Created:", t1.value.title);

// List todos
const { todos, total } = service.listTodos(alice, {}, { sort: "priority", order: "desc" });
console.log(`${total} todos:`, todos.map(t => t.title));

// Complete a todo
if (t1.ok) {
  const updated = service.completeTodo(alice, t1.value.id);
  if (updated.ok) console.log("Completed:", updated.value.completedAt);
}

// Get stats
console.log("Stats:", service.getStats(alice));

// ─────────────────────────────────────────────
// 🎓 CONGRATULATIONS! 30 Days of TypeScript Complete!
// ─────────────────────────────────────────────
// Topics mastered:
// 🟢 Basic: types, inference, arrays, interfaces, functions, enums
// 🟡 Intermediate: unions, literals, narrowing, classes, generics basics
// 🟠 Advanced: utility types, mapped/conditional/template literal types
// 🔴 Expert: decorators, mixins, advanced patterns, branded types, DI
//
// Next steps:
// 🚀 Add this TypeScript API to a real Express/Fastify server
// 🚀 Connect to a real database with Prisma (fully typed ORM)
// 🚀 Build a React frontend consuming this typed API
// 🚀 Add OpenAPI/Swagger generation from TypeScript types
// 🚀 Explore Zod for runtime type validation matching TS types
