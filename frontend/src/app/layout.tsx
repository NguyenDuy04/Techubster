import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import ThemeProviders from "@/provider/theme-provider";
import { getLocale } from "next-intl/server";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Techubster",
  description: "Scalable technology e-commerce platform",
  icons: {
    icon: "/rentflow__logo.svg?v=1",
  },
};

export default async function RootLayout({
  children
}: LayoutProps<"/">) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={cn("antialiased")} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={cn(inter.variable, inter.className)}>
        <ThemeProviders>
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
