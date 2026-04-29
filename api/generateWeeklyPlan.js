export default async function handler(req, res) {
  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { apiKey } = req.body;

  if (!apiKey) {
    return res.status(400).json({ error: 'Missing API key' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 3000,
        messages: [
          {
            role: 'user',
            content: `Vytvor týždenný content plán pre Instagram značky HIPPY - ekologické športové oblečenie z Econyl vyrobené na Slovensku.

Značka: Ženy 20-50 rokov, fitness/wellness, eco-conscious.
Produkty: Legíny SUNSET, ELLA; Podprsenka LILLY
Zámer: 3 príspevky týždenne

Vygeneruj konkrétne ideáky na TÚTO NEDEĽU až NASLEDUJÚCU NEDEĽU (7 dní):

Pre každý deň:
DEN: [deň týždňa]
TÉMA: [názov príspevku]
TYP: [Video/Foto/Reel]
CO ROBIŤ: [konkrétne čo fotit/videovať]
SKRIPT: [čo presne robiť, krok za krokom]
ÚSPORA ČASU: [ako dlho to bude trvať]

Zameraj sa na:
- Behind-the-scenes (výroba, krajčírka, procesy)
- Econyl story (oceán, recyklácia, plasty)
- Product features (detaily, fit, komfort)
- Customer testimonials style (ako to vyzerá na tele)
- Seasonal/trending topics

Formát - konkrétne a praktické, nie všeobecné!`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({
        error: errorData.error?.message || 'API error',
      });
    }

    const data = await response.json();
    const content = data.content[0].text;

    return res.status(200).json({ content });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
