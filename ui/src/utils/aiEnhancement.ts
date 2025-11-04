export type AIProvider = 'openai' | 'gemini';

interface EnhanceTextParams {
  description: string;
  additionalInfo: string;
  provider: AIProvider;
}

interface EnhanceTextResponse {
  description: string;
  additionalInfo: string;
}

export async function enhanceText({
  description,
  additionalInfo,
  provider,
}: EnhanceTextParams): Promise<EnhanceTextResponse> {
  const apiKey =
    provider === 'openai'
      ? import.meta.env.VITE_OPENAI_API_KEY
      : import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_openai_api_key_here' || apiKey === 'your_gemini_api_key_here') {
    throw new Error(`Please configure your ${provider.toUpperCase()} API key in the .env file`);
  }

  const prompt = `You are a professional Arabic content enhancer. Enhance the following text to make it more professional, engaging, and clear while maintaining the original meaning. Keep the same language (Arabic).

Description: ${description}
Additional Info: ${additionalInfo}

Return ONLY a JSON object with this exact format:
{
  "description": "enhanced description here",
  "additionalInfo": "enhanced additional info here"
}`;

  if (provider === 'openai') {
    return await enhanceWithOpenAI(apiKey, prompt);
  } else {
    return await enhanceWithGemini(apiKey, prompt);
  }
}

async function enhanceWithOpenAI(apiKey: string, prompt: string): Promise<EnhanceTextResponse> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini', // Fast and cost-effective model with strong Arabic support
      messages: [
        {
          role: 'system',
          content: 'You are a professional content enhancer. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `OpenAI API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Validate response structure
  if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
    console.error('Invalid OpenAI response structure:', data);
    throw new Error('Invalid response from OpenAI API');
  }

  const content = data.choices[0].message.content;

  try {
    // Remove markdown code blocks if present
    const jsonContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(jsonContent);
  } catch (e) {
    console.error('Failed to parse OpenAI response:', content);
    throw new Error('Failed to parse OpenAI response. Please try again.');
  }
}

async function enhanceWithGemini(apiKey: string, prompt: string): Promise<EnhanceTextResponse> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `Gemini API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Validate response structure
  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
    console.error('Invalid Gemini response structure:', data);
    throw new Error('Invalid response from Gemini API');
  }

  const content = data.candidates[0].content.parts[0].text;

  try {
    // Remove markdown code blocks if present
    const jsonContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(jsonContent);
  } catch (e) {
    console.error('Failed to parse Gemini response:', content);
    throw new Error('Failed to parse Gemini response. Please try again.');
  }
}
