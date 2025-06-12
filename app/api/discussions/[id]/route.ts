import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import clientPromise from "@/lib/db"

interface Comment {
  id: string
  discussionId: string
  parentId: string | null
  content: string
  authorId: string
  createdAt: Date
}

interface User {
  clerkId: string
  name: string
  avatar?: string
  isExpert?: boolean
}

interface Discussion {
  id: string
  title: string
  content: string
  authorId: string
  createdAt: Date
}

interface CommentWithAuthor extends Comment {
  author: {
    name: string
    avatar: string | null
    isExpert: boolean
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const discussionId = params.id
    const client = await clientPromise
    const db = client.db("constitution_quest")

    const discussion = await db
      .collection<Discussion>("discussions")
      .findOne({ id: discussionId })

    if (!discussion) {
      return new NextResponse("Discussion not found", { status: 404 })
    }

    const comments = await db
      .collection<Comment>("comments")
      .find({ discussionId })
      .sort({ createdAt: 1 })
      .toArray()

    const userIds = [...new Set(comments.map((c) => c.authorId))]
    const usersArray = await db
      .collection<User>("users")
      .find({ clerkId: { $in: userIds } })
      .toArray()

    const users = Object.fromEntries(usersArray.map((u) => [u.clerkId, u]))

    const formattedComments: CommentWithAuthor[] = comments.map((comment) => ({
      ...comment,
      author: {
        name: users[comment.authorId]?.name || "Unknown User",
        avatar: users[comment.authorId]?.avatar || null,
        isExpert: users[comment.authorId]?.isExpert || false,
      },
    }))

    const commentTree = formattedComments
      .filter((c) => !c.parentId)
      .map((c) => ({
        ...c,
        replies: formattedComments.filter((r) => r.parentId === c.id),
      }))

    const author = await db
      .collection<User>("users")
      .findOne({ clerkId: discussion.authorId })

    return NextResponse.json({
      ...discussion,
      author: {
        name: author?.name || "Unknown User",
        avatar: author?.avatar || null,
        isExpert: author?.isExpert || false,
      },
      commentsList: commentTree,
    })
  } catch (error) {
    console.error("Error fetching discussion:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const discussionId = params.id
    const body = await request.json()
    const { content, parentId } = body

    if (!content) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("constitution_quest")

    const discussion = await db
      .collection<Discussion>("discussions")
      .findOne({ id: discussionId })

    if (!discussion) {
      return new NextResponse("Discussion not found", { status: 404 })
    }

    const user = await db
      .collection<User>("users")
      .findOne({ clerkId: userId })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const now = new Date()
    const commentId = `${Date.now()}`

    const comment: Comment = {
      id: commentId,
      discussionId,
      parentId: parentId || null,
      content,
      authorId: userId,
      createdAt: now,
    }

    await db.collection("comments").insertOne(comment)

    return NextResponse.json(
      { message: "Comment created successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating comment:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
