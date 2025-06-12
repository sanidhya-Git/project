import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"

export default async function LeaderboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // This would normally be fetched from your database
  const weeklyLeaders = [
    { id: 1, name: "Arjun Sharma", xp: 850, level: 8, badges: 12, rank: 1, avatar: "/placeholder.svg" },
    { id: 2, name: "Priya Patel", xp: 720, level: 7, badges: 10, rank: 2, avatar: "/placeholder.svg" },
    { id: 3, name: "Rahul Verma", xp: 690, level: 7, badges: 9, rank: 3, avatar: "/placeholder.svg" },
    { id: 4, name: "Ananya Singh", xp: 640, level: 6, badges: 8, rank: 4, avatar: "/placeholder.svg" },
    { id: 5, name: "Vikram Mehta", xp: 610, level: 6, badges: 7, rank: 5, avatar: "/placeholder.svg" },
    { id: 6, name: "Neha Gupta", xp: 580, level: 6, badges: 8, rank: 6, avatar: "/placeholder.svg" },
    { id: 7, name: "Karan Malhotra", xp: 550, level: 5, badges: 6, rank: 7, avatar: "/placeholder.svg" },
    { id: 8, name: "Divya Sharma", xp: 520, level: 5, badges: 7, rank: 8, avatar: "/placeholder.svg" },
    { id: 9, name: "Amit Kumar", xp: 490, level: 5, badges: 5, rank: 9, avatar: "/placeholder.svg" },
    { id: 10, name: "Sneha Reddy", xp: 460, level: 4, badges: 6, rank: 10, avatar: "/placeholder.svg" },
  ]

  const allTimeLeaders = [
    { id: 1, name: "Rajesh Kumar", xp: 12500, level: 25, badges: 42, rank: 1, avatar: "/placeholder.svg" },
    { id: 2, name: "Meera Sharma", xp: 11200, level: 23, badges: 38, rank: 2, avatar: "/placeholder.svg" },
    { id: 3, name: "Vikram Singh", xp: 10800, level: 22, badges: 35, rank: 3, avatar: "/placeholder.svg" },
    { id: 4, name: "Priya Patel", xp: 9500, level: 20, badges: 32, rank: 4, avatar: "/placeholder.svg" },
    { id: 5, name: "Arjun Sharma", xp: 9200, level: 19, badges: 30, rank: 5, avatar: "/placeholder.svg" },
    { id: 6, name: "Ananya Singh", xp: 8800, level: 18, badges: 28, rank: 6, avatar: "/placeholder.svg" },
    { id: 7, name: "Rahul Verma", xp: 8500, level: 18, badges: 27, rank: 7, avatar: "/placeholder.svg" },
    { id: 8, name: "Neha Gupta", xp: 8200, level: 17, badges: 26, rank: 8, avatar: "/placeholder.svg" },
    { id: 9, name: "Karan Malhotra", xp: 7900, level: 17, badges: 25, rank: 9, avatar: "/placeholder.svg" },
    { id: 10, name: "Divya Sharma", xp: 7600, level: 16, badges: 24, rank: 10, avatar: "/placeholder.svg" },
  ]

  // Mock user's rank
  const userRank = {
    weekly: { rank: 23, xp: 320 },
    allTime: { rank: 45, xp: 5200 },
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
          <p className="text-gray-500 dark:text-gray-400">See how you rank against other Constitution learners</p>
        </div>

        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="all-time">All Time</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Weekly Top Performers</CardTitle>
                <CardDescription>Leaderboard resets every Sunday at midnight</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                          <Trophy className="h-10 w-10 text-orange-500" />
                        </div>
                        <span className="mt-2 font-bold text-lg">#1</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={weeklyLeaders[0].avatar || "/placeholder.svg"}
                              alt={weeklyLeaders[0].name}
                            />
                            <AvatarFallback>{weeklyLeaders[0].name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold">{weeklyLeaders[0].name}</p>
                            <p className="text-sm text-gray-500">Level {weeklyLeaders[0].level}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-500">{weeklyLeaders[0].xp} XP</p>
                      <p className="text-sm text-gray-500">{weeklyLeaders[0].badges} badges</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {weeklyLeaders.slice(1, 3).map((leader) => (
                      <div key={leader.id} className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            {leader.rank === 2 ? (
                              <Medal className="h-5 w-5 text-gray-500" />
                            ) : (
                              <Medal className="h-5 w-5 text-orange-400" />
                            )}
                          </div>
                          <div className="font-bold">#{leader.rank}</div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={leader.avatar || "/placeholder.svg"} alt={leader.name} />
                            <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{leader.name}</p>
                            <p className="text-xs text-gray-500">Level {leader.level}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{leader.xp} XP</p>
                          <p className="text-xs text-gray-500">{leader.badges} badges</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {weeklyLeaders.slice(3).map((leader) => (
                      <div key={leader.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 flex items-center justify-center">
                            <span className="font-bold text-sm">#{leader.rank}</span>
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={leader.avatar || "/placeholder.svg"} alt={leader.name} />
                            <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="font-medium">{leader.name}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">Level {leader.level}</Badge>
                          <p className="font-bold">{leader.xp} XP</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 border border-dashed rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 flex items-center justify-center">
                          <span className="font-bold text-sm">#{userRank.weekly.rank}</span>
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>Y</AvatarFallback>
                        </Avatar>
                        <p className="font-medium">You</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-bold">{userRank.weekly.xp} XP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all-time" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>All-Time Leaders</CardTitle>
                <CardDescription>The most dedicated Constitution learners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                          <Award className="h-10 w-10 text-orange-500" />
                        </div>
                        <span className="mt-2 font-bold text-lg">#1</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={allTimeLeaders[0].avatar || "/placeholder.svg"}
                              alt={allTimeLeaders[0].name}
                            />
                            <AvatarFallback>{allTimeLeaders[0].name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold">{allTimeLeaders[0].name}</p>
                            <p className="text-sm text-gray-500">Level {allTimeLeaders[0].level}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-500">{allTimeLeaders[0].xp} XP</p>
                      <p className="text-sm text-gray-500">{allTimeLeaders[0].badges} badges</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allTimeLeaders.slice(1, 3).map((leader) => (
                      <div key={leader.id} className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            {leader.rank === 2 ? (
                              <Medal className="h-5 w-5 text-gray-500" />
                            ) : (
                              <Medal className="h-5 w-5 text-orange-400" />
                            )}
                          </div>
                          <div className="font-bold">#{leader.rank}</div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={leader.avatar || "/placeholder.svg"} alt={leader.name} />
                            <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{leader.name}</p>
                            <p className="text-xs text-gray-500">Level {leader.level}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{leader.xp} XP</p>
                          <p className="text-xs text-gray-500">{leader.badges} badges</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {allTimeLeaders.slice(3).map((leader) => (
                      <div key={leader.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 flex items-center justify-center">
                            <span className="font-bold text-sm">#{leader.rank}</span>
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={leader.avatar || "/placeholder.svg"} alt={leader.name} />
                            <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="font-medium">{leader.name}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">Level {leader.level}</Badge>
                          <p className="font-bold">{leader.xp} XP</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 border border-dashed rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 flex items-center justify-center">
                          <span className="font-bold text-sm">#{userRank.allTime.rank}</span>
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>Y</AvatarFallback>
                        </Avatar>
                        <p className="font-medium">You</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-bold">{userRank.allTime.xp} XP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
