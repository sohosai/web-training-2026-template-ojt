import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type Message = {
  id: number;
  message: string;
  userName: string;
  thread: string;
  createdAt: string;
};

export const Route = createFileRoute("/threads/$threadName")({
  component: ThreadPage,
});

function ThreadPage() {
  const { threadName } = Route.useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/messages");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const all: Message[] = await res.json();
        setMessages(all.filter((m) => m.thread === threadName));
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "fetch failed");
      }
    };
    load();
  }, [threadName]);

  return (
    <main style={{ maxWidth: 640, margin: "2rem auto", padding: "0 1rem" }}>
      <Link to="/" style={{ fontSize: "0.875rem" ,padding:"5px",color:"black" ,backgroundColor:"#cccccc",textDecoration: "none", borderRadius: "3px"}}>
        ← 一覧に戻る
      </Link>
      <h1 style={{ marginTop: "0.75rem" }}>スレッド: {threadName}</h1>
      <Link to="/" style={{ position:"absolute",bottom:"20px",padding:"10px",color:"white" ,backgroundColor:"#ff6347",textDecoration: "none", borderRadius: "3px" }}>スレッドを削除</Link>
      {error ? (
        <p style={{ color: "crimson" }}>{error}</p>
      ) : messages.length === 0 ? (
        <p style={{ color: "#888" }}>このスレッドにメッセージはありません</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {messages.map((m) => (
            <li
              key={m.id}
              style={{ borderBottom: "1px solid #eee", padding: "0.75rem 0" }}
            >
              <span style={{ fontWeight: "bold" }}>{m.userName}</span>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "#888",
                  marginLeft: "0.5rem",
                }}
              >
                {new Date(m.createdAt).toLocaleString("ja-JP")}
              </span>
              <p style={{ margin: "0.25rem 0 0", whiteSpace: "pre-wrap" }}>
                {m.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
