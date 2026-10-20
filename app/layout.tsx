import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Huddle | Find your people",
  description: "Discover campus clubs, communities, and activities at your university.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* Browser extensions such as Grammarly add attributes to body before hydration. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
