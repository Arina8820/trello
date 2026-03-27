import ProjectsPages from '@/pages/ProjectsPages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projectspage')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProjectsPages/> 
}
