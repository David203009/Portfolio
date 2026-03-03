import { getHero } from "@/lib/data";

export default async function Main() {
    const hero = await getHero();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Dot grid background */}
            <div className="absolute inset-0 dot-grid opacity-40" />

            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,211,238,0.08)_0%,_transparent_70%)]" />

            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                {/* Status badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 border border-emerald/20 mb-8">
                    <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                    <span className="text-emerald text-sm font-medium">{hero.status}</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Hi, I&apos;m{" "}
                    <span className="gradient-text">{hero.name}</span>
                </h1>

                <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
                    {hero.bio}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#projects"
                        className="px-8 py-3 bg-accent text-bg font-semibold rounded-full transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
                    >
                        View Projects
                    </a>
                    <a
                        href="#about"
                        className="px-8 py-3 border border-border text-primary/80 font-semibold rounded-full transition-all duration-300 hover:border-accent/50 hover:text-accent"
                    >
                        About Me
                    </a>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg to-transparent" />
        </section>
    );
}
