import { Metadata } from "next";
import { BUSINESS_INFO, SEO_DEFAULTS } from "./constants";

interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description = SEO_DEFAULTS.defaultDescription,
  path = "",
  ogImage = SEO_DEFAULTS.ogImage,
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const fullTitle = title ? `${title} | ${SEO_DEFAULTS.siteName}` : SEO_DEFAULTS.defaultTitle;
  const url = `${SEO_DEFAULTS.defaultTitle.replace(/\s+/g, '-').toLowerCase()}.in${path}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "Sri Janaki Mahal",
      "Ayodhya accommodation",
      "Spiritual dharmshala",
      "Ram Mandir stay",
      "Ayodhya hotel",
      "Pilgrim accommodation",
      "Sacred stay",
      "Ayodhya booking",
      "Spiritual retreat",
      "Temple stay",
    ],
    authors: [{ name: SEO_DEFAULTS.siteName }],
    creator: SEO_DEFAULTS.siteName,
    publisher: SEO_DEFAULTS.siteName,
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    openGraph: {
      type: "website",
      locale: SEO_DEFAULTS.locale,
      url,
      title: fullTitle,
      description,
      siteName: SEO_DEFAULTS.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: SEO_DEFAULTS.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
    other: {
      "theme-color": "#d4a574",
      "msapplication-TileColor": "#d4a574",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
    },
  };
}

export function generateStructuredData(type: "website" | "organization" | "localbusiness" | "lodgingbusiness") {
  const baseUrl = "https://srijanakimahaltrust.in";
  
  const baseOrg = {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: BUSINESS_INFO.name,
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/favicon.svg`,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS_INFO.phone,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN",
      hoursAvailable: "24/7",
    },
    email: BUSINESS_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    foundingDate: BUSINESS_INFO.foundingDate,
    legalName: BUSINESS_INFO.legalName,
    description: BUSINESS_INFO.description,
    sameAs: [BUSINESS_INFO.social.whatsapp],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const localBusiness = {
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    name: BUSINESS_INFO.name,
    image: `${baseUrl}/og.jpg`,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    url: baseUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_INFO.address.coordinates.latitude,
      longitude: BUSINESS_INFO.address.coordinates.longitude,
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "₹₹",
    description: BUSINESS_INFO.description,
  };

  const lodgingBusiness = {
    "@type": "LodgingBusiness",
    "@id": `${baseUrl}/#lodgingbusiness`,
    name: BUSINESS_INFO.name,
    image: `${baseUrl}/og.jpg`,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    url: baseUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_INFO.address.coordinates.latitude,
      longitude: BUSINESS_INFO.address.coordinates.longitude,
    },
    checkinTime: "14:00",
    checkoutTime: "12:00",
    priceRange: "₹1,250 - ₹4,150",
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "All Meals Included",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "24/7 Customer Support",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Hot Water",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Spiritual Environment",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Near Ram Mandir",
        value: true,
      },
    ],
    starRating: {
      "@type": "Rating",
      ratingValue: "4.5",
    },
  };

  switch (type) {
    case "website":
      return website;
    case "organization":
      return baseOrg;
    case "localbusiness":
      return localBusiness;
    case "lodgingbusiness":
      return lodgingBusiness;
    default:
      return website;
  }
}
