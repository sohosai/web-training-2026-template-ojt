import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

type Message = {
  id: number;
  count: number;
  message: string;
  userName: string;
  thread: string;
  createdAt: string;
};

const RAINBOW_COLORS = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00CC44",
  "#0088FF",
  "#4B0082",
  "#EE82EE",
  "#FF1493",
  "#FF6600",
  "#00FFCC",
  "#AA00FF",
  "#FFD700",
];

const BURST_ANGLES = Array.from(
  { length: 12 },
  (_, i) => (i / 12) * Math.PI * 2,
);

export const Route = createFileRoute("/threads/$threadName")({
  component: ThreadPage,
});

function ThreadPage() {
  const { threadName } = Route.useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [burstingIds, setBurstingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/messages");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const all: Message[] = (await res.json()).map(
          (m: Omit<Message, "count">) => ({ ...m, count: 9000 }),
        );
        setMessages(all.filter((m) => m.thread === threadName));
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "fetch failed");
      }
    };
    load();
  }, [threadName]);

  const handleLike = useCallback((id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setBurstingIds((b) => new Set(b).add(id));
        setTimeout(() => {
          setBurstingIds((b) => {
            const nb = new Set(b);
            nb.delete(id);
            return nb;
          });
        }, 850);
        submitLike(id);
      }
      return next;
    });
  }, []);
  const submitLike = async (id: number) => {
    const res = await fetch(`/api/messages/${id}/favorite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      setError(`POST failed: ${res.status}`);
      return;
    }
  };

  return (
    <main style={{ maxWidth: 640, margin: "2rem auto", padding: "0 1rem" }}>
      <Link
        to="/"
        style={{
          fontSize: "0.875rem",
          padding: "5px",
          color: "black",
          backgroundColor: "#cccccc",
          textDecoration: "none",
          borderRadius: "3px",
        }}
      >
        ← 一覧に戻る
      </Link>
      <h1 style={{ marginTop: "0.75rem" }}>スレッド: {threadName}</h1>
      <Link
        to="/"
        style={{
          position: "absolute",
          bottom: "20px",
          padding: "10px",
          color: "white",
          backgroundColor: "#ff6347",
          textDecoration: "none",
          borderRadius: "3px",
        }}
      >
        スレッドを削除
      </Link>
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
              <div
                style={{
                  margin: "0.25rem 0 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleLike(m.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "2px",
                      display: "flex",
                      alignItems: "center",
                      color: likedIds.has(m.id) ? "#FFB700" : "currentColor",
                      transition: "color 0.2s",
                      animation: burstingIds.has(m.id)
                        ? "like-pop 0.4s ease-out"
                        : "none",
                    }}
                    aria-label="いいね"
                  >
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="20"
                      viewBox="0 0 24 24"
                      fill={likedIds.has(m.id) ? "#FFB700" : "none"}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                      <path d="M7 10v12" />
                    </svg>
                  </button>

                  {burstingIds.has(m.id) && (
                    <>
                      {BURST_ANGLES.map((angle, i) => (
                        <span
                          key={`burst-${angle}`}
                          style={
                            {
                              position: "absolute",
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              backgroundColor:
                                RAINBOW_COLORS[i % RAINBOW_COLORS.length],
                              top: "50%",
                              left: "50%",
                              "--tx": `${Math.cos(angle) * 32}px`,
                              "--ty": `${Math.sin(angle) * 32}px`,
                              animation: `rainbow-particle 0.75s ease-out ${i * 0.025}s forwards`,
                              pointerEvents: "none",
                            } as React.CSSProperties
                          }
                        />
                      ))}
                      <span
                        style={{
                          position: "absolute",
                          fontSize: "20px",
                          top: "0px",
                          left: "50%",
                          animation: "rainbow-rise 0.85s ease-out forwards",
                          pointerEvents: "none",
                          zIndex: 10,
                          lineHeight: 1,
                        }}
                      >
                        👍
                      </span>
                    </>
                  )}
                </div>

                <span style={{ marginLeft: "0.10rem", fontSize: "15px" }}>
                  {m.count}
                </span>
                <svg
                  aria-hidden="true"
                  style={{ marginLeft: "0.50rem", marginRight: "0" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
                  <path d="M17 14V2" />
                </svg>
                <span style={{ marginLeft: "0.10rem", fontSize: "15px" }}>
                  {"0"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
