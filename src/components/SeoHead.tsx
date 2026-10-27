import { useEffect } from "react";
import { BUSINESS, PRIMARY_DESCRIPTION, SITE_URL, SOCIAL_IMAGE } from "../seo";
import { SMARTPRINTS_FAQS } from "../data";

interface SeoHeadProps {
  isLocalLandingPage?: boolean;
}

export default function SeoHead({ isLocalLandingPage = false }: SeoHeadProps) {
  useEffect(() => {
    const title = isLocalLandingPage
      ? "Printing in Westlands Nairobi | 0743 603 068 | SmartPrints Hub"
      : "Printing in Westlands Nairobi | 0743 603 068 | SmartPrints Hub";
    const description = isLocalLandingPage
      ? PRIMARY_DESCRIPTION
      : PRIMARY_DESCRIPTION;
    const canonical = isLocalLandingPage ? `${SITE_URL}/printing-in-westlands/` : `${SITE_URL}/`;
    const pageSchema = isLocalLandingPage
      ? {
          "@type": "Service",
          name: "Printing services in Westlands",
          serviceType: "Printing and corporate branding",
          provider: { "@id": `${SITE_URL}/#business` },
          areaServed: { "@type": "Place", name: "Westlands, Nairobi, Kenya" },
          url: canonical,
          description
        }
      : null;
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["LocalBusiness", "PrintShop", "Organization"],
          "@id": `${SITE_URL}/#business`,
          name: BUSINESS.name,
          alternateName: BUSINESS.alternateName,
          description: BUSINESS.description,
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: BUSINESS.logo,
            contentUrl: BUSINESS.logo,
            width: 512,
            height: 512,
            caption: "SmartPrints Hub Official Logo"
          },
          image: [
            BUSINESS.logo,
            `${SITE_URL}/logo.png`,
            SOCIAL_IMAGE
          ],
          telephone: BUSINESS.phone,
          email: BUSINESS.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: BUSINESS.address,
            addressLocality: BUSINESS.locality,
            addressRegion: BUSINESS.region,
            addressCountry: BUSINESS.country
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: -1.26354,
            longitude: 36.80345
          },
          priceRange: "$$",
          sameAs: [
            BUSINESS.instagram,
            "https://wa.me/254743603068"
          ],
          areaServed: { "@type": "City", name: "Nairobi" },
          openingHoursSpecification: BUSINESS.hours.map((hours) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: hours.days,
            opens: hours.opens,
            closes: hours.closes
          }))
        },
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: BUSINESS.name,
          url: SITE_URL,
          publisher: { "@id": `${SITE_URL}/#business` }
        },
        ...(pageSchema ? [pageSchema] : []),
        ...(!isLocalLandingPage
          ? [
              {
                "@type": "FAQPage",
                mainEntity: SMARTPRINTS_FAQS.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: { "@type": "Answer", text: faq.a }
                }))
              }
            ]
          : [])
      ]
    };

    document.title = title;
    const setMeta = (selector: string, attribute: "name" | "property", content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, selector.includes("og:") || selector.includes("twitter:") ? selector.match(/['"]([^'"]+)['"]/)?.[1] || "" : selector.match(/['"]([^'"]+)['"]/)?.[1] || "");
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };
    const setLink = (rel: string, href: string) => {
      let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
    };

    setMeta('meta[name="description"]', "name", description);
    setMeta('meta[property="og:url"]', "property", canonical);
    setMeta('meta[property="og:title"]', "property", title);
    setMeta('meta[property="og:description"]', "property", description);
    setMeta('meta[property="og:image"]', "property", SOCIAL_IMAGE);
    setMeta('meta[name="twitter:url"]', "name", canonical);
    setMeta('meta[name="twitter:title"]', "name", title);
    setMeta('meta[name="twitter:description"]', "name", description);
    setMeta('meta[name="twitter:image"]', "name", SOCIAL_IMAGE);
    setLink("canonical", canonical);

    let schemaElement = document.head.querySelector<HTMLScriptElement>('script[data-smartprints-schema="true"]');
    if (!schemaElement) {
      const existing = document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
      if (existing) {
        schemaElement = existing;
        schemaElement.dataset.smartprintsSchema = "true";
      } else {
        schemaElement = document.createElement("script");
        schemaElement.type = "application/ld+json";
        schemaElement.dataset.smartprintsSchema = "true";
        document.head.appendChild(schemaElement);
      }
    }
    schemaElement.textContent = JSON.stringify(schema);
  }, [isLocalLandingPage]);

  return null;
}
