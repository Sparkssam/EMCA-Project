import { Users, GraduationCap, Megaphone, Briefcase } from "lucide-react"
import Link from "next/link"

const options = [
  {
    icon: Users,
    title: "Volunteer",
    description: "Join our field projects, events, and community initiatives. Hands-on impact, flexible commitment.",
    color: "text-forest-600",
    bgColor: "bg-forest-100",
    href: "#volunteer",
  },
  {
    icon: GraduationCap,
    title: "Learn & Lead",
    description: "Access training programs, workshops, and mentorship to develop your environmental leadership skills.",
    color: "text-sky-600",
    bgColor: "bg-sky-100",
    href: "#resources",
  },
  {
    icon: Megaphone,
    title: "Advocate",
    description: "Amplify our message, influence policy, and mobilize your network for environmental action.",
    color: "text-earth-600",
    bgColor: "bg-earth-100",
    href: "#advocate",
  },
  {
    icon: Briefcase,
    title: "Career Opportunities",
    description:
      "Explore full-time and internship positions with EMCA. Build your career while building a better world.",
    color: "text-forest-700",
    bgColor: "bg-forest-50",
    href: "#careers",
  },
]

export function GetInvolvedOptions() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            HOW YOU CAN <span className="text-forest-600">MAKE A DIFFERENCE</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you have an hour, a day, or want to dedicate your career—there's a place for you in our movement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {options.map((option, index) => (
            <Link
              key={index}
              href={option.href}
              className="group p-8 bg-card rounded-2xl border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 ${option.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                <option.icon className={`h-8 w-8 ${option.color}`} />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-forest-600 transition-colors">
                {option.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{option.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
