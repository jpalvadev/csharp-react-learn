import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tratamientosEquipo/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tratamientosEquipo/$id/edit"!</div>
}
