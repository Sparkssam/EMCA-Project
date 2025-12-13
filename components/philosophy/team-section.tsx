import Image from "next/image"
import { Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const team = [
  {
    name: "Zafarani Ramadhani",
    role: " Executive Director",
    bio: "Environmental scientist and youth advocate passionate about grassroots climate action.",
    image: "/team-member-1.png",
  },
  {
    name: "Thomson Mushi",
    role: "Chief Operating Officer",
    bio: `With extensive experience in operational management and strategic planning, Thomson oversees the day-to-day operations of EMCA, ensuring that our programs run efficiently and effectively. His leadership in coordinating field activities, managing resources, and streamlining processes has been instrumental in scaling our environmental initiatives across Tanzania. Thomson's commitment to operational excellence ensures that every project delivers measurable impact while maintaining the highest standards of accountability and transparency.`,
    image: "/THOMSON MUSHI.png",
  },
  {
    name: "Zephania",
    role: "Managing Director",
    bio: `As Managing Director, Zephania provides strategic leadership and vision for EMCA's growth and development. With a strong background in environmental management and organizational development, he works closely with stakeholders to forge partnerships, secure funding, and expand our reach. His innovative approach to sustainability and community engagement has positioned EMCA as a leading voice in environmental conservation. Zephania is dedicated to building a resilient organization that empowers communities while protecting Tanzania's natural heritage for future generations.`,
    image: "/ZEPHANIA.png",
  },
  {
    name: "Frank Kalago",
    role: "Programs Manager",
    bio: `At EMCA, I design and implement strategies that balance economic growth with environmental responsibility. Through scientific research, project management, and community engagement, I actively promote conservation and sustainable development.
Collaboration lies at the heart of our work — by partnering with policymakers, industry leaders, and local communities, we drive impactful initiatives that foster a greener and more resilient future.
Continuous learning fuels my commitment to sustainability. By embracing emerging technologies and best practices, I strive to safeguard natural resources, reduce environmental risks, and create lasting positive change.`,
    image: "/team-member-2.png",
  },
  {
    name: "ADV. JOHN .R. CHUA ",
    role: "Secretary ",
    bio: `We are at the center of an evolving world where technological progress continues to redefine how we live, work, and connect. However, this rapid advancement has also intensified environmental degradation — from resource depletion to biodiversity loss. The challenge before us is not to reject technology, but to harness it responsibly for the good of both humanity and the planet riving initiatives that promote responsible consumption, recycling, and environmental conservation. My vision is to see every industrial product serve a full and sustainable life cycle — from production to reuse — reducing waste and minimizing ecological harm.`,
    image: "/team-member-3.png",
  },
  {
    name: "Elvida James",
    role: "Accountant",
    bio: "Building bridges between communities, organizations, and funders for collective impact.",
    image: "/team-member-4.png",
  },
]

export function TeamSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            MEET THE <span className="text-forest-600">TEAM</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Passionate individuals united by a shared vision of environmental sustainability and community empowerment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-foreground font-serif">{member.name}</h3>
                <p className="text-sm font-medium text-forest-600">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                <div className="flex gap-2 pt-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
