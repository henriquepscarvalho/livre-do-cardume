import type { Metadata } from "next";
import { Space_Grotesk, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--body",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Livre do Cardume — Vieses cognitivos com humor e sem piedade",
  description:
    "A newsletter semanal que mostra por que você pensa igual a todo mundo achando que pensa diferente. Um viés cognitivo por semana, com humor ácido e sem piedade.",
  openGraph: {
    title: "Livre do Cardume",
    description: "Vieses cognitivos com humor e sem piedade.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/images/logo-final/favicon-32.png",
    apple: "/images/logo-final/favicon-180.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="scroll-smooth dark">
      <body className={`${spaceGrotesk.variable} ${sourceSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
