import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apolonio",
  description: "Ajuda uma senhora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 antialiased text-gray-800">
        <div className="w-full h-screen flex">
          {/* Chat Area */}
          <main className="flex-1 flex flex-col">
            {/* Componente Conversa */}
            <div className="flex-1 bg-gray-100">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}