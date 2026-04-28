export default async function handler(req, res) {
  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageBase64, productDescription, apiKey } = req.body;

  if (!apiKey || !imageBase64 || !productDescription) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: 'image/jpeg',
                  data: imageBase64,
                },
              },
              {
                type: 'text',
                text: `Vytvor Instagram post pre značku HIPPY - ekologické športové oblečenie z Econyl materiálu vyrobené na Slovensku.

Produkt: ${productDescription}

Vygeneruj:
1. 3 caption varianty (storytelling, eco-focused, lifestyle)
2. 15-20 relevantných hashtags (ekológia, fitness, fashion, Slovakia)
3. Najlepší čas na postovanie (hour of day)
4. 2-3 ideas na Instagram Stories

Formát:
CAPTION 1:
[text]

CAPTION 2:
[text]

CAPTION 3:
[text]

HASHTAGS:
[hashtags]

BEST TIME:
[hour]

STORIES IDEAS:
[ideas]`,
              },
            ],
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
