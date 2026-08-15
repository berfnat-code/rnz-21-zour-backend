export default async function handler(req, res) {
  // --- CORS ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const { code, deviceId } = req.body;
  if (!code) return res.status(400).json({ error: 'Code manquant' });

  const clean = (v) => (v || '').replace(/[^\x20-\x7E]/g, '').trim();

  const SUPABASE_URL = clean(process.env.SUPABASE_URL);
  const SUPABASE_KEY = clean(process.env.SUPABASE_SERVICE_KEY);
  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  };

  const codeRes = await fetch(
    `${SUPABASE_URL}/rest/v1/access_codes?code=eq.${encodeURIComponent(code)}`,
    { headers }
  );
  const codes = await codeRes.json();
  if (!codes.length) return res.status(404).json({ ok: false, reason: 'code_introuvable' });

  const accessCode = codes[0];

  const actRes = await fetch(
    `${SUPABASE_URL}/rest/v1/activations?code_id=eq.${accessCode.id}&device_fingerprint=eq.${encodeURIComponent(deviceId || '')}`,
    { headers }
  );
  const existing = await actRes.json();

  if (!existing.length) {
    if (accessCode.activations_used >= accessCode.activations_max) {
      return res.status(403).json({ ok: false, reason: 'limite_atteinte' });
    }
    await fetch(`${SUPABASE_URL}/rest/v1/activations`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ code_id: accessCode.id, device_fingerprint: deviceId || null }),
    });
    await fetch(`${SUPABASE_URL}/rest/v1/access_codes?id=eq.${accessCode.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ activations_used: accessCode.activations_used + 1 }),
    });
  }

  const progRes = await fetch(
    `${SUPABASE_URL}/rest/v1/progress?code_id=eq.${accessCode.id}`,
    { headers }
  );
  const progress = await progRes.json();

  return res.status(200).json({
    ok: true,
    done: progress[0]?.done || [],
    notes: progress[0]?.notes || {},
  });
}
