import GlobalButton from "@/components/GlobalButton";
import "./globals.css";

export const metadata = {
  title: "Travles | Explore Incredible destinations",
  description:
    "Discover amazing travel destinations, plan your perfect trip, and explore the beauty of nature and culture with Travles.",
  keywords: [
    "travel",
    "tourism",
    "travel destinations",
    "vacation",
    "holiday",
    "travel packages",
    "explore places",
    "adventure travel",
    "cultural tours",
  ],
  authors: [{ name: "Travles Team", url: "https://travles-ten.vercel.app/" }],
  openGraph: {
    title: "Travles | Explore Incredible destinations",
    description:
      "Plan your dream trip with Travles. Explore top travel destinations and curated experiences.",
    url: "https://yourdomain.com",
    siteName: "Travles",
    images: [
      {
        url: "https://travles-ten.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Travles - Explore Incredible destinations",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://travles-ten.vercel.app/"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GlobalButton />
        {/* <AIChatPopup /> */}
      </body>
    </html>
  );
}
