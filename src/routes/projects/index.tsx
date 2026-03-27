import ProjectsPages from '@/pages/ProjectsPages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProjectsPages />
}
