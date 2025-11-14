export function TheoryOfChange() {
  return (
    <section className="py-24 bg-forest-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-secondary">
              Our Theory of <span className="text-forest-300">Change</span>
            </h2>
            <p className="text-lg text-forest-100 leading-relaxed">
              How we believe lasting environmental and social transformation happens
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-forest-600 rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Awareness Sparks Concern</h3>
                <p className="text-forest-100 leading-relaxed">
                  When communities understand environmental challenges and their personal connection to them, they begin
                  to care deeply about solutions.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-forest-600 rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Knowledge Enables Action</h3>
                <p className="text-forest-100 leading-relaxed">
                  Equipped with skills, resources, and practical knowledge, individuals and communities gain the
                  capacity to implement sustainable practices.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-forest-600 rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Action Creates Impact</h3>
                <p className="text-forest-100 leading-relaxed">
                  Individual actions multiply into collective movements. Tree planting becomes reforestation. Waste
                  sorting becomes circular economies. Small steps become systemic change.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-forest-600 rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Impact Inspires Transformation</h3>
                <p className="text-forest-100 leading-relaxed">
                  Visible results inspire others to join. Success stories spread. Communities become self-sustaining
                  agents of change, creating a ripple effect that transforms entire regions.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <p className="text-xl font-serif text-center leading-relaxed">
              "We don't just plant trees. We plant seeds of awareness, cultivate forests of knowledge, and harvest
              generations of environmental stewards."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
