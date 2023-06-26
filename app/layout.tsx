import "./globals.css";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Hacker Typer",
  description: "Hacker typer app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
