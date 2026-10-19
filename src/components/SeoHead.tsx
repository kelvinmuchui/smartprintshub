import { useEffect } from "react";
import { BUSINESS, PRIMARY_DESCRIPTION, SITE_URL, SOCIAL_IMAGE } from "../seo";
import { SMARTPRINTS_FAQS } from "../data";

interface SeoHeadProps {
  isLocalLandingPage?: boolean;
}

export default function SeoHead({ isLocalLandingPage = false }: SeoHeadProps) {
  useEffect(() => {
    const title = isLocalLandingPage
      ? "Printing in Westlands Nairobi | SmartPrints Hub"
      : "Printing in Westlands Nairobi | SmartPrints Hub";
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
          description: BUSINESS.description,
          url: SITE_URL,
          telephone: BUSINESS.phone,
          email: BUSINESS.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: BUSINESS.address,
            addressLocality: BUSINESS.locality,
            addressRegion: BUSINESS.region,
            addressCountry: BUSINESS.country
          },
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

    document.head.querySelectorAll('script[type="application/ld+json"]').forEach((element) => element.remove());
    const schemaElement = document.createElement("script");
    schemaElement.type = "application/ld+json";
    schemaElement.dataset.smartprintsSchema = "true";
    schemaElement.textContent = JSON.stringify(schema);
    document.head.appendChild(schemaElement);

    return () => {
      schemaElement.remove();
    };
  }, [isLocalLandingPage]);

  return null;
}
