import Card from "./card/Card";
import { getProjects } from "@/lib/data";

export default async function Projects() {
    const projects = await getProjects();

    return (
        <section id="projects" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <div className="flex items-center gap-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <Card key={project.id} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
