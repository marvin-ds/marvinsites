const site = 'https://marvinsites.com.br';

const pages = [
  { url: '/',                    priority: '1.0', changefreq: 'weekly' },
  { url: '/nichos/clinicas',     priority: '0.9', changefreq: 'monthly' },
  { url: '/nichos/contadores',   priority: '0.9', changefreq: 'monthly' },
  { url: '/nichos/reformas',     priority: '0.9', changefreq: 'monthly' },
  { url: '/nichos/estetica',     priority: '0.9', changefreq: 'monthly' },
  { url: '/nichos/turismo',      priority: '0.9', changefreq: 'monthly' },
  { url: '/nichos/professores',  priority: '0.9', changefreq: 'monthly' },
  { url: '/privacidade',         priority: '0.3', changefreq: 'yearly' },
  { url: '/termos',              priority: '0.3', changefreq: 'yearly' },
];

const today = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${site}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

export async function GET() {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
