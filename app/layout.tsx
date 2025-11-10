import type { Metadata } from "next";
// Importamos la fuente que Next.js usa por defecto (Inter)
import { Inter } from "next/font/google"; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Metadata para SEO
export const metadata: Metadata = {
  title: "Buscador de Oficinas",
  description: "Buscador simple de ubicaciones laborales y salas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* El body aplica la fuente Inter y un estilo de anti-aliasing.
        El color de fondo general lo gestionaremos en page.tsx
      */}
      <body className={inter.className + " antialiased"}>
        {children}
      </body>
    </html>
  );
}