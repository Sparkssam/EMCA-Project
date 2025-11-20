import { Button } from "@/components/ui/button"
import { MapPin, Users, ArrowRight, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const projects = [
  {
    id: 1,
    title: "Binti Mazingira",
    location: "Nationwide",
    status: "Ongoing",
    participants: "500+ young women",
    description:
      "Empowering young women and girls to become environmental leaders through education, mentorship, and hands-on conservation projects. Breaking gender barriers in environmental action.",
    image: "/african-women-environmental-leaders-tanzania.jpg",
    category: "Women Empowerment",
    impact: "500+ women trained, 30 community projects led by women",
  },
  {
    id: 2,
    title: "Tuelimishe Mazingira",
    location: "Tanzania",
    status: "Active",
    participants: "5,000+ participants",
    description:
      "Large-scale tree planting and reforestation campaign bringing together youth, communities, and organizations to restore Tanzania's green cover and combat climate change.",
    image: "/tree-planting-tanzania-youth-reforestation.jpg",
    category: "Reforestation",
    impact: "50,000+ trees planted, 100+ hectares restored",
  },
  {
    id: 3,
    title: "Cleanup Drives",
    location: "Dar es Salaam & Coastal Areas",
    status: "Monthly",
    participants: "1,000+ volunteers",
    description:
      "Regular coastal and urban cleanup campaigns removing plastic waste, raising awareness about pollution, and promoting sustainable waste management practices in communities.",
    image: "/beach-cleanup-tanzania-volunteers-coastal-conserva.jpg",
    category: "Waste Management",
    impact: "35+ tons of waste removed, 20+ beaches cleaned",
  },
  {
    id: 4,
    title: "Green Schools Initiative",
    location: "Dar es Salaam Region",
    status: "Upcoming",
    participants: "Expected 2,000+ students",
    description:
      "Introducing environmental education and sustainable practices in schools. Establishing eco-clubs, green spaces, and waste management systems in educational institutions.",
    image: "/african-students-planting-trees-at-school.jpg",
    category: "Education",
    impact: "Planning phase - 15 schools targeted",
  },
  {
    id: 5,
    title: "Eco-Tourism Development",
    location: "Northern Circuit - Arusha",
    status: "Ongoing",
    participants: "200+ community members",
    description:
      "Creating sustainable eco-tourism opportunities that preserve natural habitats while providing income for local communities. Training guides and building eco-friendly infrastructure.",
    image: "/eco-tourism-tanzania-wildlife-guides-nature.jpg",
    category: "Sustainable Tourism",
    impact: "8 eco-lodges built, 50+ guides trained, 15% income increase",
  },
  {
    id: 6,
    title: "Urban Garden Revolution",
    location: "Dar es Salaam & Mwanza",
    status: "Active",
    participants: "800+ urban farmers",
    description:
      "Transforming unused urban spaces into productive gardens. Teaching communities vertical farming, composting, and organic growing techniques to increase food security.",
    image: "/urban-garden-tanzania-rooftop-farming-vegetables-c.jpg",
    category: "Urban Agriculture",
    impact: "120 gardens established, 5 tons of produce monthly",
  },
  {
    id: 7,
    title: "Renewable Energy Access",
    location: "Rural Tanzania",
    status: "Ongoing",
    participants: "1,500+ households",
    description:
      "Installing solar panels and biogas systems in off-grid communities. Providing clean energy alternatives to reduce deforestation and improve quality of life.",
    image: "/solar-panels-rural-africa-tanzania-village-renewab.jpg",
    category: "Clean Energy",
    impact: "500+ solar systems installed, 80% reduction in firewood use",
  },
  {
    id: 8,
    title: "Water Conservation Program",
    location: "Dodoma & Manyara Regions",
    status: "Active",
    participants: "3,000+ beneficiaries",
    description:
      "Implementing rainwater harvesting systems and teaching water conservation techniques in drought-prone areas. Building water tanks and restoring natural water sources.",
    image: "/water-tank-rainwater-harvesting-tanzania-village-c.jpg",
    category: "Water Security",
    impact: "200 water tanks built, 50+ springs protected",
  },
]

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-emca-primary text-white"
    case "Ongoing":
      return "bg-emca-medium text-white"
    case "Monthly":
      return "bg-emca-yellow text-emca-darkest"
    case "Upcoming":
      return "bg-emca-lime text-emca-darkest"
    default:
      return "bg-gray-500 text-white"
  }
}

export function ProjectsGrid() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 space-y-4">
          <h2 className="font-pompiere text-4xl sm:text-5xl md:text-6xl font-normal text-foreground">
            Our <span className="text-emca-primary">Projects</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Three flagship initiatives driving environmental change across Tanzania
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-card rounded-3xl overflow-hidden border border-border hover:shadow-xl hover:border-emca-primary/30 transition-all duration-500"
              style={{
                animation: `fade-in 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-5 left-5">
                  <span className="px-4 py-1.5 bg-emca-primary text-white text-sm font-medium rounded-full shadow-lg">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-5 right-5">
                  <span
                    className={`px-4 py-1.5 text-sm font-medium rounded-full shadow-lg flex items-center gap-1.5 ${getStatusStyles(project.status)}`}
                  >
                    <Clock className="h-3.5 w-3.5" />
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <h3 className="text-2xl sm:text-3xl font-pompiere text-foreground group-hover:text-emca-primary transition-colors duration-300">
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emca-medium" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-emca-medium" />
                    <span>{project.participants}</span>
                  </div>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed">{project.description}</p>

                <div className="pt-4 border-t border-border space-y-2">
                  <p className="text-sm font-medium text-emca-primary">Key Impact:</p>
                  <p className="text-sm text-muted-foreground">{project.impact}</p>
                </div>

                <Button
                  asChild
                  variant="ghost"
                  className="text-emca-primary hover:text-emca-medium hover:bg-emca-primary/5 p-0 h-auto text-base font-medium"
                >
                  <Link href={`/impact/${project.id}`} className="flex items-center gap-2">
                    Learn more
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
