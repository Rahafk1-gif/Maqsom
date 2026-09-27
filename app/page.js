import Link from "next/link";

export default function Home() {
  return (
    <div className="wrap">
      <h1 style={{ fontSize: 40, marginBottom: 6 }}>
        مقسوم<span style={{ color: "var(--gold)" }}>.</span>
      </h1>
      <p style={{ color: "var(--ink-soft)", fontSize: 16, marginBottom: 28 }}>
        التاجر يقسّم أرباحه ويضمنها — منصة تقسيم الأرباح الحقيقية لتجار التجارة الإلكترونية
      </p>

      <div className="card">
        <p style={{ marginBottom: 18 }}>
          سجّل كل تكاليفك — المورّد، الموزّع، الشحن والتغليف، التسويق — وشوف صافي ربحك
          الحقيقي محفوظ لك في حسابك، أول بأول.
        </p>
        <Link href="/signup">
          <button className="primary">إنشاء حساب تاجر</button>
        </Link>
        <div style={{ height: 10 }} />
        <Link href="/login">
          <button className="ghost">لدي حساب — تسجيل الدخول</button>
        </Link>
      </div>
    </div>
  );
}
