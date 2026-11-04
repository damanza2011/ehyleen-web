/**
 * ============================================================================
 * EHYLEEN · Serverless Endpoint /api/lead
 * ============================================================================
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  const { name, phone, projectType, areaM2, zone } = req.body || {};

  if (!phone) {
    return res.status(400).json({ error: 'El teléfono es requerido.' });
  }

  // En producción se puede conectar a Supabase, Airtable o webhook de CRM
  console.log('[EHYLEEN LEAD CAPTURADO]', {
    timestamp: new Date().toISOString(),
    name: name || 'Cliente Web',
    phone,
    projectType,
    areaM2,
    zone
  });

  return res.status(200).json({
    ok: true,
    message: 'Lead registrado exitosamente con protocolo EHYLEEN VIP.'
  });
}
