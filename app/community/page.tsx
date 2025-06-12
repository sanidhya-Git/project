import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, ThumbsUp, Clock, PlusCircle, Filter, Search } from "lucide-react"
import Link from "next/link"
import { getDiscussions } from "@/lib/data"

export default async function CommunityPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // Fetch discussions data
  const { discussions, popularTags } = await getDiscussions()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Community</h1>
            <p className="text-gray-500 dark:text-gray-400">Discuss the Indian Constitution with fellow learners</p>
          </div>
          <Link href="/community/new">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" /> New Discussion
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>Discussions</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative w-full sm:w-auto">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input type="search" placeholder="Search discussions..." className="w-full sm:w-[200px] pl-8" />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Filter</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="recent" className="w-full">
                  <div className="px-6 border-b">
                    <TabsList className="w-full justify-start">
                      <TabsTrigger value="recent">Recent</TabsTrigger>
                      <TabsTrigger value="popular">Popular</TabsTrigger>
                      <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="recent" className="m-0">
                    <div className="divide-y">
                      {discussions.map((discussion) => (
                        <div key={discussion.id} className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={discussion.author.avatar || "/placeholder.svg"}
                                alt={discussion.author.name}
                              />
                              <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <div>
                                <Link
                                  href={`/community/discussion/${discussion.id}`}
                                  className="font-medium text-lg hover:underline"
                                >
                                  {discussion.title}
                                </Link>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <span>{discussion.author.name}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> {discussion.createdAt}
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{discussion.content}</p>
                              <div className="flex flex-wrap gap-2">
                                {discussion.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center gap-4 pt-2">
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <ThumbsUp className="h-4 w-4" />
                                  <span>{discussion.likes}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <MessageCircle className="h-4 w-4" />
                                  <span>{discussion.comments}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="popular" className="m-0">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <MessageCircle className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Popular discussions</h3>
                      <p className="text-gray-500 max-w-md">
                        Switch to this tab to see the most popular discussions based on likes and comments.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="unanswered" className="m-0">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <MessageCircle className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Unanswered discussions</h3>
                      <p className="text-gray-500 max-w-md">
                        Switch to this tab to see discussions that haven't received any comments yet.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-center border-t p-4">
                <Button variant="outline">Load More</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
                <CardDescription>Browse discussions by topic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Link key={tag.name} href={`/community/tag/${tag.slug}`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                        {tag.name} <span className="ml-1 text-gray-500">({tag.count})</span>
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Be respectful and constructive in discussions</p>
                <p>• Stay on topic and avoid off-topic conversations</p>
                <p>• No spamming or self-promotion</p>
                <p>• Cite sources when referencing facts</p>
                <p>• Report inappropriate content to moderators</p>
              </CardContent>
              <CardFooter>
                <Link href="/community/guidelines" className="text-sm text-orange-500 hover:underline">
                  Read full guidelines
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
