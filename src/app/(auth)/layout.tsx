import Link from "next/link";
import { Gavel } from "lucide-react";
import { APP_NAME, APP_FULL_NAME } from "@/lib/constants";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-8 h-8 bin-gradient rounded-lg flex items-center justify-center">
            <Gavel className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-xl bin-gradient-text">{APP_NAME}</span>
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {APP_FULL_NAME}. All rights reserved.
      </footer>
    </div>
  );
}