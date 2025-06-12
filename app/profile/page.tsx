import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Award, BookOpen, CheckCircle, Clock, Edit, Trophy, User } from "lucide-react"
import Link from "next/link"
import { getUserProfile } from "@/lib/data"

export default async function ProfilePage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // Fetch user profile data
  const profile = await getUserProfile(userId)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-gray-500 dark:text-gray-400">View and manage your learning journey</p>
          </div>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" /> Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={profile.avatarUrl || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{profile.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{profile.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Trophy className="h-5 w-5 text-orange-500" />
                  <span className="font-medium">Level {profile.level}</span>
                </div>
                <div className="w-full mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>XP Progress</span>
                    <span>
                      {profile.currentLevelXp}/{profile.nextLevelXp} XP
                    </span>
                  </div>
                  <Progress value={profile.levelProgress} className="h-2" />
                </div>
                <div className="mt-6 w-full">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="border rounded-lg p-3">
                      <p className="text-2xl font-bold">{profile.totalXp}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total XP</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="text-2xl font-bold">{profile.badges.length}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Badges</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <Tabs defaultValue="achievements" className="w-full">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle>Learning Journey</CardTitle>
                  <TabsList>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="stats">Stats</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <TabsContent value="achievements" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-orange-500" /> Badges
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {profile.badges.map((badge) => (
                        <div key={badge.id} className="flex flex-col items-center text-center p-3 border rounded-lg">
                          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-2">
                            {badge.icon === "Award" && <Award className="h-6 w-6 text-orange-500" />}
                            {badge.icon === "BookOpen" && <BookOpen className="h-6 w-6 text-orange-500" />}
                            {badge.icon === "Trophy" && <Trophy className="h-6 w-6 text-orange-500" />}
                            {badge.icon === "CheckCircle" && <CheckCircle className="h-6 w-6 text-orange-500" />}
                          </div>
                          <span className="font-medium text-sm">{badge.name}</span>
                          <span className="text-xs text-gray-500 mt-1">{badge.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-orange-500" /> Leaderboard Rankings
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Weekly Rank</span>
                          <Badge variant="outline">{profile.weeklyRank}</Badge>
                        </div>
                        <p className="text-2xl font-bold mt-2">#{profile.weeklyRank}</p>
                        <p className="text-sm text-gray-500">Top {profile.weeklyPercentile}%</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">All-Time Rank</span>
                          <Badge variant="outline">{profile.allTimeRank}</Badge>
                        </div>
                        <p className="text-2xl font-bold mt-2">#{profile.allTimeRank}</p>
                        <p className="text-sm text-gray-500">Top {profile.allTimePercentile}%</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <div className="space-y-4">
                    {profile.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 border-b pb-4 last:border-0">
                        {activity.type === "quiz" && <BookOpen className="h-5 w-5 text-orange-500 mt-0.5" />}
                        {activity.type === "chapter" && <BookOpen className="h-5 w-5 text-green-500 mt-0.5" />}
                        {activity.type === "badge" && <Award className="h-5 w-5 text-purple-500 mt-0.5" />}
                        {activity.type === "level" && <Trophy className="h-5 w-5 text-yellow-500 mt-0.5" />}
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <div className="flex items-center gap-2">
                            {activity.score && <Badge variant="outline">{activity.score}</Badge>}
                            {activity.xp && <Badge className="bg-orange-500">+{activity.xp} XP</Badge>}
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {activity.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="stats" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Learning Progress</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500">Modules Completed</p>
                        <p className="text-2xl font-bold mt-1">
                          {profile.completedModules}/{profile.totalModules}
                        </p>
                        <Progress
                          value={(profile.completedModules / profile.totalModules) * 100}
                          className="h-1 mt-2"
                        />
                      </div>
                      <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500">Chapters Read</p>
                        <p className="text-2xl font-bold mt-1">
                          {profile.completedChapters}/{profile.totalChapters}
                        </p>
                        <Progress
                          value={(profile.completedChapters / profile.totalChapters) * 100}
                          className="h-1 mt-2"
                        />
                      </div>
                      <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500">Quizzes Passed</p>
                        <p className="text-2xl font-bold mt-1">
                          {profile.passedQuizzes}/{profile.totalQuizzes}
                        </p>
                        <Progress value={(profile.passedQuizzes / profile.totalQuizzes) * 100} className="h-1 mt-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Quiz Performance</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500">Average Score</p>
                        <p className="text-2xl font-bold mt-1">{profile.averageScore}%</p>
                        <Progress value={profile.averageScore} className="h-1 mt-2" />
                      </div>
                      <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500">Perfect Scores</p>
                        <p className="text-2xl font-bold mt-1">
                          {profile.perfectScores}/{profile.totalQuizAttempts}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {Math.round((profile.perfectScores / profile.totalQuizAttempts) * 100)}% of attempts
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Module Progress</CardTitle>
            <CardDescription>Track your progress through each learning module</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {profile.moduleProgress.map((module) => (
                <div key={module.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-orange-500" />
                      <h3 className="font-medium">{module.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {module.completedChapters}/{module.totalChapters} Chapters
                      </span>
                      <Badge variant={module.completed ? "default" : "outline"}>
                        {module.completed ? "Completed" : `${module.progress}%`}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                  <div className="flex justify-end">
                    <Link href={`/learn/${module.id}`}>
                      <Button variant="ghost" size="sm">
                        {module.completed ? "Review" : "Continue"}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
