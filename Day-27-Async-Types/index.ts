// ============================================================
// 🚀 DAY 27 — Async TypeScript
// 30 Days of TypeScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. PROMISE TYPES
// ─────────────────────────────────────────────

// Basic Promise typing
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUser(id: number): Promise<User> {
  return fetch(`/api/users/${id}`).then(r => r.json());
}

// Promise.all — all promises in parallel
async function fetchMultiple(ids: number[]): Promise<User[]> {
  return Promise.all(ids.map(id => fetchUser(id)));
}
// TypeScript infers: Promise<User[]>

// Promise.allSettled — get all results including failures
async function fetchSafe(ids: number[]): Promise<PromiseSettledResult<User>[]> {
  return Promise.allSettled(ids.map(id => fetchUser(id)));
}

// Awaited<T> — extract the resolved type
type ResolvedUser = Awaited<ReturnType<typeof fetchUser>>; // User
type MultiUser    = Awaited<ReturnType<typeof fetchMultiple>>; // User[]

// ─────────────────────────────────────────────
// 2. ASYNC/AWAIT WITH TYPE INFERENCE
// ─────────────────────────────────────────────

interface User { id: number; name: string; email: string }
interface Post { id: number; title: string; userId: number }

async function getUserWithPosts(userId: number): Promise<{
  user: User;
  posts: Post[];
}> {
  const [user, posts] = await Promise.all([
    fetchUser(userId),
    fetch(`/api/users/${userId}/posts`).then(r => r.json() as Promise<Post[]>)
  ]);
  return { user, posts };
}

// ─────────────────────────────────────────────
// 3. TYPED ASYNC GENERATORS
// ─────────────────────────────────────────────

// AsyncGenerator<YieldType, ReturnType, NextType>
async function* paginate<T>(
  fetcher: (page: number, limit: number) => Promise<T[]>,
  limit: number = 10
): AsyncGenerator<T[], void, undefined> {
  let page = 1;
  while (true) {
    const items = await fetcher(page, limit);
    if (items.length === 0) return;
    yield items;
    if (items.length < limit) return;
    page++;
  }
}

// Usage:
async function processAllUsers(): Promise<void> {
  const fetcher = (page: number, limit: number): Promise<User[]> =>
    fetch(`/api/users?page=${page}&limit=${limit}`).then(r => r.json());

  for await (const page of paginate(fetcher, 25)) {
    // page is User[]
    page.forEach(user => console.log(user.name));
  }
}

// ─────────────────────────────────────────────
// 4. TYPED FETCH WRAPPER
// ─────────────────────────────────────────────

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestConfig<B = unknown> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: B;
  timeout?: number;
  signal?: AbortSignal;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

class TypedFetch {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string, headers: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };
  }

  async request<TResponse, TBody = never>(
    path: string,
    config: RequestConfig<TBody> = {}
  ): Promise<ApiResponse<TResponse>> {
    const { method = "GET", headers = {}, body, timeout = 30000, signal } = config;

    const controller = new AbortController();
    const timeoutId  = setTimeout(() => controller.abort(), timeout);
    const abortSignal = signal ?? controller.signal;

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method,
        headers: { ...this.defaultHeaders, ...headers },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: abortSignal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: TResponse = await response.json();
      return { data, status: response.status, headers: response.headers };

    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  get<T>(path: string, config?: Omit<RequestConfig, "method" | "body">): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...config, method: "GET" });
  }

  post<T, B>(path: string, body: B, config?: Omit<RequestConfig, "method">): Promise<ApiResponse<T>> {
    return this.request<T, B>(path, { ...config, method: "POST", body });
  }

  put<T, B>(path: string, body: B, config?: Omit<RequestConfig, "method">): Promise<ApiResponse<T>> {
    return this.request<T, B>(path, { ...config, method: "PUT", body });
  }

  patch<T, B>(path: string, body: Partial<B>, config?: Omit<RequestConfig, "method">): Promise<ApiResponse<T>> {
    return this.request<T, Partial<B>>(path, { ...config, method: "PATCH", body });
  }

  delete<T>(path: string, config?: Omit<RequestConfig, "method" | "body">): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...config, method: "DELETE" });
  }
}

const api = new TypedFetch("https://api.example.com", {
  "Authorization": "Bearer token123",
});

// Fully typed:
const { data: users } = await api.get<User[]>("/users");
users[0].name; // ✅ TypeScript knows users is User[]

// ─────────────────────────────────────────────
// 5. ASYNC UTILITY TYPES
// ─────────────────────────────────────────────

// Make all methods async
type Asyncify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<Awaited<R>>
    : T[K];
};

// Promisify a callback-style function
type Callback<T> = (error: Error | null, result?: T) => void;

function promisify<T>(
  fn: (...args: [...any[], Callback<T>]) => void
): (...args: any[]) => Promise<T> {
  return (...args: any[]) => new Promise((resolve, reject) => {
    fn(...args, (error: Error | null, result?: T) => {
      if (error) reject(error);
      else resolve(result!);
    });
  });
}

// ─────────────────────────────────────────────
// 6. TYPED EVENT EMITTER (Async)
// ─────────────────────────────────────────────

type EventMap = {
  "user:created": User;
  "user:updated": { user: User; changes: Partial<User> };
  "user:deleted": { id: number };
  "error":        Error;
};

class TypedEventEmitter<T extends Record<string, unknown>> {
  private handlers = new Map<keyof T, Set<(payload: any) => void | Promise<void>>>();

  on<K extends keyof T>(event: K, handler: (payload: T[K]) => void | Promise<void>): () => void {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
    return () => this.handlers.get(event)!.delete(handler);
  }

  async emit<K extends keyof T>(event: K, payload: T[K]): Promise<void> {
    const eventHandlers = this.handlers.get(event);
    if (!eventHandlers) return;
    await Promise.all([...eventHandlers].map(h => h(payload)));
  }

  once<K extends keyof T>(event: K): Promise<T[K]> {
    return new Promise(resolve => {
      const off = this.on(event, (payload) => {
        off();
        resolve(payload);
      });
    });
  }
}

const emitter = new TypedEventEmitter<EventMap>();

emitter.on("user:created", (user) => {
  console.log(`User created: ${user.name}`); // user is typed as User
});

emitter.on("user:updated", ({ user, changes }) => {
  console.log(`User ${user.id} updated:`, changes);
});

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1:
// Write a typed 'batchProcess<T, R>(items: T[], fn: (item:T) => Promise<R>,
// concurrency: number): Promise<R[]>' that processes items in batches.

// Exercise 2:
// Create a 'CancellablePromise<T>' that wraps a Promise with a cancel() method.

// Exercise 3:
// Write a typed 'retry<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T>'
// where RetryOptions has: maxAttempts, backoff, retryIf (optional predicate).

// Exercise 4:
// Create a 'RateLimiter' class that queues Promise-returning functions
// and executes them at most N per second.

// Exercise 5:
// Implement a typed cache that stores Promise results and serves
// them from cache for a configurable TTL.
