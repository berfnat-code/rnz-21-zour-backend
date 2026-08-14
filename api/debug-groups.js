export default async function handler(req, res) {
  const clean = (v) => (v || '').replace(/[^\x20-\x7E]/g, '').trim();
  const raw = process.env.MAILERLITE_API_KEY || '';
  const cleanKey = clean(raw);

  const r = await fetch('https://connect.mailerlite.com/api/groups?limit=50', {
    headers: { Authorization: `Bearer ${cleanKey}` },
  });
  const data = await r.json();

  res.status(200).json({
    rawLength: raw.length,
    cleanLength: cleanKey.length,
    firstChars: cleanKey.slice(0, 6),
    lastChars: cleanKey.slice(-6),
    mailerliteResponse: data,
  });
}
