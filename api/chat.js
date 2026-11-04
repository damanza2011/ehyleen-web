/**
 * ============================================================================
 * EHYLEEN · Serverless Endpoint /api/chat
 * Asesor Botánico y Cuidado de Jardines en Barranquilla
 * Contacto Oficial: +57 (300) 594-5292
 * ============================================================================
 */

export default async function handler(req, res) {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Solo POST.' });
  }

  const { message, history } = req.body || {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'El campo message es obligatorio.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Fallback botánico inteligente si no hay API key configurada
  if (!apiKey) {
    return res.status(200).json({
      reply: `En **EHYLEEN** nos especializamos en servicios profesionales de jardinería en Barranquilla: mantenimiento preventivo, podas técnicas, siembra de plantas tropicales y suministro directo de viveros aliados en el Atlántico. Para coordinar una visita de diagnóstico para su jardín, puede escribirnos directamente al WhatsApp **300 594 5292**.`
    });
  }

  const systemPrompt = `Eres el asistente botánico de EHYLEEN, servicio profesional de jardinería de alta calidad en Barranquilla, Colombia.
Tu tono es sobrio, respetuoso, conocedor y técnico en botánica tropical.
No hables de temas inmobiliarios, preventas, construcciones ni arquitectura civil.
Tu especialidad es exclusivamente:
1. Mantenimiento periódico de jardines (corte de césped San Agustín o Trenza, perfilado, deshierbe, podas sanitarias y formativas).
2. Siembra y suministro de plantas tropicales aclimatadas al calor de Barranquilla (Palma Bismarckia, Ficus Lyrata, Monsteras, Heliconias, Crotones) provenientes de viveros aliados locales.
3. Nutrición del suelo con tierra negra abonada, cascarilla y humus de lombriz del Magdalena.
4. Sanidad vegetal (control ecológico de cochinilla algodonosa, hongos y deficiencias nutricionales).
El contacto del jardinero responsable es el WhatsApp: +57 300 594 5292.
Mantén respuestas concisas, claras y orientadas a agendar una visita de diagnóstico presencial.`;

  try {
    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: 'Entendido. Asesoraré con total sobriedad técnica sobre jardinería, cuidado vegetal y viveros en Barranquilla.' }] },
      ...(Array.isArray(history) ? history.slice(-4).map(h => ({
        role: h.sender === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
      })) : []),
      { role: 'user', parts: [{ text: message }] }
    ];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8500);

    const response = await fetch(geminiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Gemini API HTTP ${response.status}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({
      reply: candidate || 'Para una valoración presencial de su jardín, puede contactar al jardinero responsable al WhatsApp 300 594 5292.'
    });
  } catch (err) {
    console.error('Error en /api/chat:', err);
    return res.status(200).json({
      reply: 'Para evaluar las necesidades de su jardín en Barranquilla y coordinar una visita de diagnóstico, por favor comuníquese directamente al WhatsApp 300 594 5292.'
    });
  }
}
