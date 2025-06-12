"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import clientPromise from "./db"

// Complete a chapter
export async function completeChapter(moduleId: number, chapterId: number) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    const client = await clientPromise
    const db = client.db("constitution_quest")

    // Update user progress
    await db.collection("user_progress").updateOne(
      { userId },
      {
        $addToSet: { [`modules.${moduleId}.completedChapters`]: chapterId },
        $inc: { xp: 10 }, // Award XP for completing a chapter
      },
      { upsert: true },
    )

    // Check if all chapters in the module are completed
    const module = await db.collection("modules").findOne({ id: moduleId })
    const userProgress = await db.collection("user_progress").findOne({ userId })

    if (module && userProgress) {
      const completedChapters = userProgress.modules?.[moduleId]?.completedChapters || []
      const allChapters = module.chapters.map((chapter: any) => chapter.id)

      const allCompleted = allChapters.every((chapterId: number) => completedChapters.includes(chapterId))

      if (allCompleted) {
        // Award badge for completing the module
        await db.collection("user_progress").updateOne(
          { userId },
          {
            $addToSet: { badges: `module_${moduleId}_completed` },
            $inc: { xp: 50 }, // Bonus XP for completing the entire module
          },
        )
      }
    }

    revalidatePath(`/learn/${moduleId}`)
    revalidatePath(`/dashboard`)

    return { success: true }
  } catch (error) {
    console.error("Error completing chapter:", error)
    return { success: false, error: "Failed to update progress" }
  }
}

// Submit quiz results
export async function submitQuizResults(moduleId: number, chapterId: number, score: number, earnedXp: number) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    const client = await clientPromise
    const db = client.db("constitution_quest")

    // Update user progress
    await db.collection("user_progress").updateOne(
      { userId },
      {
        $addToSet: { [`modules.${moduleId}.completedQuizzes`]: chapterId },
        $inc: { xp: earnedXp },
      },
      { upsert: true },
    )

    // Record quiz attempt
    await db.collection("quiz_attempts").insertOne({
      userId,
      moduleId,
      chapterId,
      score,
      earnedXp,
      timestamp: new Date(),
    })

    // Check if score is perfect (100%) to award a badge
    if (score === 100) {
      await db.collection("user_progress").updateOne(
        { userId },
        {
          $addToSet: { badges: `perfect_score_quiz_${moduleId}_${chapterId}` },
        },
      )
    }

    revalidatePath(`/learn/${moduleId}`)
    revalidatePath(`/dashboard`)

    return { success: true }
  } catch (error) {
    console.error("Error submitting quiz results:", error)
    return { success: false, error: "Failed to submit quiz results" }
  }
}
