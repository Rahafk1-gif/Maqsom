"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="wrap">
      <h2 style={{ marginBottom: 20 }}>تسجيل الدخول</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>البريد الإلكتروني</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>كلمة المرور</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="error">{error}</p>}
          <button className="primary" disabled={loading}>
            {loading ? "جاري الدخول..." : "دخول"}
          </button>
        </form>
        <p className="hint">
          ما عندك حساب؟ <a href="/signup" style={{ color: "var(--teal)" }}>أنشئ حساب</a>
        </p>
      </div>
    </div>
  );
}
