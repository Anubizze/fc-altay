import { cookies } from "next/headers";
import { Montserrat } from "next/font/google";
import type { ReactNode } from "react";

import type { AppLocale } from "@/shared/lib/locale-path";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"]
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const cookieLocale = cookies().get("NEXT_LOCALE")?.value;
  const htmlLang: AppLocale = cookieLocale === "kk" ? "kk" : "ru";

  return (
    <html lang={htmlLang} className={montserrat.className}>
      <body>{children}</body>
    </html>
  );
}
