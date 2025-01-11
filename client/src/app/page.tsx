import LoginForm from "@/components/LoginForm"
import { Suspense } from 'react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
              <Suspense fallback={<div>Loading...</div>}>

      <LoginForm />
      </Suspense>
    </main>
  )
}

