import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageCircle, ThumbsUp, Flag, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { getDiscussionById } from "@/lib/data"

export default async function DiscussionPage({ params }: { params: { id: string } }) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // Fetch discussion data
  const discussion = await getDiscussionById(params.id)

  if (!discussion) {
    redirect("/community")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/community">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Discussions
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">{discussion.title}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} alt={discussion.author.name} />
                      <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{discussion.author.name}</span>
                  </div>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {discussion.createdAt}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-2" /> Like
                </Button>
                <Button variant="ghost" size="icon">
                  <Flag className="h-4 w-4" />
                  <span className="sr-only">Report</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {discussion.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <p>{discussion.content}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{discussion.likes} likes</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{discussion.comments} comments</span>
              </div>
            </div>
            <span>Last updated {discussion.updatedAt}</span>
          </CardFooter>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageCircle className="h-5 w-5" /> Comments ({discussion.comments})
          </h2>

          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea placeholder="Add a comment..." className="mb-2" />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Comment</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {discussion.commentsList.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.author.name}</span>
                          {comment.author.isExpert && (
                            <Badge className="bg-orange-500">
                              <CheckCircle className="h-3 w-3 mr-1" /> Expert
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{comment.createdAt}</span>
                      </div>
                      <p className="mt-2">{comment.content}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" /> {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>

                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 pl-6 border-l space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="pt-4">
                              <div className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={reply.author.avatar || "/placeholder.svg"}
                                    alt={reply.author.name}
                                  />
                                  <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{reply.author.name}</span>
                                      {reply.author.isExpert && (
                                        <Badge className="bg-orange-500">
                                          <CheckCircle className="h-3 w-3 mr-1" /> Expert
                                        </Badge>
                                      )}
                                    </div>
                                    <span className="text-sm text-gray-500">{reply.createdAt}</span>
                                  </div>
                                  <p className="mt-2">{reply.content}</p>
                                  <div className="flex items-center gap-4 mt-2">
                                    <Button variant="ghost" size="sm">
                                      <ThumbsUp className="h-3 w-3 mr-1" /> {reply.likes}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
