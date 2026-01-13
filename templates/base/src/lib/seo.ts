import type {
  WebSite,
  Organization,
  BreadcrumbList,
  WithContext,
} from "schema-dts";
import type { Metadata, Viewport } from "next";
import { SITE_CONFIG, META_THEME_COLORS } from "@/config/site";

// Page-Specific Metadata
interface PageMetadataProps {
  title: string;
  description?: string;
  image?: string;
  path?: string;
}

export function getPageMetadata({
  title,
  description,
  image,
  path = "",
}: PageMetadataProps): Metadata {
  const metaTitle = `${title} - ${SITE_CONFIG.name}`;
  const metaDescription = description ?? SITE_CONFIG.description;
  const metaImage = image ?? SITE_CONFIG.ogImage;
  const sitePath = path
    ? `${SITE_CONFIG.url.replace(/\/$/, "")}/${path.replace(/^\//, "")}`
    : SITE_CONFIG.url;

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title,
    description: metaDescription,
    alternates: {
      canonical: sitePath,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: sitePath,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: metaTitle,
      description: metaDescription,
      card: "summary_large_image",
      images: [metaImage],
    },
  };
}

// Default Site Metadata
export function getMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: "/",
    },

    title: {
      template: `%s - ${SITE_CONFIG.name}`,
      default: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    },

    description: SITE_CONFIG.description,
    keywords: SITE_CONFIG.keywords,
    authors: [
      {
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
    ],

    creator: SITE_CONFIG.name,
    openGraph: {
      siteName: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      type: "website",
      locale: "en_US",
      title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
      description: SITE_CONFIG.shortDescription,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
      description: SITE_CONFIG.shortDescription,
      images: [SITE_CONFIG.ogImage],
    },

    icons: {
      icon: [
        { url: "/favicon/favicon.ico", sizes: "any" },
        { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      ],
      apple: {
        url: "/favicon/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

// Viewport with Theme Colors
export function getViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
      {
        media: "(prefers-color-scheme: light)",
        color: META_THEME_COLORS.light,
      },
      { media: "(prefers-color-scheme: dark)", color: META_THEME_COLORS.dark },
    ],
  };
}

// Structured Data (JSON-LD)
export function getWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    alternateName: SITE_CONFIG.alternateNames,
  };
}

export function getOrganizationJsonLd(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/favicon/favicon.svg`,
    sameAs: [
      `https://twitter.com/${SITE_CONFIG.twitterHandle.replace("@", "")}`,
      "https://github.com/AudoraLabs",
    ],
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbJsonLd(
  items: BreadcrumbItem[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
