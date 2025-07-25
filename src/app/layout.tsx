import "./globals.css";
import { Inter } from "next/font/google";
import PageTransition from "../components/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     <body className={`${inter.className} relative overflow-hidden`}>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
