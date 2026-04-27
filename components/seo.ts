import type { Metadata } from "next";

const SITE_NAME = "NextCommerce";
const BASE_DESCRIPTION =
  "NextCommerce is a modern e-commerce mini app with product discovery, filtering, cart management, and fast browsing.";

type BuildSeoMetadataInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function buildSeoMetadata({
  title,
  description,
  path,
  noIndex = false,
}: BuildSeoMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type: "website",
      url: path,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export const seoDefaults = {
  siteName: SITE_NAME,
  baseDescription: BASE_DESCRIPTION,
};
