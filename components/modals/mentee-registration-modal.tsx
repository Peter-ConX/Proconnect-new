"use client"

import type React from "react"

import { useState } from "react"
import { X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MenteeRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  mentor: {
    name: string
    expertise: string[]
    title: string
  }
}

export function MenteeRegistrationModal({ isOpen, onClose, mentor }: MenteeRegistrationModalProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    focusAreas: [] as string[],
    goals: "",
    experience: "",
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setStep(3)
      setIsSubmitting(false)
    }, 1500)
  }

  if (step === 3) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-white dark:bg-gray-900">
          <CardHeader>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Registration Confirmed!</CardTitle>
              <CardDescription>You've been added to {mentor.name}'s mentorship</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You can now access materials, send messages, and join sessions with your mentor. Use the "Enter Chat"
                button to start communicating.
              </p>
            </div>
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-sky-500 to-orange-500 hover:from-sky-600 hover:to-orange-600 text-white"
            >
              Go to Mentor Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-900">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Register as Mentee</CardTitle>
              <CardDescription>under {mentor.name}</CardDescription>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <X className="h-5 w-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Learning Goals</Label>
                  <Input
                    placeholder="What do you want to learn?"
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Current Experience Level</Label>
                  <Input
                    placeholder="e.g., Beginner, Intermediate, Advanced"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    required
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                >
                  Continue
                </Button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Select Focus Areas</Label>
                  <div className="space-y-2 mt-2">
                    {mentor.expertise.map((skill) => (
                      <label key={skill} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.focusAreas.includes(skill)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                focusAreas: [...formData.focusAreas, skill],
                              })
                            } else {
                              setFormData({
                                ...formData,
                                focusAreas: formData.focusAreas.filter((a) => a !== skill),
                              })
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="button" onClick={() => setStep(1)} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || formData.focusAreas.length === 0}
                    className="flex-1 bg-gradient-to-r from-sky-500 to-orange-500 hover:from-sky-600 hover:to-orange-600 text-white"
                  >
                    {isSubmitting ? "Registering..." : "Complete Registration"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
