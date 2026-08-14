export default async function handler(req, res) {
  const clean = (v) => (v || '').replace(/[^\x20-\x7E]/g, '').trim();
  const cleanKey = clean(process.env.MAILERLITE_API_KEY);

  const r = await fetch('https://connect.mailerlite.com/api/groups?limit=50', {
    headers: { Authorization: `Bearer ${cleanKey}` },
  });
  const data = await r.json();
  res.status(200).json(data);
}
