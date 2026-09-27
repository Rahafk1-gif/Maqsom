"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setDone(true);
    }
  }

  return (
    <div className="wrap">
      <h2 style={{ marginBottom: 20 }}>إنشاء حساب تاجر</h2>
      <div className="card">
        {done ? (
          <>
            <p>تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتأكيد الحساب ثم سجّل الدخول.</p>
            <div style={{ height: 10 }} />
            <button className="primary" onClick={() => router.push("/login")}>
              الذهاب لتسجيل الدخول
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>البريد الإلكتروني</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="field">
              <label>كلمة المرور</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="error">{error}</p>}
            <button className="primary" disabled={loading}>
              {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
            </button>
          </form>
        )}
        <p className="hint">
          عندك حساب؟ <a href="/login" style={{ color: "var(--teal)" }}>سجّل الدخول</a>
        </p>
      </div>
    </div>
  );
}
