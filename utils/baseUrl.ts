export default function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.ASTRO_BASE_URL) {
    return process.env.ASTRO_BASE_URL;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
