import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import clientPromise from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const sort = searchParams.get("sort") || "recent"
    const tag = searchParams.get("tag")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const client = await clientPromise
    const db = client.db("constitution_quest")

    // Build query
    const query: any = {}
    if (tag) {
      query.tags = tag
    }

    // Build sort options
    const sortOptions: any = {}
    if (sort === "recent") {
      sortOptions.createdAt = -1
    } else if (sort === "popular") {
      sortOptions.likes = -1
    } else if (sort === "unanswered") {
      query.comments = 0
      sortOptions.createdAt = -1
    }

    // Get discussions
    const discussions = await db
      .collection("discussions")
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .toArray()

    // Get total count for pagination
    const total = await db.collection("discussions").countDocuments(query)

    // Get popular tags
    const popularTags = await db
      .collection("discussions")
      .aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        {
          $project: {
            _id: 0,
            name: "$_id",
            count: 1,
            slug: {
              $toLower: {
                $replaceAll: { input: "$_id", find: " ", replacement: "-" },
              },
            },
          },
        },
      ])
      .toArray()

    return NextResponse.json({
      discussions,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      popularTags,
    })
  } catch (error) {
    console.error("Error fetching discussions:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { title, content, tags } = body

    if (!title || !content) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("constitution_quest")

    // Get user info
    const user = await db.collection("users").findOne({ clerkId: userId })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    // Create discussion
    const now = new Date()
    const discussionId = `${Date.now()}`

    const discussion = {
      id: discussionId,
      title,
      content,
      authorId: userId,
      authorName: user.name,
      createdAt: now,
      updatedAt: now,
      likes: 0,
      comments: 0,
      tags: tags || [],
    }

    await db.collection("discussions").insertOne(discussion)

    // Check if user has the discussion_starter badge
    const userProgress = await db.collection("user_progress").findOne({ userId })

    if (userProgress && !userProgress.badges?.includes("discussion_starter")) {
      // Award the badge
      await db.collection("user_progress").updateOne(
        { userId },
        {
          $addToSet: { badges: "discussion_starter" },
          $inc: { xp: 50 }, // Award XP for the badge
        },
      )
    }

    return NextResponse.json({ success: true, discussion })
  } catch (error) {
    console.error("Error creating discussion:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
