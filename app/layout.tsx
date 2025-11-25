import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MusicPlayerProvider } from "./components/MusicPlayer";
import MainLayout from "./components/MainLayout";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Music Hub - Discover Trending Music",
    description: "Discover trending songs, explore your favorite artists, and create the perfect playlist",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <MusicPlayerProvider>
                    <MainLayout>
                        {children}
                    </MainLayout>
                </MusicPlayerProvider>
            </body>
        </html>
    );
}
