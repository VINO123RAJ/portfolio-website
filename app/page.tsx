import { Navigation } from '@/components/navigation/navigation'
import { Hero } from '@/components/hero/hero'
import { About } from '@/components/about/about'
import { DevelopmentPhilosophy } from '@/components/about/development-philosophy'
import { Skills } from '@/components/skills/skills'
import { Projects } from '@/components/projects/projects'
import { Experience } from '@/components/experience/experience'
import { Certifications } from '@/components/experience/certifications'
import { Achievements } from '@/components/experience/achievements'
import { AIAutomation } from '@/components/research/ai-automation'
import { Research } from '@/components/research/research'
import { GitHubSection } from '@/components/github/github-section'
import { ResumeSection } from '@/components/resume/resume-section'
import { Contact } from '@/components/contact/contact'
import { Footer } from '@/components/layout/footer'

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <section id="home" aria-label="Introduction">
          <Hero />
        </section>
        <section id="about" aria-label="About me">
          <About />
        </section>
        <section id="skills" aria-label="Technical skills">
          <Skills />
        </section>
        <section id="projects" aria-label="Featured projects">
          <Projects />
        </section>
        <section id="experience" aria-label="Experience and education">
          <Experience />
          <Certifications />
          <Achievements />
        </section>
        <section id="research" aria-label="Research and AI automation">
          <AIAutomation />
          <Research />
          <DevelopmentPhilosophy />
        </section>
        <section id="github" aria-label="GitHub activity">
          <GitHubSection />
        </section>
        <ResumeSection />
        <section id="contact" aria-label="Contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  )
}
