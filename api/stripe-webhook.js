export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const event = req.body;

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true });
  }

  const session = event.data.object;
  const email = session.customer_details?.email || session.customer_email;

  if (!email) {
    return res.status(400).json({ error: 'Email manquant dans la session' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  };

  // Générer un code lisible du type RNZ-XXXX-XXXX
  function generateCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let part = () =>
      Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `RNZ-${part()}-${part()}`;
  }

  const code = generateCode();

  // Enregistrer le code dans Supabase
  await fetch(`${SUPABASE_URL}/rest/v1/access_codes`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      code,
      email,
      stripe_session_id: session.id,
    }),
  });

  // Déclencher l'email MailerLite avec le code d'accès
  try {
    const mlHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
    };

    // Trouver le groupe "Acheteur 21 Zour" par son nom
    const groupsRes = await fetch(
      'https://connect.mailerlite.com/api/groups?filter[name]=Acheteur 21 Zour',
      { headers: mlHeaders }
    );
    const groupsData = await groupsRes.json();
    const groupId = groupsData?.data?.[0]?.id;

    if (!groupId) {
      console.error('Groupe MailerLite introuvable');
    } else {
      const mlRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: mlHeaders,
        body: JSON.stringify({
          email,
          fields: { code_acces: code },
          groups: [groupId],
        }),
      });
      if (!mlRes.ok) {
        console.error('Erreur MailerLite:', await mlRes.text());
      }
    }
  } catch (err) {
    console.error('Erreur appel MailerLite:', err);
  }

  return res.status(200).json({ received: true, code });
}
