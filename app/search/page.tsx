import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, HelpCircle, SearchIcon } from "lucide-react"
import Link from "next/link"
import { searchContent } from "@/lib/data"

interface SearchPageProps {
  searchParams: { q?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const query = searchParams.q || ""
  const results = query ? await searchContent(query) : { modules: [], chapters: [], quizzes: [] }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Search</h1>
          <p className="text-gray-500 dark:text-gray-400">Find learning content across the platform</p>
        </div>

        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <form>
            <Input
              type="search"
              name="q"
              placeholder="Search for modules, chapters, quizzes..."
              className="pl-10"
              defaultValue={query}
            />
          </form>
        </div>

        {query ? (
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">
                All Results ({results.modules.length + results.chapters.length + results.quizzes.length})
              </TabsTrigger>
              <TabsTrigger value="modules">Modules ({results.modules.length})</TabsTrigger>
              <TabsTrigger value="chapters">Chapters ({results.chapters.length})</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes ({results.quizzes.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {results.modules.length === 0 && results.chapters.length === 0 && results.quizzes.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                    <SearchIcon className="h-10 w-10 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No results found</h3>
                    <p className="text-gray-500 max-w-md">
                      We couldn't find any content matching "{query}". Try using different keywords or check your
                      spelling.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {results.modules.length > 0 && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Modules</CardTitle>
                        <CardDescription>Learning modules matching your search</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {results.modules.map((module) => (
                            <div key={module.id} className="flex items-start gap-3 border-b pb-4 last:border-0">
                              <BookOpen className="h-5 w-5 text-orange-500 mt-0.5" />
                              <div>
                                <Link href={`/learn/${module.id}`} className="font-medium hover:underline">
                                  {module.title}
                                </Link>
                                <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline">{module.chapters} chapters</Badge>
                                  <Badge variant={module.status === "published" ? "default" : "secondary"}>
                                    {module.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {results.chapters.length > 0 && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Chapters</CardTitle>
                        <CardDescription>Learning chapters matching your search</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {results.chapters.map((chapter) => (
                            <div key={chapter.id} className="flex items-start gap-3 border-b pb-4 last:border-0">
                              <BookOpen className="h-5 w-5 text-green-500 mt-0.5" />
                              <div>
                                <Link
                                  href={`/learn/${chapter.moduleId}/chapter/${chapter.id}`}
                                  className="font-medium hover:underline"
                                >
                                  {chapter.title}
                                </Link>
                                <p className="text-sm text-gray-500 mt-1">{chapter.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline">{chapter.moduleName}</Badge>
                                  {chapter.hasQuiz && <Badge variant="secondary">Has Quiz</Badge>}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {results.quizzes.length > 0 && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Quizzes</CardTitle>
                        <CardDescription>Quizzes matching your search</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {results.quizzes.map((quiz) => (
                            <div key={quiz.id} className="flex items-start gap-3 border-b pb-4 last:border-0">
                              <HelpCircle className="h-5 w-5 text-purple-500 mt-0.5" />
                              <div>
                                <Link
                                  href={`/learn/${quiz.moduleId}/quiz/${quiz.chapterId}`}
                                  className="font-medium hover:underline"
                                >
                                  {quiz.title}
                                </Link>
                                <p className="text-sm text-gray-500 mt-1">{quiz.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline">{quiz.moduleName}</Badge>
                                  <Badge variant="outline">{quiz.questions} questions</Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="modules" className="space-y-4">
              {results.modules.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                    <BookOpen className="h-10 w-10 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No modules found</h3>
                    <p className="text-gray-500 max-w-md">
                      We couldn't find any modules matching "{query}". Try using different keywords.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {results.modules.map((module) => (
                        <div key={module.id} className="flex items-start gap-3 p-4">
                          <BookOpen className="h-5 w-5 text-orange-500 mt-0.5" />
                          <div className="flex-1">
                            <Link href={`/learn/${module.id}`} className="font-medium hover:underline">
                              {module.title}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline">{module.chapters} chapters</Badge>
                              <Badge variant={module.status === "published" ? "default" : "secondary"}>
                                {module.status}
                              </Badge>
                            </div>
                          </div>
                          <Link href={`/learn/${module.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="chapters" className="space-y-4">
              {results.chapters.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                    <BookOpen className="h-10 w-10 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No chapters found</h3>
                    <p className="text-gray-500 max-w-md">
                      We couldn't find any chapters matching "{query}". Try using different keywords.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {results.chapters.map((chapter) => (
                        <div key={chapter.id} className="flex items-start gap-3 p-4">
                          <BookOpen className="h-5 w-5 text-green-500 mt-0.5" />
                          <div className="flex-1">
                            <Link
                              href={`/learn/${chapter.moduleId}/chapter/${chapter.id}`}
                              className="font-medium hover:underline"
                            >
                              {chapter.title}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">{chapter.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline">{chapter.moduleName}</Badge>
                              {chapter.hasQuiz && <Badge variant="secondary">Has Quiz</Badge>}
                            </div>
                          </div>
                          <Link href={`/learn/${chapter.moduleId}/chapter/${chapter.id}`}>
                            <Button variant="ghost" size="sm">
                              Read
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-4">
              {results.quizzes.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                    <HelpCircle className="h-10 w-10 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No quizzes found</h3>
                    <p className="text-gray-500 max-w-md">
                      We couldn't find any quizzes matching "{query}". Try using different keywords.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {results.quizzes.map((quiz) => (
                        <div key={quiz.id} className="flex items-start gap-3 p-4">
                          <HelpCircle className="h-5 w-5 text-purple-500 mt-0.5" />
                          <div className="flex-1">
                            <Link
                              href={`/learn/${quiz.moduleId}/quiz/${quiz.chapterId}`}
                              className="font-medium hover:underline"
                            >
                              {quiz.title}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">{quiz.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline">{quiz.moduleName}</Badge>
                              <Badge variant="outline">{quiz.questions} questions</Badge>
                            </div>
                          </div>
                          <Link href={`/learn/${quiz.moduleId}/quiz/${quiz.chapterId}`}>
                            <Button variant="ghost" size="sm">
                              Take Quiz
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <SearchIcon className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">Search for learning content</h3>
              <p className="text-gray-500 max-w-md">
                Enter keywords to search for modules, chapters, quizzes, and more across the platform.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
