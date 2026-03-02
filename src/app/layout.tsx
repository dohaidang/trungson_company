import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { CartProvider } from "@/lib/CartContext";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { getSettings } from "@/app/actions/setting";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ SẢN XUẤT VẬT LIỆU XÂY DỰNG TRUNG SƠN",
  description: "Cung cấp vật liệu xây dựng cao cấp - Gạch, Block, Vật liệu xây dựng chất lượng cao",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settingsResult = await getSettings();
  const settings = settingsResult.settings || {};
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <SessionProvider>
          <CartProvider>
            <div className="relative flex min-h-screen flex-col w-full overflow-x-hidden">
              <Header settings={settings} />
              <main className="flex-1 w-full">{children}</main>
              <Footer settings={settings} />
              <ScrollToTop />
            </div>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
