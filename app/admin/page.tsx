import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, Edit, Trash2, Users, BookOpen, HelpCircle } from "lucide-react"
import Link from "next/link"

export default async function AdminPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }


  const users = [
    {
      id: 1,
      name: "Arjun Sharma",
      email: "arjun@example.com",
      level: 8,
      xp: 4250,
      joined: "2023-05-15",
      status: "active",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya@example.com",
      level: 7,
      xp: 3720,
      joined: "2023-06-22",
      status: "active",
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul@example.com",
      level: 7,
      xp: 3690,
      joined: "2023-07-10",
      status: "inactive",
    },
    {
      id: 4,
      name: "Ananya Singh",
      email: "ananya@example.com",
      level: 6,
      xp: 2640,
      joined: "2023-08-05",
      status: "active",
    },
    {
      id: 5,
      name: "Vikram Mehta",
      email: "vikram@example.com",
      level: 6,
      xp: 2610,
      joined: "2023-09-18",
      status: "active",
    },
  ]

  // Mock data for modules
  const modules = [
    { id: 1, title: "Introduction to the Indian Constitution", chapters: 5, quizzes: 5, status: "published" },
    { id: 2, title: "Fundamental Rights", chapters: 6, quizzes: 6, status: "published" },
    { id: 3, title: "Directive Principles of State Policy", chapters: 4, quizzes: 4, status: "published" },
    { id: 4, title: "Fundamental Duties", chapters: 3, quizzes: 3, status: "published" },
    { id: 5, title: "Constitutional Amendments", chapters: 8, quizzes: 8, status: "draft" },
    { id: 6, title: "Federal Structure", chapters: 7, quizzes: 0, status: "draft" },
  ]

  // Mock data for quizzes
  const quizzes = [
    {
      id: 1,
      title: "Historical Background Quiz",
      module: "Introduction to the Indian Constitution",
      questions: 10,
      attempts: 245,
      avgScore: 78,
    },
    {
      id: 2,
      title: "Constituent Assembly Quiz",
      module: "Introduction to the Indian Constitution",
      questions: 8,
      attempts: 220,
      avgScore: 82,
    },
    {
      id: 3,
      title: "Right to Equality Quiz",
      module: "Fundamental Rights",
      questions: 10,
      attempts: 198,
      avgScore: 75,
    },
    { id: 4, title: "Right to Freedom Quiz", module: "Fundamental Rights", questions: 12, attempts: 185, avgScore: 68 },
    {
      id: 5,
      title: "Right against Exploitation Quiz",
      module: "Fundamental Rights",
      questions: 8,
      attempts: 162,
      avgScore: 72,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage content, users, and monitor platform activity</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Users</CardTitle>
              <CardDescription>Active learners on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-500" />
                <span className="text-3xl font-bold">1,245</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Learning Modules</CardTitle>
              <CardDescription>Published content modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-500" />
                <span className="text-3xl font-bold">6</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">2 modules in draft</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quiz Attempts</CardTitle>
              <CardDescription>Total quiz attempts this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-orange-500" />
                <span className="text-3xl font-bold">3,782</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Avg. score: 74%</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="modules">Learning Modules</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input type="search" placeholder="Search users..." className="w-full pl-8" />
              </div>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" /> Add User
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>XP</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.level}</TableCell>
                        <TableCell>{user.xp}</TableCell>
                        <TableCell>{user.joined}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modules" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input type="search" placeholder="Search modules..." className="w-full pl-8" />
              </div>
              <Link href="/admin/modules/new">
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" /> Create Module
                </Button>
              </Link>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Chapters</TableHead>
                      <TableHead>Quizzes</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modules.map((module) => (
                      <TableRow key={module.id}>
                        <TableCell className="font-medium">{module.title}</TableCell>
                        <TableCell>{module.chapters}</TableCell>
                        <TableCell>{module.quizzes}</TableCell>
                        <TableCell>
                          <Badge variant={module.status === "published" ? "default" : "secondary"}>
                            {module.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/modules/${module.id}`}>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </Link>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input type="search" placeholder="Search quizzes..." className="w-full pl-8" />
              </div>
              <Link href="/admin/quizzes/new">
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" /> Create Quiz
                </Button>
              </Link>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Module</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Attempts</TableHead>
                      <TableHead>Avg. Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizzes.map((quiz) => (
                      <TableRow key={quiz.id}>
                        <TableCell className="font-medium">{quiz.title}</TableCell>
                        <TableCell>{quiz.module}</TableCell>
                        <TableCell>{quiz.questions}</TableCell>
                        <TableCell>{quiz.attempts}</TableCell>
                        <TableCell>{quiz.avgScore}%</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/quizzes/${quiz.id}`}>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </Link>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
