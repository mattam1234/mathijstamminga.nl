import { GithubProjects } from "@/components/github-projects";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.2),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#020617_45%,_#0f172a_100%)]" />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-20 px-6 py-16 sm:px-10 lg:px-12">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
          <div className="flex flex-col gap-6">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
              Mathijs Stamminga
            </p>
            <div className="max-w-4xl space-y-5">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                A personal site that stays in sync with what I’m building in
                public.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                Software developer focused on robust applications, cloud
                solutions, and side projects that mix practical engineering with
                a bit of fun. The projects below update dynamically from public
                GitHub repositories and every card uses a real link.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                href="https://github.com/mattam1234"
                target="_blank"
                rel="noreferrer"
              >
                View GitHub profile
              </a>
              <a
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10"
                href="https://www.linkedin.com/in/mathijs-stamminga/"
                target="_blank"
                rel="noreferrer"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
              Current focus
            </p>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm text-slate-400">What this page shows</p>
                <p className="mt-2 text-lg font-medium text-white">
                  Recently active public repositories from GitHub.
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">How it updates</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  The project feed is loaded in the browser from the public
                  GitHub API, so the site stays current without manually editing
                  the list every time something changes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                Active projects
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Public work, automatically surfaced.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              Cards are ranked by recent activity and filtered to public,
              non-archived, non-fork repositories.
            </p>
          </div>

          <GithubProjects />
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                Let&apos;s connect
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Want the full picture?
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-300">
                Explore the full public repository list, follow ongoing work, or
                reach out through LinkedIn.
              </p>
            </div>
            <a
              className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
              href="https://github.com/mattam1234?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              Browse all repositories
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
