import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: "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",
})

export async function POST(request: NextRequest) {
  try {
    const { messages, useCase } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    // Create system message based on use case
    const systemMessage = getSystemMessage(useCase)
    const formattedMessages = [{ role: "system", content: systemMessage }, ...messages]

    const completion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: "llama-3.1-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      stream: true,
    })

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || ""
            if (content) {
              const data = JSON.stringify({
                choices: [{ delta: { content } }],
              })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"))
          controller.close()
        } catch (error) {
          console.error("Streaming error:", error)
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Petrix API error:", error)
    return NextResponse.json({ error: "Failed to process request. Please try again." }, { status: 500 })
  }
}

function getSystemMessage(useCase: string): string {
  const systemMessages = {
    general:
      "You are Petrix, a helpful AI assistant for Proconnect. Provide clear, concise, and professional responses.",
    coding:
      "You are Petrix, a coding assistant for Proconnect. Help users with programming questions, code reviews, and technical guidance.",
    career:
      "You are Petrix, a career advisor for Proconnect. Provide professional career guidance, resume tips, and networking advice.",
    learning:
      "You are Petrix, a learning mentor for Proconnect. Help users with educational content, skill development, and learning paths.",
  }
  return systemMessages[useCase as keyof typeof systemMessages] || systemMessages.general
}
