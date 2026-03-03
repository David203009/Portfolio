import ItemSkill from "./skills/ItemSkill";
import { getSkills } from "@/lib/data";

const categoryColors: Record<string, string> = {
    "Frontend": "#22d3ee",
    "Backend": "#a78bfa",
    "Tools": "#f59e0b",
    "Database": "#10b981",
};

const categoryEmojis: Record<string, string> = {
    "Frontend": "🎨",
    "Backend": "⚙️",
    "Tools": "🛠️",
    "Database": "🗄️",
};

export default async function Skills() {
    const skillCategories = await getSkills();

    return (
        <section id="skills" className="py-24 px-6 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
                style={{ background: "radial-gradient(circle, #22d3ee, transparent 70%)" }}
            />

            <div className="max-w-6xl mx-auto relative">
                {/* Section header */}
                <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold">Skills</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                </div>
                <p className="text-muted text-sm md:text-base mb-14 max-w-xl">
                    Tecnologías y herramientas con las que trabajo para construir productos web modernos y escalables.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skillCategories.map((category, catIndex) => {
                        const color = categoryColors[category.title] || "#22d3ee";
                        const emoji = categoryEmojis[category.title] || "💻";

                        return (
                            <div
                                key={category.id}
                                className="skill-category group/card animate-on-scroll"
                                style={{ transitionDelay: `${catIndex * 0.1}s` }}
                            >
                                {/* Category card */}
                                <div className="relative rounded-2xl p-5 bg-surface/40 backdrop-blur-sm border border-border/40 transition-all duration-500 hover:border-border/60 hover:bg-surface/60 h-full">
                                    {/* Top accent line */}
                                    <div
                                        className="absolute top-0 left-4 right-4 h-px opacity-60"
                                        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                                    />

                                    {/* Category header */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover/card:scale-110"
                                            style={{ background: `${color}12` }}
                                        >
                                            {emoji}
                                        </div>
                                        <div>
                                            <h3
                                                className="text-sm font-semibold uppercase tracking-wider"
                                                style={{ color }}
                                            >
                                                {category.title}
                                            </h3>
                                            <p className="text-xs text-muted/60">
                                                {category.skills.length} {category.skills.length === 1 ? "skill" : "skills"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Skills list */}
                                    <div className="flex flex-col gap-2.5">
                                        {category.skills.map((skill, skillIndex) => (
                                            <ItemSkill
                                                key={skill.name}
                                                name={skill.name}
                                                color={color}
                                                index={skillIndex}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
