import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <main className="flex-1 flex flex-col">
            <div className="flex-1 bg-gray-100">
              {children}
              <ToastContainer limit={1} />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}