import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/my-page')({
  component: () => <div>Hello /my-page!</div>
})