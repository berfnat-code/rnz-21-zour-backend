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

  // TODO : déclencher l'email MailerLite ici (prochaine étape)

  return res.status(200).json({ received: true, code });
}
