export default async function handler(req, res) {
  // --- CORS ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email manquant' });

  const clean = (v) => (v || '').replace(/[^\x20-\x7E]/g, '').trim();
  const SUPABASE_URL = clean(process.env.SUPABASE_URL);
  const SUPABASE_KEY = clean(process.env.SUPABASE_SERVICE_KEY);
  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  };

  // Réponse volontairement identique dans tous les cas (email trouvé ou non),
  // pour ne jamais révéler à quelqu'un qui teste des adresses au hasard
  // si une adresse a acheté ou non.
  const genericResponse = () =>
    res.status(200).json({
      ok: true,
      message: 'Si sa lé adres-la lié a in achat, ou pé gayn out kod par mail dan kèk minut.',
    });

  try {
    const codeRes = await fetch(
      `${SUPABASE_URL}/rest/v1/access_codes?email=eq.${encodeURIComponent(email.trim().toLowerCase())}`,
      { headers }
    );
    const codes = await codeRes.json();

    if (!Array.isArray(codes) || !codes.length) {
      // email inconnu : on répond pareil, sans rien envoyer
      return genericResponse();
    }

    // s'il y a plusieurs achats pour le même email, on renvoie le plus récent
    const accessCode = codes[codes.length - 1];

    const cleanKey = clean(process.env.MAILERLITE_API_KEY);
    const mlHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cleanKey}`,
    };

    const groupsRes = await fetch('https://connect.mailerlite.com/api/groups?limit=50', {
      headers: mlHeaders,
    });
    const groupsData = await groupsRes.json();
    const groupId = groupsData?.data?.find((g) => g.name === 'Récupération code 21 Zour')?.id;

    if (groupId) {
      await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: mlHeaders,
        body: JSON.stringify({
          email: accessCode.email,
          fields: { code_acces: accessCode.code },
          groups: [groupId],
        }),
      });
    } else {
      console.error('Groupe MailerLite "Récupération code 21 Zour" introuvable');
    }
  } catch (err) {
    console.error('Erreur recover-code:', err);
    // même en cas d'erreur interne, on répond la même chose côté client
  }

  return genericResponse();
}
