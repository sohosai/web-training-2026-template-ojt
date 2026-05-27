import { type FormEvent, useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setUsers(await res.json());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "fetch failed");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    if (!res.ok) {
      setError(`POST failed: ${res.status}`);
      return;
    }
    setName("");
    setEmail("");
    load();
  };

  return (
    <main style={{ maxWidth: 640, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Web Training 2026</h1>
      <p>backend に繋がっているかの動作確認用テンプレートです。</p>

      <form
        onSubmit={submit}
        style={{ display: "flex", gap: "0.5rem", margin: "1rem 0" }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
          required
        />
        <button type="submit">追加</button>
      </form>

      {error && <p style={{ color: "crimson" }}>error: {error}</p>}

      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    </main>
  );
}
