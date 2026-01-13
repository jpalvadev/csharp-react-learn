import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tratamientosEquipo/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tratamientosEquipo/$id/"!</div>
}
