import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_API_KEY,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
  dangerouslyAllowBrowser: true
})

export default async function main () {
  const response = await openai.chat.completions.create({
    model: 'gemini-2.0-flash',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: 'HI, how are you!?'
      }
    ]
  })

  return response.choices[0];
 
}
