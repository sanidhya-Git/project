import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, BookOpen, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface UserProgressCardProps {
  userId: string
  level: number
  xp: number
  nextLevelXp: number
  completedModules: number
  totalModules: number
  completedChapters: number
  totalChapters: number
  passedQuizzes: number
  totalQuizzes: number
}

export function UserProgressCard({
  userId,
  level,
  xp,
  nextLevelXp,
  completedModules,
  totalModules,
  completedChapters,
  totalChapters,
  passedQuizzes,
  totalQuizzes,
}: UserProgressCardProps) {
  const levelProgress = Math.min(Math.round((xp / nextLevelXp) * 100), 100)
  const moduleProgress = Math.round((completedModules / totalModules) * 100)
  const chapterProgress = Math.round((completedChapters / totalChapters) * 100)
  const quizProgress = Math.round((passedQuizzes / totalQuizzes) * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Progress</CardTitle>
        <CardDescription>Track your journey through the Indian Constitution</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-orange-500" />
              <span className="font-medium">Level {level}</span>
            </div>
            <span className="text-sm text-gray-500">
              {xp}/{nextLevelXp} XP
            </span>
          </div>
          <Progress value={levelProgress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Modules</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {completedModules}/{totalModules} completed
              </span>
              <span className="text-xs font-medium">{moduleProgress}%</span>
            </div>
            <Progress value={moduleProgress} className="h-1.5" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Chapters</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {completedChapters}/{totalChapters} completed
              </span>
              <span className="text-xs font-medium">{chapterProgress}%</span>
            </div>
            <Progress value={chapterProgress} className="h-1.5" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Quizzes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {passedQuizzes}/{totalQuizzes} passed
              </span>
              <span className="text-xs font-medium">{quizProgress}%</span>
            </div>
            <Progress value={quizProgress} className="h-1.5" />
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/profile">
            <Button variant="outline" size="sm">
              View Full Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
