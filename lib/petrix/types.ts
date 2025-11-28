export type UseCase = "general" | "career" | "resume" | "skills" | "proconnect"

export type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  createdAt: Date
  useCase?: UseCase
}

export type ChatState = {
  messages: Message[]
  isLoading: boolean
  error: string | null
  useCase: UseCase
}

export type ChatAction =
  | { type: "ADD_MESSAGE"; message: Message }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "SET_USE_CASE"; useCase: UseCase }
  | { type: "CLEAR_CHAT" }
