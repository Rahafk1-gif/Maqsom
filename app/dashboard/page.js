"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

const fields = [
  { key: "price", label: "سعر البيع للطلب" },
  { key: "orders", label: "عدد الطلبات شهرياً" },
  { key: "supplier", label: "تكلفة المورّد" },
  { key: "distributor", label: "عمولة الموزّع" },
  { key: "shipping", label: "الشحن والتغليف" },
  { key: "marketing", label: "التسويق لكل طلب" },
  { key: "capital", label: "رأس المال المطلوب تغطيته" },
];

function fmt(n) {
  return Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [values, setValues] = useState({ price: "", orders: "", supplier: "", distributor: "", shipping: "", marketing: "", capital: "" });
  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push("/login");
        return;
      }
      setUser(data.user);
      await loadHistory(data.user.id);
      setLoading(false);
    }
    init();
  }, [router]);

  async function loadHistory(userId) {
    const { data } = await supabase
      .from("cost_entries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);
    setHistory(data || []);
  }

  function num(key) {
    const v = parseFloat(values[key]);
    return isNaN(v) ? 0 : v;
  }

  const totalCost = num("supplier") + num("distributor") + num("shipping") + num("marketing");
  const netPerOrder = num("price") - totalCost;
  const monthlyNet = netPerOrder * num("orders");

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      user_id: user.id,
      price: num("price"),
      orders: num("orders"),
      supplier: num("supplier"),
      distributor: num("distributor"),
      shipping: num("shipping"),
      marketing: num("marketing"),
      capital: num("capital"),
    };
    const { error } = await supabase.from("cost_entries").insert(payload);
    setSaving(false);
    if (!error) await loadHistory(user.id);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) return <div className="wrap">جاري التحميل...</div>;

  return (
    <div className="wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>لوحة مقسوم</h2>
        <button className="ghost" style={{ width: "auto", padding: "8px 16px" }} onClick={handleLogout}>
          خروج
        </button>
      </div>

      <div className="card" style={{ background: "var(--teal-dark)", color: "#fff" }}>
        <div style={{ fontSize: 13, opacity: 0.8 }}>صافي ربحك الشهري المتوقع</div>
        <div style={{ fontSize: 34, fontWeight: 700, direction: "ltr", textAlign: "right" }}>
          {fmt(monthlyNet)} ر.س
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSave}>
          {fields.map((f) => (
            <div className="field" key={f.key}>
              <label>{f.label}</label>
              <input
                type="number"
                value={values[f.key]}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
              />
            </div>
          ))}
          <button className="primary" disabled={saving}>
            {saving ? "جاري الحفظ..." : "احفظ واحسب"}
          </button>
        </form>
      </div>

      {history.length > 0 && (
        <div className="card">
          <h3 style={{ marginBottom: 12 }}>آخر الحسابات المحفوظة</h3>
          {history.map((h) => {
            const net = (h.price - h.supplier - h.distributor - h.shipping - h.marketing) * h.orders;
            return (
              <div key={h.id} style={{ borderBottom: "1px solid var(--line)", padding: "10px 0", fontSize: 14 }}>
                <div>{new Date(h.created_at).toLocaleDateString("ar-SA")}</div>
                <div style={{ color: "var(--gold)", fontWeight: 700 }}>{fmt(net)} ر.س صافي شهري</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
