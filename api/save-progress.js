export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const { code, done, notes } = req.body;
  if (!code) return res.status(400).json({ error: 'Code manquant' });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  };

  // 1. Retrouver l'id du code d'accès
  const codeRes = await fetch(
    `${SUPABASE_URL}/rest/v1/access_codes?code=eq.${encodeURIComponent(code)}`,
    { headers }
  );
  const codes = await codeRes.json();
  if (!codes.length) return res.status(404).json({ ok: false, reason: 'code_introuvable' });

  const accessCode = codes[0];

  // 2. Vérifier si une ligne de progression existe déjà pour ce code
  const progRes = await fetch(
    `${SUPABASE_URL}/rest/v1/progress?code_id=eq.${accessCode.id}`,
    { headers }
  );
  const existingProgress = await progRes.json();

  if (existingProgress.length) {
    // Mettre à jour la progression existante
    await fetch(`${SUPABASE_URL}/rest/v1/progress?code_id=eq.${accessCode.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        done: done || [],
        notes: notes || {},
        updated_at: new Date().toISOString(),
      }),
    });
  } else {
    // Créer une nouvelle ligne de progression
    await fetch(`${SUPABASE_URL}/rest/v1/progress`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        code_id: accessCode.id,
        done: done || [],
        notes: notes || {},
      }),
    });
  }

  return res.status(200).json({ ok: true });
}





