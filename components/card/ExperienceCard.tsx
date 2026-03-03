interface ExperienceCardProps {
    title: string;
    company: string;
    period: string;
    description: string;
    technologies: string[];
}

export default function ExperienceCard({ title, company, period, description, technologies }: ExperienceCardProps) {
    return (
        <div className="relative pl-8 md:pl-20 group">
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-8 top-2 w-3 h-3 -translate-x-[6px] rounded-full bg-accent border-2 border-bg shadow-[0_0_8px_rgba(34,211,238,0.4)] group-hover:shadow-[0_0_12px_rgba(34,211,238,0.6)] transition-shadow" />

            <div className="bg-surface border border-border rounded-xl p-6 transition-all duration-300 hover:border-accent/20">
                {/* Period */}
                <span className="inline-block text-xs font-mono text-accent mb-3">{period}</span>

                {/* Title & Company */}
                <h3 className="text-lg font-semibold text-primary mb-1">{title}</h3>
                <p className="text-muted text-sm mb-4">{company}</p>

                {/* Description */}
                <p className="text-muted/80 text-sm leading-relaxed mb-4">{description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium text-accent/70 bg-accent/5 border border-accent/10 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
