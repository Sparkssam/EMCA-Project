"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Clock, Users, Video, ExternalLink, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { getAllEvents, type Event as EventType } from "@/lib/actions/events"

type EventStatus = "upcoming" | "ongoing" | "past"

interface Event {
  id: number
  title: string
  description: string
  status: EventStatus
  start_date: string
  end_date?: string
  location: string
  image: string
  video_url?: string
  attendees: number
  max_attendees?: number | null
  registration_link?: string
}

function EventCountdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex gap-2 sm:gap-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="bg-emca-primary text-white rounded-lg px-2 sm:px-3 py-1 sm:py-2 min-w-[3rem] sm:min-w-[4rem]">
            <span className="text-xl sm:text-2xl font-bold">{value.toString().padStart(2, "0")}</span>
          </div>
          <span className="text-xs text-muted-foreground mt-1 capitalize">{unit}</span>
        </div>
      ))}
    </div>
  )
}

export function EventsSection({ isAdmin = false }: { isAdmin?: boolean }) {
  const [activeTab, setActiveTab] = useState<EventStatus>("upcoming")
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setLoading(true)
    const result = await getAllEvents()
    if (result.success && result.data) {
      setEvents(result.data)
    }
    setLoading(false)
  }

  const filteredEvents = events.filter((event) => event.status === activeTab)

  const getStatusBadge = (status: EventStatus) => {
    const badges = {
      upcoming: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      ongoing: "bg-green-500/10 text-green-600 dark:text-green-400",
      past: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
    }
    return badges[status]
  }

  return (
    <section className="py-20 sm:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-pompiere text-foreground">EVENTS & ACTIVITIES</h2>
            {isAdmin && (
              <Link href="/admin/events">
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Manage Events
                </Button>
              </Link>
            )}
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us in making a difference! From tree planting to workshops, there's always something happening at EMCA.
          </p>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(["upcoming", "ongoing", "past"] as EventStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 capitalize ${
                activeTab === status
                  ? "bg-emca-primary text-white shadow-lg scale-105"
                  : "bg-card border-2 border-border text-foreground hover:border-emca-primary/40"
              }`}
            >
              {status} Events
              <span className="ml-2 text-sm">({events.filter((e) => e.status === status).length})</span>
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emca-primary"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-emca-primary/40 transition-all duration-500"
              >
                {/* Event Image */}
                <div className="relative h-56">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 ${getStatusBadge(event.status)} text-xs font-medium rounded-full capitalize`}>
                      {event.status}
                    </span>
                  </div>
                  {event.video_url && (
                    <div className="absolute top-4 right-4">
                      <a
                        href={event.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/60 hover:bg-black/80 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Video className="h-3 w-3" />
                        Watch
                      </a>
                    </div>
                  )}
                </div>

                {/* Event Details */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-pompiere text-foreground leading-tight">{event.title}</h3>

                  <p className="text-muted-foreground leading-relaxed">{event.description}</p>

                  {/* Event Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 text-emca-primary" />
                      <span>
                        {new Date(event.start_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {event.end_date && ` - ${new Date(event.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-emca-primary" />
                      <span>{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4 text-emca-primary" />
                      <span>
                        {event.attendees} {event.max_attendees ? `/ ${event.max_attendees}` : ""} attendees
                      </span>
                    </div>
                  </div>

                  {/* Countdown Timer for Upcoming Events */}
                  {event.status === "upcoming" && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-3">Event starts in:</p>
                      <EventCountdown targetDate={event.start_date} />
                    </div>
                  )}

                  {/* Registration Button */}
                  {event.status === "upcoming" && (
                    <Link href={event.registration_link || `/volunteer?event=${encodeURIComponent(event.title)}&eventId=${event.id}`}>
                      <Button className="w-full bg-emca-primary hover:bg-emca-secondary text-white">
                        Register Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">No {activeTab} events at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
