const SITE_URL = 'https://cpcugr.vercel.app';

function generateRobotsTxt() {
  return `# *
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl-delay
Crawl-delay: 1
`;
}

function RobotsTxt() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const robotsTxt = generateRobotsTxt();

  res.setHeader('Content-Type', 'text/plain');
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
}

export default RobotsTxt;
