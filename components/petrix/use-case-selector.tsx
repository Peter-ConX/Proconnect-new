"use client"

import type { UseCase } from "@/lib/petrix/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, FileText, Lightbulb, Network, MessageSquare } from "lucide-react"

interface UseCaseSelectorProps {
  value: UseCase
  onChange: (value: UseCase) => void
}

export function UseCaseSelector({ value, onChange }: UseCaseSelectorProps) {
  const useCases = [
    { value: "general", label: "General Assistant", icon: <MessageSquare size={16} /> },
    { value: "career", label: "Career Advice", icon: <Briefcase size={16} /> },
    { value: "resume", label: "Resume Help", icon: <FileText size={16} /> },
    { value: "skills", label: "Skill Analysis", icon: <Lightbulb size={16} /> },
    { value: "proconnect", label: "Proconnect Insights", icon: <Network size={16} /> },
  ]

  return (
    <Select value={value} onValueChange={(val) => onChange(val as UseCase)}>
      <SelectTrigger className="w-full md:w-[220px]">
        <SelectValue placeholder="Select use case" />
      </SelectTrigger>
      <SelectContent>
        {useCases.map((useCase) => (
          <SelectItem key={useCase.value} value={useCase.value} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {useCase.icon}
              <span>{useCase.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
