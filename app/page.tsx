import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { BookOpen, Award, BarChart2, CheckCircle } from "lucide-react"

export default async function Home() {
  const { userId } = await auth()
  const isSignedIn = !!userId

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">ConstitutionQuest</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/learn" className="text-sm font-medium hover:underline underline-offset-4">
              Learn
            </Link>
            <Link href="/quizzes" className="text-sm font-medium hover:underline underline-offset-4">
              Quizzes
            </Link>
            <Link href="/leaderboard" className="text-sm font-medium hover:underline underline-offset-4">
              Leaderboard
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <div className="flex gap-2">
                <Link href="/sign-in">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Learn the Indian Constitution in a Fun & Interactive Way
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Master the principles and articles of the Indian Constitution through gamified learning. Earn XP,
                  collect badges, and climb the leaderboard as you progress.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      {isSignedIn ? "Go to Dashboard" : "Start Learning Now"}
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Indian Constitution Learning Platform"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                width={600}
                height={400}
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform makes learning the Indian Constitution engaging and effective
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                <BookOpen className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Topic-wise Learning</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Structured modules covering all aspects of the Indian Constitution
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                <CheckCircle className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Interactive Quizzes</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Test your knowledge with chapter-based quizzes and get instant feedback
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                <Award className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">XP & Badges</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Earn experience points and unlock badges as you master new concepts
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                <BarChart2 className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Progress Tracking</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Monitor your learning journey with detailed progress analytics
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} ConstitutionQuest. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="/terms" className="text-xs hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
