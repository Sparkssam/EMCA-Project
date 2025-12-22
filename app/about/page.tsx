export const metadata = {
  title: "About EMCA - Environmental Management and Community Awareness",
  description:
    "Learn about EMCA's mission, vision, and commitment to environmental protection and youth empowerment in Tanzania.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-emca-darkest via-emca-dark to-emca-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/organic-leaf-pattern.jpg')] opacity-5" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <h1 className="font-pompiere text-5xl sm:text-6xl md:text-7xl font-normal text-white leading-tight font-serif">
              ABOUT <span className="text-emca-yellow">EMCA</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-emca-lime/90 leading-relaxed font-serif">
              Environmental Management and Community Awareness
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-pompiere text-4xl sm:text-5xl font-normal text-center text-foreground mb-8 sm:mb-12 font-serif">
              WHO WE <span className="text-emca-primary">ARE</span>
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 font-serif">
                EMCA is a youth-led Non-Governmental Organisation that advocates for sustainable practices, mitigates
                environmental pollution, and cultivates a sense of environmental responsibility within communities. We
                are dedicated to promoting environmental management and community awareness as a means of fostering
                economic empowerment and sustainable community development, especially for vulnerable groups in society.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-serif">
                We believe that everyone, regardless of their circumstances, deserves access to a clean and healthy
                environment and the knowledge to protect it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-emca-darkest/5 to-emca-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Vision */}
            <div className="bg-card border-2 border-emca-medium/20 rounded-2xl p-8 sm:p-10 hover:shadow-2xl hover:border-emca-medium/40 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emca-medium to-emca-lime rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-9 h-9 sm:w-11 sm:h-11 text-emca-darkest"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="font-pompiere text-3xl sm:text-4xl font-normal text-foreground mb-4 font-serif">OUR VISION</h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Our vision is to create a thriving future where empowered communities will
actively manage and safeguard the environment.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-card border-2 border-emca-primary/20 rounded-2xl p-8 sm:p-10 hover:shadow-2xl hover:border-emca-primary/40 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emca-primary to-emca-medium rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-9 h-9 sm:w-11 sm:h-11 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="font-pompiere text-3xl sm:text-4xl font-normal text-foreground mb-4 font-serif">OUR MISSION</h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Our mission is to empower communities as leaders in environmental
stewardship by fostering innovation and action-oriented solutions that
promote sustainable practices for people and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="font-pompiere text-foreground mb-6 font-serif font-extrabold text-6xl">
              OUR <span className="text-emca-primary">OBJECTIVES</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-serif">
              Strategic goals driving our mission forward
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              "To engage in environmental protection activities including waste management, afforestation and environment cleaning",
              "To provide environmental protection education",
              "To provide legal aid and policy awareness in environment and related field",
              "To raise funds for environmental related projects",
            ].map((objective, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 sm:p-8 bg-card rounded-2xl border-2 border-border hover:border-emca-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emca-primary to-emca-medium rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-base sm:text-lg">{index + 1}</span>
                </div>
                <p className="text-sm sm:text-base text-foreground leading-relaxed pt-2">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-emca-primary/5 to-emca-medium/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-pompiere text-4xl sm:text-5xl font-normal text-foreground mb-6 font-serif">
              OUR <span className="text-emca-primary">VALUES</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground font-serif">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Sustainability",
                description:
                  "Actions and decisions prioritise the long-term health of the environment and communities.",
              },
              {
                title: "Empowerment",
                description:
                  "Equipping individuals and communities, especially women and children, with the knowledge and resources to be environmental stewards.",
              },
              {
                title: "Equity and Inclusion",
                description:
                  "Creating opportunities for all voices to be heard and fostering participation in environmental solutions.",
              },
              {
                title: "Innovation",
                description: "Actively seeking new knowledge and solutions through research and development.",
              },
              {
                title: "Collaboration",
                description:
                  "Working together with communities and stakeholders to achieve shared environmental goals.",
              },
              {
                title: "Intergenerational Responsibility",
                description:
                  "Recognizing the impact of present actions on future generations and ensuring a thriving future for all.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 bg-card rounded-2xl border-2 border-border hover:border-emca-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-pompiere text-2xl sm:text-3xl text-foreground mb-3">{value.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
