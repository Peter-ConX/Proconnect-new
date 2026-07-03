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
    const { messages, useCase } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    const encoder = new TextEncoder()

    if (!openai || !openaiApiKey) {
      // Stream simulated mock canned responses
      const stream = new ReadableStream({
        async start(controller) {
          try {
            const responseText = getCannedResponse(messages, useCase)
            // Split into small character blocks to stream with a typing delay
            const chunks = responseText.match(/.{1,4}/g) || [responseText]
            for (const chunk of chunks) {
              const data = JSON.stringify({
                choices: [{ delta: { content: chunk } }],
              })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
              await new Promise((resolve) => setTimeout(resolve, 30))
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"))
            controller.close()
          } catch (error) {
            console.error("Mock streaming error:", error)
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

function getCannedResponse(messages: any[], useCase: string): string {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ""
  
  if (lastMessage.includes("hello") || lastMessage.includes("hi") || lastMessage.includes("hey")) {
    return "Hello! I am Petrix, your AI professional assistant. I can help you review your code, refine your design systems, explore career tracks, or suggest learning paths. What are you working on today?"
  }
  
  if (useCase === "coding" || lastMessage.includes("code") || lastMessage.includes("react") || lastMessage.includes("next")) {
    return "Next.js 15 uses server components by default. For interactive elements, remember to add the `'use client'` directive at the top of your file. If you are building a custom hook, use React state to capture component updates. Let me know if you need code snippets!"
  }
  
  if (useCase === "career" || lastMessage.includes("career") || lastMessage.includes("resume") || lastMessage.includes("job")) {
    return "To boost your professional visibility, I recommend completing the active Missions on Proconnect to earn badges. Also, request endorsements from your peers on the Profile page - this dramatically increases your score in recruiters' search results!"
  }
  
  if (useCase === "learning" || lastMessage.includes("learn") || lastMessage.includes("course") || lastMessage.includes("study")) {
    return "Learning is most effective when project-based. Try browsing the Showcase page to remix existing projects, or join a team in the Co-Lab page. If you want structured challenges, the featured Missions are a great starting point."
  }
  
  if (lastMessage.includes("project") || lastMessage.includes("showcase") || lastMessage.includes("collab")) {
    return "Proconnect makes it easy to publish your achievements. Go to the Showcase page to upload your design or frontend code, or the Co-Lab page to start a new collaborative effort. Other members can endorse or remix your contributions!"
  }
  
  return "That's a great question. On Proconnect, you can connect with mentors, complete practical coding missions, and build team projects. I'm here to guide you—feel free to ask more details about coding, design, or professional growth!"
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
