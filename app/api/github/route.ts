import { NextResponse } from 'next/server'
import { fetchGitHubProfile, fetchGitHubRepos } from '@/lib/github'

export const revalidate = 3600

export async function GET() {
  try {
    const [profile, repos] = await Promise.all([fetchGitHubProfile(), fetchGitHubRepos(6)])

    if (!profile) {
      return NextResponse.json(
        { available: false, reason: 'GitHub data unavailable' },
        { status: 200 },
      )
    }

    return NextResponse.json({
      available: true,
      profile,
      repos: repos ?? [],
    })
  } catch {
    return NextResponse.json(
      { available: false, reason: 'Failed to load GitHub data' },
      { status: 200 },
    )
  }
}
