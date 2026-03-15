import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Forest City Digital - Websites That Bring Customers",
  description:
    "Forest City Digital builds websites for local businesses that actually bring you customers. We specialize in trades and small businesses in London, ON. Starting at $999.",
  openGraph: {
    title: "Forest City Digital - Websites That Bring Customers",
    description:
      "Websites for trades and local small businesses. Fast, mobile-friendly, lead-focused. London, ON. Starting at $999.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
