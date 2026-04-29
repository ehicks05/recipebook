import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/import-recipe')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/import-recipe"!</div>
}
