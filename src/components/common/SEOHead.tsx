import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItemSchema {
  question: string;
  answer: string;
}

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogTitle?: string;
  ogDescription?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItemSchema[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath,
  ogTitle,
  ogDescription,
  breadcrumbs,
  faqs
}) => {
  const location = useLocation();
  const baseDomain = 'https://mobileswholesale.co.uk';
  const rawPath = canonicalPath || location.pathname;
  const fullCanonicalUrl = rawPath.startsWith('http') ? rawPath : `${baseDomain}${rawPath.startsWith('/') ? '' : '/'}${rawPath}`;

  useEffect(() => {
    // 1. Page Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMetaTag = (selector: string, attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${selector}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Meta Description
    setMetaTag('name', 'name', 'description', description);

    // Open Graph
    setMetaTag('property', 'property', 'og:title', ogTitle || title);
    setMetaTag('property', 'property', 'og:description', ogDescription || description);
    setMetaTag('property', 'property', 'og:type', 'website');
    setMetaTag('property', 'property', 'og:url', fullCanonicalUrl);

    // 3. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 4. Injects BreadcrumbList JSON-LD Schema if breadcrumbs provided
    const breadcrumbScriptId = 'seo-jsonld-breadcrumbs';
    let existingBreadcrumbScript = document.getElementById(breadcrumbScriptId);
    if (breadcrumbs && breadcrumbs.length > 0) {
      if (!existingBreadcrumbScript) {
        existingBreadcrumbScript = document.createElement('script');
        existingBreadcrumbScript.id = breadcrumbScriptId;
        existingBreadcrumbScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(existingBreadcrumbScript);
      }
      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((b, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': b.name,
          'item': b.url.startsWith('http') ? b.url : `${origin}${b.url}`
        }))
      };
      existingBreadcrumbScript.textContent = JSON.stringify(schemaData);
    } else if (existingBreadcrumbScript) {
      existingBreadcrumbScript.remove();
    }

    // 5. Injects FAQPage JSON-LD Schema if faqs provided
    const faqScriptId = 'seo-jsonld-faqs';
    let existingFaqScript = document.getElementById(faqScriptId);
    if (faqs && faqs.length > 0) {
      if (!existingFaqScript) {
        existingFaqScript = document.createElement('script');
        existingFaqScript.id = faqScriptId;
        existingFaqScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(existingFaqScript);
      }
      const faqSchemaData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      };
      existingFaqScript.textContent = JSON.stringify(faqSchemaData);
    } else if (existingFaqScript) {
      existingFaqScript.remove();
    }

    return () => {
      // Cleanup dynamically injected schema scripts on unmount
      const bc = document.getElementById(breadcrumbScriptId);
      if (bc) bc.remove();
      const fq = document.getElementById(faqScriptId);
      if (fq) fq.remove();
    };
  }, [title, description, fullCanonicalUrl, ogTitle, ogDescription, breadcrumbs, faqs]);

  return null;
};
