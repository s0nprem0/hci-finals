const API = "http://localhost:3001/api";

function toCamel(s: string): string {
  return s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function transformKeys<T>(obj: unknown): T {
  if (Array.isArray(obj)) return obj.map(transformKeys) as T;
  if (obj !== null && typeof obj === "object") {
    const r: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      r[toCamel(k)] = transformKeys(v);
    }
    return r as T;
  }
  return obj as T;
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(`${API}${url}`);
  if (!res.ok) throw new Error(`GET ${url} failed (${res.status})`);
  const data = await res.json();
  return transformKeys<T>(data);
}

export const api = {
  literary: {
    list: () => fetchJSON<unknown[]>("/literary"),
    featured: () => fetchJSON<unknown[]>("/literary/featured"),
    get: (id: string) => fetchJSON<unknown>(`/literary/${id}`),
  },
  comparisons: {
    get: (id: string) => fetchJSON<unknown>(`/comparisons/${id}`),
  },
  community: {
    list: () => fetchJSON<unknown[]>("/community"),
  },
  auth: {
    me: () => fetchJSON<unknown>("/auth/me"),
  },
};
