import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; // Updated fonts
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://qbridgelearn.com'),
  title: {
    default: 'qBridge — Quantum Computing Education',
    template: '%s | qBridge',
  },
  description: 'Free, beginner-friendly quantum computing courses for middle and high school students. Master the universe, one qubit at a time.',
  keywords: ['quantum computing', 'quantum education', 'free online courses', 'qubits', 'physics', 'STEM', 'high school', 'qBridge'],
  authors: [{ name: 'qBridge' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://qbridgelearn.com',
    siteName: 'qBridge',
    title: 'qBridge — Quantum Computing Education',
    description: 'Free, beginner-friendly quantum computing courses for middle and high school students. Master the universe, one qubit at a time.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'qBridge — Quantum Computing Education',
    description: 'Free, beginner-friendly quantum computing courses for middle and high school students.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#05050A] text-gray-200 flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
