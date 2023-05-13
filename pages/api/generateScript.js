import { NextRequest, NextResponse } from "next/server";


export default async function handler(req , res) {
  const { tweet, style, length } = req.body;

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT; // Feel free to send me a DM on Twitter (@mwalts0) if you are curious about this prompt.

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "system", "content": SYSTEM_PROMPT}, { "role": "user", "content": `Idea: "${tweet}"\nStyle: "${style}"\nLength: "${length}"\nShort-form script:` }],
      temperature: 0.8
    })
  });

  const data = await response.json();

  // console.log(data.choices[0].message.content);

  res.status(200).json(data.choices[0].message.content);
}
