import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, CheckCircle, Lock } from "lucide-react"

export default async function LearnPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // This would normally be fetched from your database
  const modules = [
    {
      id: 1,
      title: "Introduction to the Indian Constitution",
      description: "Learn about the history and making of the Indian Constitution",
      chapters: 5,
      progress: 100,
      completed: true,
      unlocked: true,
    },
    {
      id: 2,
      title: "Fundamental Rights",
      description: "Explore the fundamental rights guaranteed by the Constitution",
      chapters: 6,
      progress: 75,
      completed: false,
      unlocked: true,
    },
    {
      id: 3,
      title: "Directive Principles of State Policy",
      description: "Understand the guiding principles for governance",
      chapters: 4,
      progress: 30,
      completed: false,
      unlocked: true,
    },
    {
      id: 4,
      title: "Fundamental Duties",
      description: "Learn about the duties of citizens as per the Constitution",
      chapters: 3,
      progress: 0,
      completed: false,
      unlocked: true,
    },
    {
      id: 5,
      title: "Constitutional Amendments",
      description: "Study the major amendments to the Constitution",
      chapters: 8,
      progress: 0,
      completed: false,
      unlocked: false,
    },
    {
      id: 6,
      title: "Federal Structure",
      description: "Understand the federal nature of the Indian Constitution",
      chapters: 7,
      progress: 0,
      completed: false,
      unlocked: false,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Modules</h1>
          <p className="text-gray-500 dark:text-gray-400">Master the Indian Constitution one chapter at a time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card key={module.id} className={module.unlocked ? "" : "opacity-80"}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{module.title}</CardTitle>
                  {module.completed && (
                    <Badge className="bg-green-500">
                      <CheckCircle className="h-3 w-3 mr-1" /> Completed
                    </Badge>
                  )}
                  {!module.unlocked && (
                    <Badge variant="outline" className="border-orange-500 text-orange-500">
                      <Lock className="h-3 w-3 mr-1" /> Locked
                    </Badge>
                  )}
                </div>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-orange-500" />
                      <span className="text-sm">{module.chapters} Chapters</span>
                    </div>
                    <span className="text-sm font-medium">{module.progress}% Complete</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                {module.unlocked ? (
                  <Link href={`/learn/${module.id}`} className="w-full">
                    <Button className="w-full" variant={module.completed ? "outline" : "default"}>
                      {module.progress > 0 && module.progress < 100
                        ? "Continue"
                        : module.completed
                          ? "Review"
                          : "Start Learning"}
                    </Button>
                  </Link>
                ) : (
                  <Button disabled className="w-full">
                    <Lock className="h-4 w-4 mr-2" /> Complete Previous Modules
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
