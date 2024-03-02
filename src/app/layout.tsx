import type { Metadata } from "next";
import "./globals.css";
import UiLibarayProvider from "@/providers/UiLibarayProvider";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutProvider from "@/providers/LayoutProvider";

export const metadata: Metadata = {
  title: "EventsYouLike",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <UiLibarayProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </UiLibarayProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
