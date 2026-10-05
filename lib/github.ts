import type { GitHubProfile, GitHubRepo } from '@/types'

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'VINO123RAJ'

export async function fetchGitHubProfile(): Promise<GitHubProfile | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/vnd.github+json' },
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 404) return null
      throw new Error(`GitHub API error: ${res.status}`)
    }

    const data = (await res.json()) as GitHubProfile
    return data
  } catch {
    return null
  }
}

export async function fetchGitHubRepos(limit = 6): Promise<GitHubRepo[] | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${limit}`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: 'application/vnd.github+json' },
      },
    )

    if (!res.ok) {
      if (res.status === 403 || res.status === 404) return null
      throw new Error(`GitHub API error: ${res.status}`)
    }

    const data = (await res.json()) as GitHubRepo[]
    return data
  } catch {
    return null
  }
}

export async function fetchGitHubContributions(): Promise<number | null> {
  try {
    const res = await fetch('https://github.com/users/VINO123RAJ/contributions', {
      method: 'GET',
      // GitHub contributions page is HTML; parsing it is fragile.
      // We return total contribution count from profile as proxy.
      next: { revalidate: 86400 },
    })

    if (!res.ok) return null
    // We won't parse the HTML; this is just to indicate the endpoint exists.
    return null
  } catch {
    return null
  }
}
