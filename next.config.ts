import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [],
    remotePatterns: [],
  },
  
  // Add redirects for incorrect URL patterns
  async redirects() {
    return [
      // Only redirect category-first URLs to city-first format
      // For example: /trans/fiesole/incontri-trans-in-fiesole -> /fiesole/trans/incontri-trans-in-fiesole
      {
        source: '/:potentialCategorySlug(gay|milf|donne|ragazze|trans|trav|escort)/:potentialCitySlug/incontri-:matchingCategory-in-:matchingCity',
        destination: '/:potentialCitySlug/:potentialCategorySlug/incontri-:matchingCategory-in-:matchingCity',
        permanent: true,
      },
      // Redirect article paths from search engines
      {
        source: '/:potentialCategorySlug(gay|milf|donne|ragazze|trans|trav|escort)/:potentialCitySlug/:path*',
        destination: '/:potentialCitySlug/:potentialCategorySlug/:path*',
        permanent: true,
        has: [
          {
            type: 'header',
            key: 'referer',
            value: '.*(google|bing|yahoo).*',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
