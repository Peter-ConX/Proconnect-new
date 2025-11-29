import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

// Get API key from environment variables
const openaiApiKey = process.env.OPENAI_API_KEY

if (!openaiApiKey) {
  console.error("Missing OPENAI_API_KEY environment variable")
}

const openai = openaiApiKey
  ? new OpenAI({
      apiKey: openaiApiKey,
    })
  : null

export async function POST(request: NextRequest) {
  try {
    if (!openai || !openaiApiKey) {
      return NextResponse.json(
        {
          error: "API key not configured. Please set OPENAI_API_KEY environment variable.",
        },
        { status: 500 }
      )
    }

    const { messages, useCase } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    // Create system message based on use case
    const systemMessage = getSystemMessage(useCase)
    const formattedMessages = [{ role: "system", content: systemMessage }, ...messages]

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: formattedMessages,
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
  } catch (error: any) {
    console.error("Petrix API error:", error)
    const errorMessage =
      error?.message || error?.error?.message || "Failed to process request. Please try again."
    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error?.stack : undefined,
      },
      { status: 500 }
    )
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
