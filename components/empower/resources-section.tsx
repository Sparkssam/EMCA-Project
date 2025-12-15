import { BookOpen, Video, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const resources = [
  {
    icon: BookOpen,
    title: "Environmental Leadership Course",
    description: "12-week online program covering climate science, project management, and community organizing.",
    type: "Course",
    duration: "12 weeks",
  },
  {
    icon: Video,
    title: "Sustainable Agriculture Webinars",
    description: "Monthly live sessions with expert farmers sharing organic farming techniques and best practices.",
    type: "Webinar",
    duration: "Monthly",
  },
  {
    icon: FileText,
    title: "Community Action Toolkit",
    description: "Step-by-step guides for starting environmental projects in your community.",
    type: "Guide",
    duration: "Self-paced",
  },
  {
    icon: Download,
    title: "Impact Measurement Templates",
    description: "Tools and frameworks for tracking and reporting your environmental impact.",
    type: "Template",
    duration: "Instant access",
  },
]

export function ResourcesSection() {
  return (
    <section id="resources" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            LEARNING <span className="text-forest-600">RESOURCES</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Free tools, training, and knowledge to help you become an effective environmental leader.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <div key={index} className="p-8 bg-card rounded-2xl border border-border hover:shadow-xl transition-all">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-forest-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <resource.icon className="h-7 w-7 text-forest-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{resource.title}</h3>
                    <span className="px-2 py-1 bg-muted text-xs font-medium rounded">{resource.type}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{resource.duration}</span>
                    <Button variant="ghost" className="text-forest-600 hover:text-forest-700 hover:bg-forest-50">
                      Access Resource
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
