/**
 * ============================================================================
 * EHYLEEN · Serverless Endpoint /api/chat
 * Cumple con validación estricta, timeouts, seguridad y soporte Gemini
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

  // Fallback botánico inteligente si no hay API key configurada en local/Vercel
  if (!apiKey) {
    return res.status(200).json({
      reply: `🌿 Como asesora botánica de **EHYLEEN** en Barranquilla, puedo decirte que para tu consulta (*"${message.slice(0, 40)}..."*), contamos con especies aclimatadas al clima tropical como Palma Bismarckia, Monsteras XL y sistemas de bioarquitectura. Te sugiero conectar con nuestro equipo por la pestaña **Concierge** para estructurar tu proyecto.`
    });
  }

  const systemPrompt = `Eres Ehyleen Asesora, experta botánica y paisajista senior de la prestigiosa firma EHYLEEN en Barranquilla, Colombia.
Tu tono es sofisticado, cálido, profesional y editorial (estilo Architectural Digest / Raymond Jungles).
Conoces a profundidad el clima cálido, la brisa marina y la humedad del Atlántico colombiano (Altos de Riomar, Villa Campestre, Lagos del Caujaral, Puerto Colombia).
Recomiendas especies viables: Palmas Bismarckia, Heliconias, Monsteras Deliciosas, Ficus Lyrata, xerojardinería, muros verdes hidropónicos y sustratos aireados del Magdalena.
Mantén respuestas concisas (máximo 3 párrafos), inspiradoras y siempre invita a concretar una visita técnica a través del Concierge de WhatsApp.`;

  try {
    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: 'Entendido. Estoy lista para asesorar a los clientes más exigentes con el más alto estándar botánico y paisajístico en Barranquilla.' }] },
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
      throw new Error(`Gemini API respondió con status ${response.status}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({
      reply: candidate || 'Un asesor botánico de EHYLEEN estará encantado de coordinar una visita técnica contigo vía WhatsApp.'
    });
  } catch (err) {
    console.error('Error en /api/chat:', err);
    return res.status(200).json({
      reply: '🌿 Para evaluar tu requerimiento botánico en Barranquilla con total precisión climática, te invito a pulsar la pestaña **"Concierge"** para coordinar una visita presencial con nuestro agrónomo director.'
    });
  }
}
