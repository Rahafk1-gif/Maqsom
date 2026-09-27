import "./globals.css";

export const metadata = {
  title: "مقسوم — التاجر يقسّم أرباحه ويضمنها",
  description: "منصة تقسيم الأرباح الحقيقية لتجار التجارة الإلكترونية",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
