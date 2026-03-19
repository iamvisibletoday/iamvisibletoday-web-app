import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { OrganizationStructuredData, WebSiteStructuredData } from "@/components/seo/StructuredData";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({ 
  subsets: ["latin"],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://iamvisibletoday.com'),
  title: {
    default: 'I Am Visible Today™ - Share Your Mental Health Story Anonymously',
    template: '%s | I Am Visible Today™',
  },
  description: "A safe space to share your mental health story anonymously. Human-curated, ad-free, privacy-first.",
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${lora.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <OrganizationStructuredData />
        <WebSiteStructuredData />
      </head>
      <body className="font-sans bg-rose-50 dark:bg-dark-bg-primary text-text-primary dark:text-dark-text-primary antialiased min-h-screen flex flex-col transition-colors duration-200">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}