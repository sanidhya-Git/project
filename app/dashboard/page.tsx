import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Award, Trophy, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // This would normally be fetched from your database
  const mockUserData = {
    name: "Student",
    xp: 1250,
    level: 5,
    progress: 35,
    recentActivity: [
      { id: 1, type: "quiz", title: "Fundamental Rights Quiz", score: "8/10", date: "2 days ago" },
      { id: 2, type: "chapter", title: "Directive Principles", date: "3 days ago" },
      { id: 3, type: "badge", title: "Constitution Expert", date: "1 week ago" },
    ],
    badges: [
      { id: 1, name: "First Quiz", description: "Completed your first quiz", icon: "Award" },
      { id: 2, name: "Knowledge Seeker", description: "Read 5 chapters", icon: "BookOpen" },
      { id: 3, name: "Perfect Score", description: "Got 100% on a quiz", icon: "Trophy" },
    ],
    recommendedModules: [
      { id: 1, title: "Fundamental Rights", progress: 75 },
      { id: 2, title: "Directive Principles", progress: 30 },
      { id: 3, title: "Constitutional Amendments", progress: 0 },
    ],
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Welcome back, {mockUserData.name}!</CardTitle>
              <CardDescription>Here's your learning progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-orange-500" />
                  <span className="font-medium">Level {mockUserData.level}</span>
                </div>
                <span className="text-sm text-gray-500">{mockUserData.xp} XP</span>
              </div>
              <Progress value={mockUserData.progress} className="h-2 mb-6" />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Chapters Completed</span>
                  <span className="text-2xl font-bold">12/34</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Quizzes Passed</span>
                  <span className="text-2xl font-bold">8/15</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest learning activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUserData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    {activity.type === "quiz" && <BookOpen className="h-5 w-5 text-orange-500 mt-0.5" />}
                    {activity.type === "chapter" && <BookOpen className="h-5 w-5 text-green-500 mt-0.5" />}
                    {activity.type === "badge" && <Award className="h-5 w-5 text-purple-500 mt-0.5" />}
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <div className="flex items-center gap-2">
                        {activity.score && <Badge variant="outline">{activity.score}</Badge>}
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {activity.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUserData.recommendedModules.map((module) => (
                  <div key={module.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{module.title}</span>
                      <span className="text-sm text-gray-500">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                    <div className="flex justify-end">
                      <Link href={`/learn/${module.id}`}>
                        <Button variant="ghost" size="sm">
                          Continue
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Your Badges</CardTitle>
              <CardDescription>Achievements you've unlocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {mockUserData.badges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center text-center p-2 border rounded-lg">
                    <Award className="h-8 w-8 text-orange-500 mb-2" />
                    <span className="font-medium text-sm">{badge.name}</span>
                    <span className="text-xs text-gray-500">{badge.description}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/badges">
                  <Button variant="outline" size="sm">
                    View All Badges
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
