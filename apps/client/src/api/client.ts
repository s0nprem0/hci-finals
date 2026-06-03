const API = "http://localhost:3001/api";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(`${API}${url}`);
  if (!res.ok) throw new Error(`GET ${url} failed`);
  return res.json();
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
