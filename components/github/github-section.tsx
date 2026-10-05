'use client'

import { useEffect, useState } from 'react'
import styles from './github-section.module.css'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Icon } from '@/components/ui/icon'
import { profile } from '@/data/profile'
import type { GitHubProfile, GitHubRepo } from '@/types'

interface GitHubResponse {
  available: boolean
  profile?: GitHubProfile
  repos?: GitHubRepo[]
  reason?: string
}

type State = { status: 'loading' } | { status: 'ready'; data: GitHubResponse } | { status: 'error' }

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  C: '#555555',
}

export function GitHubSection() {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const res = await fetch('/api/github', { signal: controller.signal })
        if (!res.ok) throw new Error('Request failed')
        const data = (await res.json()) as GitHubResponse
        setState({ status: 'ready', data })
      } catch (error) {
        if ((error as Error).name === 'AbortError') return
        setState({ status: 'error' })
      }
    }

    load()
    return () => controller.abort()
  }, [])

  return (
    <section className={styles.github} aria-labelledby="github-heading">
      <Container>
        <SectionHeading
          index="09"
          id="github-heading"
          eyebrow="Open Source"
          title="Code, experiments and repositories."
          description="A live look at my GitHub activity. When the API is unavailable, this section falls back gracefully to a direct link."
        />

        {state.status === 'loading' && <GitHubSkeleton />}

        {state.status === 'error' && <GitHubFallback reason="Could not reach the GitHub API." />}

        {state.status === 'ready' && !state.data.available && (
          <GitHubFallback reason={state.data.reason ?? 'GitHub data is currently unavailable.'} />
        )}

        {state.status === 'ready' && state.data.available && state.data.profile && (
          <div className={styles.content}>
            <aside className={styles.profileCard}>
              <div className={styles.profileTop}>
                {state.data.profile.avatar_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={state.data.profile.avatar_url}
                    alt={`${state.data.profile.login} GitHub avatar`}
                    width={64}
                    height={64}
                    className={styles.avatar}
                    loading="lazy"
                  />
                )}
                <div className={styles.profileInfo}>
                  <span className={styles.login}>@{state.data.profile.login}</span>
                  <span className={styles.joined}>
                    Joined {new Date(state.data.profile.created_at).getFullYear()}
                  </span>
                </div>
              </div>

              <dl className={styles.profileStats}>
                <div className={styles.profileStat}>
                  <dt>Repositories</dt>
                  <dd>{state.data.profile.public_repos}</dd>
                </div>
                <div className={styles.profileStat}>
                  <dt>Followers</dt>
                  <dd>{state.data.profile.followers}</dd>
                </div>
                <div className={styles.profileStat}>
                  <dt>Following</dt>
                  <dd>{state.data.profile.following}</dd>
                </div>
              </dl>

              <a
                href={state.data.profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.profileLink}
              >
                <Icon name="github" size={16} />
                View Profile
                <Icon name="arrow-up-right" size={14} />
              </a>
            </aside>

            <div className={styles.repos}>
              {(state.data.repos ?? []).length === 0 ? (
                <div className={styles.noRepos}>No public repositories to display right now.</div>
              ) : (
                state.data.repos!.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.repoCard}
                  >
                    <div className={styles.repoHead}>
                      <Icon name="book-marked" size={15} className={styles.repoIcon} />
                      <span className={styles.repoName}>{repo.name}</span>
                      <Icon name="arrow-up-right" size={14} className={styles.repoArrow} />
                    </div>
                    <p className={styles.repoDesc}>
                      {repo.description ?? 'No description provided.'}
                    </p>
                    <div className={styles.repoMeta}>
                      {repo.language && (
                        <span className={styles.repoLang}>
                          <span
                            className={styles.langDot}
                            style={{
                              backgroundColor:
                                LANG_COLORS[repo.language] ?? 'var(--color-text-tertiary)',
                            }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className={styles.repoStat}>
                        <Icon name="star" size={13} />
                        {repo.stargazers_count}
                      </span>
                      <span className={styles.repoStat}>
                        <Icon name="git-fork" size={13} />
                        {repo.forks_count}
                      </span>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}

function GitHubSkeleton() {
  return (
    <div className={styles.content} aria-hidden="true">
      <div className={`${styles.profileCard} ${styles.skeleton}`} />
      <div className={styles.repos}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`${styles.repoCard} ${styles.skeleton}`} />
        ))}
      </div>
    </div>
  )
}

function GitHubFallback({ reason }: { reason: string }) {
  return (
    <div className={styles.fallback}>
      <div className={styles.fallbackIcon} aria-hidden="true">
        <Icon name="github" size={28} />
      </div>
      <h3 className={styles.fallbackTitle}>GitHub @{profile.githubUsername}</h3>
      <p className={styles.fallbackText}>{reason} You can still browse my work directly.</p>
      <a
        href={`https://github.com/${profile.githubUsername}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.fallbackLink}
      >
        <Icon name="github" size={16} />
        Open GitHub Profile
        <Icon name="arrow-up-right" size={14} />
      </a>
    </div>
  )
}
