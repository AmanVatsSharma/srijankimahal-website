import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { generateMetadata, generateStructuredData } from "../lib/metadata";
import { GOOGLE_ANALYTICS } from "../lib/constants";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateStructuredData("website"),
      generateStructuredData("organization"),
      generateStructuredData("localbusiness"),
      generateStructuredData("lodgingbusiness"),
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS.measurementId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS.measurementId}');
          `}
        </Script>

        {/* Conversion Tracking */}
        <Script id="conversion-tracking" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': '${GOOGLE_ANALYTICS.conversionId}',
                  'value': 1.0,
                  'currency': 'INR',
                  'event_callback': callback
              });
              return false;
            }
          `}
        </Script>

        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Security Meta Tags */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="google-ads-disclosure" content="This site uses Google Ads for advertising purposes" />
      </head>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} bg-[#faf8f3] antialiased`}
      >
        {children}
        
        {/* Global error handler */}
        <Script id="error-handler" strategy="afterInteractive">
          {`
            window.addEventListener('error', (event) => {
              const target = event.target;
              if (target && target.tagName === 'IMG') {
                console.error('[Image Load Error]', target.src);
              }
            }, true);
          `}
        </Script>
      </body>
    </html>
  );
}
