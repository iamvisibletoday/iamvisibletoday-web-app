/**
 * JSON-LD structured data components for SEO
 * Schema.org markup for better search engine understanding
 */

interface OrganizationSchema {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  description: string
  contactPoint: {
    '@type': 'ContactPoint'
    email: string
    contactType: string
  }
  sameAs: string[]
}

interface WebSiteSchema {
  '@context': 'https://schema.org'
  '@type': 'WebSite'
  name: string
  url: string
  description: string
  potentialAction: {
    '@type': 'SearchAction'
    target: string
    'query-input': string
  }
}

interface ArticleSchema {
  '@context': 'https://schema.org'
  '@type': 'Article'
  headline: string
  datePublished: string
  author: {
    '@type': 'Organization'
    name: string
  }
  publisher: {
    '@type': 'Organization'
    name: string
    logo: {
      '@type': 'ImageObject'
      url: string
    }
  }
}

/**
 * Organization structured data
 * Helps Google understand the organization behind the website
 */
export function OrganizationStructuredData() {
  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'I Am Visible Today',
    url: 'https://iamvisibletoday.com',
    logo: 'https://iamvisibletoday.com/logo.png',
    description:
      'Privacy-first mental health story archive where people share visibility moments anonymously.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@iamvisibletoday.com',
      contactType: 'Customer Support',
    },
    sameAs: [
      'https://ko-fi.com/iamvisibletoday',
      'https://github.com/iamvisibletoday/web-app',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Website structured data
 * Helps Google understand search functionality on the site
 */
export function WebSiteStructuredData() {
  const schema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'I Am Visible Today',
    url: 'https://iamvisibletoday.com',
    description:
      'A safe space to share your mental health story anonymously. No ads, no algorithms, just human connection.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://iamvisibletoday.com/archive?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Article structured data
 * Used for story pages (though stories themselves aren't indexed)
 */
export function ArticleStructuredData({
  title,
  publishedDate,
}: {
  title: string
  publishedDate: string
}) {
  const schema: ArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    datePublished: publishedDate,
    author: {
      '@type': 'Organization',
      name: 'I Am Visible Today',
    },
    publisher: {
      '@type': 'Organization',
      name: 'I Am Visible Today',
      logo: {
        '@type': 'ImageObject',
        url: 'https://iamvisibletoday.com/logo.png',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
