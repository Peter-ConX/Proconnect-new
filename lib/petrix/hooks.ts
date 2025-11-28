"use client"

import { useReducer, useCallback, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import type { ChatState, ChatAction, Message, UseCase } from "./types"
import { streamGroqResponse } from "./groq-api"

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
  useCase: "general",
}

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.message],
      }
    case "UPDATE_MESSAGE":
      return {
        ...state,
        messages: state.messages.map((msg) => (msg.id === action.id ? { ...msg, content: action.content } : msg)),
      }
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
      }
    case "SET_USE_CASE":
      return {
        ...state,
        useCase: action.useCase,
      }
    case "CLEAR_CHAT":
      return {
        ...state,
        messages: [],
      }
    default:
      return state
  }
}

export function usePetrixChat() {
  const [state, dispatch] = useReducer(chatReducer, initialState)
  const responseContentRef = useRef("")

  const setUseCase = useCallback((useCase: UseCase) => {
    dispatch({ type: "SET_USE_CASE", useCase })
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return

      // Add user message
      const userMessage: Message = {
        id: uuidv4(),
        content,
        role: "user",
        createdAt: new Date(),
        useCase: state.useCase,
      }
      dispatch({ type: "ADD_MESSAGE", message: userMessage })

      // Create assistant message placeholder
      const assistantMessageId = uuidv4()
      const assistantMessage: Message = {
        id: assistantMessageId,
        content: "",
        role: "assistant",
        createdAt: new Date(),
        useCase: state.useCase,
      }
      dispatch({ type: "ADD_MESSAGE", message: assistantMessage })
      dispatch({ type: "SET_LOADING", isLoading: true })
      responseContentRef.current = ""

      try {
        // Format messages for API
        const apiMessages = state.messages
          .filter((msg) => msg.role === "user")
          .concat(userMessage)
          .map((msg) => ({
            role: msg.role,
            content: msg.content,
          }))

        // Stream response
        await streamGroqResponse(apiMessages, state.useCase, (chunk) => {
          responseContentRef.current += chunk
          dispatch({
            type: "UPDATE_MESSAGE",
            id: assistantMessageId,
            content: responseContentRef.current,
          })
        })
      } catch (error) {
        console.error("Error sending message:", error)
        const errorMessage = error instanceof Error ? error.message : "Failed to get response from Petrix"
        dispatch({ type: "SET_ERROR", error: errorMessage })

        // Update the assistant message with error
        dispatch({
          type: "UPDATE_MESSAGE",
          id: assistantMessageId,
          content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
        })
      } finally {
        dispatch({ type: "SET_LOADING", isLoading: false })
      }
    },
    [state.messages, state.useCase],
  )

  const clearChat = useCallback(() => {
    dispatch({ type: "CLEAR_CHAT" })
  }, [])

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    useCase: state.useCase,
    sendMessage,
    setUseCase,
    clearChat,
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}
