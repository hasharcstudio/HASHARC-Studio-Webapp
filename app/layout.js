import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Hasharc Studio | Professional Web Design & Development",
  description: "We design and develop custom websites that drive results — helping your business get found, build trust, and convert visitors into customers. Web development, UI/UX design, and branding services.",
  keywords: ["web development", "web design", "UI/UX design", "logo design", "poster design", "Hasharc Studio", "Bangladesh"],
  authors: [{ name: "Hasharc Studio" }],
  openGraph: {
    title: "Hasharc Studio | Professional Web Design & Development",
    description: "We craft custom websites that drive results — helping your business get found, build trust, and convert visitors into customers.",
    url: "https://hasharcstudio.com",
    siteName: "Hasharc Studio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasharc Studio | Professional Web Design & Development",
    description: "We craft custom websites that drive results — helping your business get found, build trust, and convert visitors into customers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
