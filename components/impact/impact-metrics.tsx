import { TreePine, Users, Building2, Award } from "lucide-react"

const metrics = [
  {
    icon: TreePine,
    value: "52,000+",
    label: "Trees Planted",
    change: "+12,000 this year",
    color: "text-forest-600",
    bgColor: "bg-forest-100",
  },
  {
    icon: Users,
    value: "5,200+",
    label: "Youth Trained",
    change: "+850 this year",
    color: "text-sky-600",
    bgColor: "bg-sky-100",
  },
  {
    icon: Building2,
    value: "120+",
    label: "Communities Served",
    change: "+25 this year",
    color: "text-earth-600",
    bgColor: "bg-earth-100",
  },
  {
    icon: Award,
    value: "15",
    label: "Active Projects",
    change: "Across 8 regions",
    color: "text-forest-700",
    bgColor: "bg-forest-50",
  },
]

export function ImpactMetrics() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="p-6 bg-card rounded-2xl border border-border">
              <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className={`text-4xl font-bold font-serif ${metric.color} mb-2`}>{metric.value}</div>
              <div className="text-lg font-semibold text-foreground mb-1">{metric.label}</div>
              <div className="text-sm text-muted-foreground">{metric.change}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
