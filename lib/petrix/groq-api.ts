// This file now only contains the client-side code to call our secure server endpoint
// No API keys are exposed here

export async function streamGroqResponse(
  messages: { role: string; content: string }[],
  useCase: string,
  onChunk: (chunk: string) => void,
) {
  try {
    const response = await fetch("/api/petrix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        useCase,
      }),
    })

    if (!response.ok) {
      let errorMessage = "Failed to get response from Petrix"
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorMessage
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage
      }
      throw new Error(errorMessage)
    }

    const reader = response.body?.getReader()
    if (!reader) throw new Error("Response body is null")

    const decoder = new TextDecoder("utf-8")
    let buffer = ""

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      // Process the buffer to extract chunks
      const lines = buffer.split("\n")
      buffer = lines.pop() || ""

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6).trim()
          if (data === "[DONE]") continue
          if (!data) continue

          try {
            const parsed = JSON.parse(data)
            const content = parsed.choices[0]?.delta?.content || ""
            if (content) onChunk(content)
          } catch (parseError) {
            // If it's not valid JSON, treat it as plain text
            if (data && data !== "[DONE]") {
              onChunk(data)
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error streaming from Petrix:", error)
    throw error
  }
}
