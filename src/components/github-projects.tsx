"use client";

import { useEffect, useMemo, useState } from "react";

type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  updated_at: string;
};

const GITHUB_USERNAME = "mattam1234";
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;
const EXCLUDED_REPOS = new Set(["mattam1234", "mathijstamminga.nl"]);

function formatRelativeDate(dateString: string) {
  const now = Date.now();
  const date = new Date(dateString).getTime();
  const signedDiffInDays = Math.round((date - now) / (1000 * 60 * 60 * 24));
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (Math.abs(signedDiffInDays) < 30) {
    return formatter.format(signedDiffInDays, "day");
  }

  const signedDiffInMonths = Math.round(signedDiffInDays / 30);
  return formatter.format(signedDiffInMonths, "month");
}

function getTopProjects(repos: GitHubRepo[]) {
  return repos
    .filter(
      (repo) =>
        !repo.fork && !repo.archived && !EXCLUDED_REPOS.has(repo.name),
    )
    .sort(
      (repoA, repoB) =>
        new Date(repoB.pushed_at).getTime() - new Date(repoA.pushed_at).getTime(),
    )
    .slice(0, 6);
}

function LoadingCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-24 rounded bg-white/10" />
        <div className="h-7 w-2/3 rounded bg-white/10" />
        <div className="h-4 w-full rounded bg-white/10" />
        <div className="h-4 w-4/5 rounded bg-white/10" />
        <div className="flex gap-2 pt-4">
          <div className="h-8 w-20 rounded-full bg-white/10" />
          <div className="h-8 w-16 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export function GithubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepos() {
      try {
        const response = await fetch(GITHUB_REPOS_URL, {
          headers: {
            Accept: "application/vnd.github+json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`GitHub request failed with ${response.status}`);
        }

        const data = (await response.json()) as GitHubRepo[];
        setRepos(getTopProjects(data));
        setStatus("ready");
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error(error);
        setStatus("error");
      }
    }

    void loadRepos();

    return () => controller.abort();
  }, []);

  const languageCount = useMemo(() => {
    return new Set(repos.map((repo) => repo.language).filter(Boolean)).size;
  }, [repos]);

  if (status === "loading") {
    return (
      <div className="grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-28 rounded bg-white/10" />
            <div className="h-10 w-24 rounded bg-white/10" />
            <div className="h-4 w-full rounded bg-white/10" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6 text-amber-50">
        <h3 className="text-xl font-semibold">GitHub sync is temporarily unavailable.</h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-amber-100/80">
          The site could not load the latest public repositories right now. You
          can still view everything directly on GitHub.
        </p>
        <a
          className="mt-5 inline-flex rounded-full border border-amber-200/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
        >
          View public repositories
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr]">
      <aside className="flex h-fit flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
          Live GitHub feed
        </p>
        <div>
          <p className="text-4xl font-semibold text-white">{repos.length}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Recently active public repositories shown here.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Languages
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">{languageCount}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Updated
            </p>
            <p className="mt-2 text-sm font-medium text-white">
              {repos[0] ? formatRelativeDate(repos[0].pushed_at) : "—"}
            </p>
          </div>
        </div>
        <p className="text-sm leading-7 text-slate-300">
          This section updates from whatever is currently public on GitHub, so
          new active projects will naturally surface here.
        </p>
        <a
          className="inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
          href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
        >
          See all public repos
        </a>
      </aside>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {repos.map((repo) => {
          const tags = [repo.language, ...repo.topics].filter(Boolean).slice(0, 3);

          return (
            <a
              key={repo.id}
              className="group flex min-h-[22rem] flex-col rounded-3xl border border-white/10 bg-slate-950/50 p-6 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-slate-950/70"
              href={repo.homepage || repo.html_url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-cyan-300">Public project</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    {repo.name}
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                  {formatRelativeDate(repo.pushed_at)}
                </span>
              </div>

              <p className="mt-5 flex-1 text-sm leading-7 text-slate-300">
                {repo.description || "Open the repository to see the latest work."}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {tags.length > 0 ? (
                  tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                    Repository
                  </span>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
                <span>★ {repo.stargazers_count}</span>
                <span>⑂ {repo.forks_count}</span>
                <span className="text-cyan-300 transition group-hover:text-cyan-200">
                  Open link →
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
