const activeProjects = [
  {
    name: "OpenFrame",
    description:
      "A modular ESP32 platform for connecting sensors, displays, and automations through a browser-based control panel.",
    href: "https://github.com/mattam1234/openframe",
    stack: ["ESP32", "PlatformIO", "Vue 3"],
  },
  {
    name: "GAPI",
    description:
      "A multi-platform game picker that helps decide what to play across Steam, Epic Games, and GOG libraries.",
    href: "https://github.com/mattam1234/GAPI",
    stack: ["Python", "Web app", "Gaming APIs"],
  },
  {
    name: "Smack",
    description:
      "A Jellyfin plugin for browsing and streaming media from remote Jellyfin servers through one local instance.",
    href: "https://github.com/mattam1234/Smack",
    stack: [".NET 9", "C#", "Jellyfin"],
  },
  {
    name: "Urenregistratie Systeem",
    description:
      "A Laravel-based time registration and project management system for tracking work, tasks, and leave requests.",
    href: "https://github.com/mattam1234/urenregistratie-systeem",
    stack: ["Laravel", "PHP", "MySQL"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10 lg:px-12">
        <section className="flex flex-col gap-6 border-b border-slate-800 pb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-400">
            Mathijs Stamminga
          </p>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Building practical software, connected hardware, and tools that
              are actually fun to use.
            </h1>
            <p className="text-lg leading-8 text-slate-300">
              I am a software developer focused on robust applications, cloud
              solutions, and side projects that solve real problems. These are
              the projects I am actively working on right now.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              className="rounded-full bg-sky-400 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-300"
              href="https://github.com/mattam1234"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </a>
            <a
              className="rounded-full border border-slate-700 px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
              href="https://www.linkedin.com/in/mathijs-stamminga/"
              target="_blank"
              rel="noreferrer"
            >
              Connect on LinkedIn
            </a>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Active projects
            </h2>
            <p className="text-base leading-7 text-slate-300">
              A selection of the products and experiments currently getting most
              of my attention.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {activeProjects.map((project) => (
              <a
                key={project.name}
                className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-sky-400/50 hover:bg-slate-900"
                href={project.href}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex h-full flex-col gap-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl font-semibold text-white">
                        {project.name}
                      </h3>
                      <span className="text-sm text-sky-400 transition group-hover:text-sky-300">
                        Open →
                      </span>
                    </div>
                    <p className="leading-7 text-slate-300">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
