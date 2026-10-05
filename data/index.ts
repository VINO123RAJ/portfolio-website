export { profile, navigationItems } from '@/data/profile'
export { projects } from '@/data/projects'
export { experience, education, certifications, achievements } from '@/data/experience'
export {
  stats,
  skillCategories,
  designProcess,
  aiAutomationFlowNodes,
  aiAutomationFlowEdges,
} from '@/data/skills'
export { colors, gradients, fontSize, borderRadius, transition, breakpoints } from '@/data/tokens'
export type { DesignTokens } from '@/types'
import type { DesignTokens } from '@/types'
import {
  colors,
  gradients,
  fontSize,
  borderRadius,
  transition,
  breakpoints,
  spacing,
  fontWeight,
  shadows,
} from '@/data/tokens'

export const designTokens: DesignTokens = {
  colors,
  gradients,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
  transition,
  breakpoints,
  shadows,
}
