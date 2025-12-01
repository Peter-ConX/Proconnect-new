"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

interface ScheduledSession {
  id: string
  date: string
  time: string
  topic: string
  status: "upcoming" | "completed" | "cancelled"
}

const timeSlots: TimeSlot[] = [
  { id: "1", time: "09:00 AM", available: true },
  { id: "2", time: "10:00 AM", available: true },
  { id: "3", time: "11:00 AM", available: false },
  { id: "4", time: "12:00 PM", available: true },
  { id: "5", time: "01:00 PM", available: true },
  { id: "6", time: "02:00 PM", available: true },
  { id: "7", time: "03:00 PM", available: false },
  { id: "8", time: "04:00 PM", available: true },
]

export function MentorScheduleCalendar({ mentorId }: { mentorId: string }) {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [topic, setTopic] = useState("")
  const [isBooking, setIsBooking] = useState(false)
  const [scheduledSessions, setScheduledSessions] = useState<ScheduledSession[]>([])

  const handleBookSession = async () => {
    if (!selectedDate || !selectedTime || !topic) return

    setIsBooking(true)
    // Simulate API call
    setTimeout(() => {
      const newSession: ScheduledSession = {
        id: Date.now().toString(),
        date: selectedDate,
        time: selectedTime,
        topic,
        status: "upcoming",
      }
      setScheduledSessions([...scheduledSessions, newSession])
      setIsBooking(false)
      setSelectedDate("")
      setSelectedTime("")
      setTopic("")
    }, 1500)
  }

  const upcomingSessions = scheduledSessions.filter((s) => s.status === "upcoming")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule a Session
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="date">Select Date</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="mt-1"
            />
          </div>

          {selectedDate && (
            <div>
              <Label>Select Time</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={!slot.available ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {slot.time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {selectedTime && (
            <div>
              <Label htmlFor="topic">Session Topic</Label>
              <Textarea
                id="topic"
                placeholder="What would you like to discuss?"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-1"
              />
            </div>
          )}

          <Button
            onClick={handleBookSession}
            disabled={!selectedDate || !selectedTime || !topic || isBooking}
            className="w-full bg-gradient-to-r from-teal-500 to-amber-500 hover:from-teal-600 hover:to-amber-600"
          >
            {isBooking ? "Booking..." : "Book Session"}
          </Button>
        </CardContent>
      </Card>

      {upcomingSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{session.topic}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {session.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.time}
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className="bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400">
                  Upcoming
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

