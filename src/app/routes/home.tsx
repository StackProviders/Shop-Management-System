import { Link } from 'react-router'
import BuiltWith from '@/features/built-with'
import GithubStarButton from '@/features/github-star-button'
import { Button } from '@/components/ui/button'
import { UpdateNotification } from '@/features/updater/components/update-notification'

export function HomePage() {
    return (
        <div className="flex h-screen">
            <div className="m-auto text-center space-y-3 w-full max-w-2xl px-4">
                <UpdateNotification className="mb-4" />
                <div className="space-y-3">
                    <BuiltWith />
                    <h1 className="text-3xl items-center">
                        Welcome to Tauri Core template!
                    </h1>
                    <p>
                        This template is a starting point for building Tauri
                        apps with Vite, React, and Tailwind CSS.
                    </p>
                </div>
                <div className="flex gap-3 justify-center">
                    <Button asChild>
                        <Link to="/todos">Go to Todos</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link to="/settings">Settings</Link>
                    </Button>
                    <GithubStarButton />
                </div>
            </div>
        </div>
    )
}

// Necessary for react router to lazy load.
export const Component = HomePage
