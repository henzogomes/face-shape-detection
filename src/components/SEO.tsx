import React from "react";
import { APP_NAME, APP_DESCRIPTION, APP_BASE_URL } from "../Constants";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  path?: string;
  structuredData?: Record<string, any>;
}

const SEO = ({
  title,
  description = APP_DESCRIPTION,
  keywords = "face shape, face detection, facial analysis, AI face shape detection",
  image = "/social-preview.png",
  type = "website",
  path = "",
  structuredData,
}: SEOProps) => {
  // Create full title with site name
  const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
  const url = `${APP_BASE_URL}${path}`;
  const fullImageUrl = image.startsWith("http")
    ? image
    : `${APP_BASE_URL}${image}`;

  return (
    <>
      {/* Standard metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content={APP_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Mobile viewport optimization */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />

      {/* Structured data for better SEO */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </>
  );
};

export default SEO;
