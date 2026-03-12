import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/components/shared/QueryProvider";
import AuthProvider from "@/components/shared/AuthProvider";
import { APP_FULL_NAME, APP_DESCRIPTION } from "@/lib/constants";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: `BIN — ${APP_FULL_NAME}`,
    template: `%s | BIN`,
  },
  description: APP_DESCRIPTION,
  keywords: ["auction", "nepal", "second-hand", "buy", "sell", "bid", "marketplace"],
  authors: [{ name: "BIN Team" }],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: `BIN — ${APP_FULL_NAME}`,
    description: APP_DESCRIPTION,
    type: "website",
    locale: "en_NP",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}>
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster
            position="top-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "hsl(20 12% 7%)",
                border: "1px solid hsl(20 10% 15%)",
                color: "hsl(35 25% 94%)",
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}