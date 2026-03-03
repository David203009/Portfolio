import ExperienceCard from "./card/ExperienceCard";
import { getExperiences } from "@/lib/data";

export default async function Experience() {
    const experiences = await getExperiences();

    return (
        <section id="experience" className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Section header */}
                <div className="flex items-center gap-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-border to-transparent" />

                    <div className="flex flex-col gap-12">
                        {experiences.map((exp) => (
                            <ExperienceCard key={exp.id} {...exp} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
