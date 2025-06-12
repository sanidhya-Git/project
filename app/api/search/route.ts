import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import clientPromise from "@/lib/db"

interface ChapterResult {
  id: string
  moduleId: string
  moduleName: string
  title: string
  description: string
  hasQuiz: boolean
}

export async function GET(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ modules: [], chapters: [], quizzes: [] })
    }

    const client = await clientPromise
    const db = client.db("constitution_quest")

    // Search in modules collection
    const modules = await db
      .collection("modules")
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      })
      .project({
        id: 1,
        title: 1,
        description: 1,
        status: 1,
        chapters: { $size: "$chapters" },
      })
      .limit(10)
      .toArray()

    // Search in chapters (within modules)
    const modulesWithMatchingChapters = await db
      .collection("modules")
      .find({
        chapters: {
          $elemMatch: {
            $or: [
              { title: { $regex: query, $options: "i" } },
              { description: { $regex: query, $options: "i" } },
              { content: { $regex: query, $options: "i" } },
            ],
          },
        },
      })
      .toArray()

    const chapters: ChapterResult[] = []

    for (const module of modulesWithMatchingChapters) {
      const matchingChapters = module.chapters.filter(
        (chapter: any) =>
          chapter.title.match(new RegExp(query, "i")) ||
          chapter.description.match(new RegExp(query, "i")) ||
          (chapter.content && chapter.content.match(new RegExp(query, "i"))),
      )

      matchingChapters.forEach((chapter: any) => {
        chapters.push({
          id: chapter.id,
          moduleId: module.id,
          moduleName: module.title,
          title: chapter.title,
          description: chapter.description,
          hasQuiz: chapter.hasQuiz,
        })
      })
    }

    // Search in quizzes collection
    const quizzes = await db
      .collection("quizzes")
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { "questions.question": { $regex: query, $options: "i" } },
        ],
      })
      .project({
        id: 1,
        moduleId: 1,
        chapterId: 1,
        title: 1,
        description: 1,
        questions: { $size: "$questions" },
      })
      .limit(10)
      .toArray()

    // Add module names to quizzes
    const moduleIds = [...new Set(quizzes.map((quiz) => quiz.moduleId))]
    const moduleNames = await db
      .collection("modules")
      .find({ id: { $in: moduleIds } })
      .project({ id: 1, title: 1 })
      .toArray()
      .then((modules) =>
        Object.fromEntries(modules.map((m) => [m.id, m.title])),
      )

    const quizzesWithModuleNames = quizzes.map((quiz) => ({
      ...quiz,
      moduleName: moduleNames[quiz.moduleId] || "Unknown Module",
    }))

    return NextResponse.json({
      modules,
      chapters,
      quizzes: quizzesWithModuleNames,
    })
  } catch (error) {
    console.error("Search error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
