import clientPromise from "./db"
import { cache } from "react"

// Get user profile data
export const getUserProfile = cache(async (userId: string) => {
  try {
    // This would normally fetch data from MongoDB
    // For demo purposes, we're returning mock data
    return {
      id: userId,
      name: "Student",
      email: "student@example.com",
      avatarUrl: "",
      level: 5,
      totalXp: 1250,
      currentLevelXp: 250,
      nextLevelXp: 500,
      levelProgress: 50,
      weeklyRank: 23,
      weeklyPercentile: 15,
      allTimeRank: 45,
      allTimePercentile: 25,
      badges: [
        {
          id: 1,
          name: "First Quiz",
          description: "Completed your first quiz",
          icon: "Award",
          earnedAt: "2023-05-20",
        },
        {
          id: 2,
          name: "Knowledge Seeker",
          description: "Read 5 chapters",
          icon: "BookOpen",
          earnedAt: "2023-06-05",
        },
        {
          id: 3,
          name: "Perfect Score",
          description: "Got 100% on a quiz",
          icon: "Trophy",
          earnedAt: "2023-06-15",
        },
        {
          id: 4,
          name: "Constitution Novice",
          description: "Completed your first module",
          icon: "CheckCircle",
          earnedAt: "2023-07-01",
        },
      ],
      recentActivity: [
        {
          id: 1,
          type: "quiz",
          title: "Fundamental Rights Quiz",
          score: "8/10",
          xp: 30,
          date: "2 days ago",
        },
        {
          id: 2,
          type: "chapter",
          title: "Directive Principles",
          xp: 10,
          date: "3 days ago",
        },
        {
          id: 3,
          type: "badge",
          title: "Constitution Expert",
          xp: 50,
          date: "1 week ago",
        },
        {
          id: 4,
          type: "level",
          title: "Reached Level 5",
          xp: 100,
          date: "2 weeks ago",
        },
      ],
      completedModules: 1,
      totalModules: 6,
      completedChapters: 12,
      totalChapters: 34,
      passedQuizzes: 8,
      totalQuizzes: 15,
      averageScore: 78,
      perfectScores: 2,
      totalQuizAttempts: 10,
      moduleProgress: [
        {
          id: 1,
          title: "Introduction to the Indian Constitution",
          completedChapters: 5,
          totalChapters: 5,
          progress: 100,
          completed: true,
        },
        {
          id: 2,
          title: "Fundamental Rights",
          completedChapters: 4,
          totalChapters: 6,
          progress: 67,
          completed: false,
        },
        {
          id: 3,
          title: "Directive Principles of State Policy",
          completedChapters: 2,
          totalChapters: 4,
          progress: 50,
          completed: false,
        },
        {
          id: 4,
          title: "Fundamental Duties",
          completedChapters: 1,
          totalChapters: 3,
          progress: 33,
          completed: false,
        },
      ],
    }
  } catch (error) {
    console.error("Error fetching user profile:", error)
    throw new Error("Failed to fetch user profile")
  }
})

// Search content across the platform
export const searchContent = cache(async (query: string) => {
  try {
    // This would normally search in MongoDB
    // For demo purposes, we're returning mock data based on the query
    const lowercaseQuery = query.toLowerCase()

    // Mock data for modules
    const allModules = [
      {
        id: 1,
        title: "Introduction to the Indian Constitution",
        description: "Learn about the history and making of the Indian Constitution",
        chapters: 5,
        status: "published",
      },
      {
        id: 2,
        title: "Fundamental Rights",
        description: "Explore the fundamental rights guaranteed by the Constitution",
        chapters: 6,
        status: "published",
      },
      {
        id: 3,
        title: "Directive Principles of State Policy",
        description: "Understand the guiding principles for governance",
        chapters: 4,
        status: "published",
      },
      {
        id: 4,
        title: "Fundamental Duties",
        description: "Learn about the duties of citizens as per the Constitution",
        chapters: 3,
        status: "published",
      },
      {
        id: 5,
        title: "Constitutional Amendments",
        description: "Study the major amendments to the Constitution",
        chapters: 8,
        status: "draft",
      },
    ]

    // Mock data for chapters
    const allChapters = [
      {
        id: 1,
        moduleId: 1,
        moduleName: "Introduction to the Indian Constitution",
        title: "Historical Background",
        description: "The events leading to the creation of the Indian Constitution",
        hasQuiz: true,
      },
      {
        id: 2,
        moduleId: 1,
        moduleName: "Introduction to the Indian Constitution",
        title: "Constituent Assembly",
        description: "Formation and functioning of the Constituent Assembly",
        hasQuiz: true,
      },
      {
        id: 1,
        moduleId: 2,
        moduleName: "Fundamental Rights",
        title: "Right to Equality",
        description: "Articles 14-18 of the Indian Constitution",
        hasQuiz: true,
      },
      {
        id: 2,
        moduleId: 2,
        moduleName: "Fundamental Rights",
        title: "Right to Freedom",
        description: "Articles 19-22 of the Indian Constitution",
        hasQuiz: true,
      },
      {
        id: 1,
        moduleId: 3,
        moduleName: "Directive Principles of State Policy",
        title: "Economic Principles",
        description: "Economic principles in the directive principles",
        hasQuiz: true,
      },
    ]

    // Mock data for quizzes
    const allQuizzes = [
      {
        id: 1,
        moduleId: 1,
        chapterId: 1,
        moduleName: "Introduction to the Indian Constitution",
        title: "Historical Background Quiz",
        description: "Test your knowledge about the history of the Indian Constitution",
        questions: 10,
      },
      {
        id: 2,
        moduleId: 1,
        chapterId: 2,
        moduleName: "Introduction to the Indian Constitution",
        title: "Constituent Assembly Quiz",
        description: "Test your knowledge about the Constituent Assembly",
        questions: 8,
      },
      {
        id: 3,
        moduleId: 2,
        chapterId: 1,
        moduleName: "Fundamental Rights",
        title: "Right to Equality Quiz",
        description: "Test your knowledge about Articles 14-18",
        questions: 10,
      },
      {
        id: 4,
        moduleId: 2,
        chapterId: 2,
        moduleName: "Fundamental Rights",
        title: "Right to Freedom Quiz",
        description: "Test your knowledge about Articles 19-22",
        questions: 12,
      },
    ]

    // Filter based on query
    const modules = allModules.filter(
      (module) =>
        module.title.toLowerCase().includes(lowercaseQuery) ||
        module.description.toLowerCase().includes(lowercaseQuery),
    )

    const chapters = allChapters.filter(
      (chapter) =>
        chapter.title.toLowerCase().includes(lowercaseQuery) ||
        chapter.description.toLowerCase().includes(lowercaseQuery) ||
        chapter.moduleName.toLowerCase().includes(lowercaseQuery),
    )

    const quizzes = allQuizzes.filter(
      (quiz) =>
        quiz.title.toLowerCase().includes(lowercaseQuery) ||
        quiz.description.toLowerCase().includes(lowercaseQuery) ||
        quiz.moduleName.toLowerCase().includes(lowercaseQuery),
    )

    return { modules, chapters, quizzes }
  } catch (error) {
    console.error("Error searching content:", error)
    throw new Error("Failed to search content")
  }
})

// Get discussions for community page
export const getDiscussions = cache(async () => {
  try {
    // This would normally fetch data from MongoDB
    // For demo purposes, we're returning mock data
    const discussions = [
      {
        id: "1",
        title: "Understanding Article 21: Right to Life and Personal Liberty",
        content:
          "I've been studying Article 21 of the Indian Constitution, which guarantees the right to life and personal liberty. The Supreme Court has expanded its scope over the years. What are some landmark judgments that have shaped our understanding of this fundamental right?",
        author: {
          name: "Arjun Sharma",
          avatar: "/placeholder.svg",
        },
        createdAt: "2 days ago",
        likes: 24,
        comments: 8,
        tags: ["Fundamental Rights", "Article 21", "Supreme Court"],
      },
      {
        id: "2",
        title: "Difference between Fundamental Rights and Directive Principles",
        content:
          "I'm confused about the difference between Fundamental Rights and Directive Principles of State Policy. Can someone explain the key differences and their enforceability? Are there any instances where they overlap or conflict with each other?",
        author: {
          name: "Priya Patel",
          avatar: "/placeholder.svg",
        },
        createdAt: "3 days ago",
        likes: 18,
        comments: 12,
        tags: ["Fundamental Rights", "Directive Principles", "Comparison"],
      },
      {
        id: "3",
        title: "Evolution of the Preamble: Original vs. Current Version",
        content:
          "The Preamble to the Indian Constitution was amended during the Emergency period. What were the changes made, and how did they impact the interpretation of the Constitution? Also, is the Preamble considered a part of the Constitution according to the Supreme Court?",
        author: {
          name: "Rahul Verma",
          avatar: "/placeholder.svg",
        },
        createdAt: "5 days ago",
        likes: 32,
        comments: 15,
        tags: ["Preamble", "Constitutional Amendments", "Emergency"],
      },
      {
        id: "4",
        title: "Federalism in the Indian Constitution: Unitary or Federal?",
        content:
          "India is often described as a 'quasi-federal' state. What features of the Indian Constitution make it more unitary than federal? How does this compare to federalism in other countries like the United States?",
        author: {
          name: "Ananya Singh",
          avatar: "/placeholder.svg",
        },
        createdAt: "1 week ago",
        likes: 27,
        comments: 9,
        tags: ["Federalism", "Governance", "Comparative Study"],
      },
    ]

    const popularTags = [
      { name: "Fundamental Rights", count: 42, slug: "fundamental-rights" },
      { name: "Directive Principles", count: 28, slug: "directive-principles" },
      { name: "Supreme Court", count: 24, slug: "supreme-court" },
      { name: "Constitutional Amendments", count: 19, slug: "constitutional-amendments" },
      { name: "Federalism", count: 17, slug: "federalism" },
      { name: "Preamble", count: 15, slug: "preamble" },
      { name: "Article 21", count: 14, slug: "article-21" },
      { name: "Emergency Provisions", count: 12, slug: "emergency-provisions" },
      { name: "Governance", count: 10, slug: "governance" },
      { name: "Comparative Study", count: 8, slug: "comparative-study" },
    ]

    return { discussions, popularTags }
  } catch (error) {
    console.error("Error fetching discussions:", error)
    throw new Error("Failed to fetch discussions")
  }
})

// Get a specific discussion by ID
export const getDiscussionById = cache(async (id: string) => {
  try {
    // This would normally fetch data from MongoDB
    // For demo purposes, we're returning mock data
    const discussions = {
      "1": {
        id: "1",
        title: "Understanding Article 21: Right to Life and Personal Liberty",
        content:
          "I've been studying Article 21 of the Indian Constitution, which guarantees the right to life and personal liberty. The Supreme Court has expanded its scope over the years through various landmark judgments.\n\nFor instance, in Maneka Gandhi v. Union of India (1978), the Court held that the right to life includes the right to live with human dignity. In Olga Tellis v. Bombay Municipal Corporation (1985), it was extended to include the right to livelihood.\n\nI'm particularly interested in understanding how the interpretation of Article 21 has evolved over time and what new rights have been recognized under its ambit. Could anyone share insights on recent judgments that have further expanded this right?\n\nAlso, how does Article 21 compare with similar provisions in constitutions of other democratic countries?",
        author: {
          name: "Arjun Sharma",
          avatar: "/placeholder.svg",
        },
        createdAt: "2 days ago",
        updatedAt: "1 day ago",
        likes: 24,
        comments: 3,
        tags: ["Fundamental Rights", "Article 21", "Supreme Court"],
        commentsList: [
          {
            id: "1",
            content:
              "Great question! Article 21 has indeed undergone significant expansion through judicial interpretation. In addition to the cases you mentioned, K.S. Puttaswamy v. Union of India (2017) recognized the right to privacy as a fundamental right under Article 21. This judgment has had far-reaching implications for data protection and personal autonomy in India.",
            author: {
              name: "Dr. Meera Sharma",
              avatar: "/placeholder.svg",
              isExpert: true,
            },
            createdAt: "1 day ago",
            likes: 12,
            replies: [
              {
                id: "1.1",
                content:
                  "That's a great point about the Puttaswamy judgment! It's fascinating how a single article has been interpreted to include so many rights that weren't explicitly mentioned in the original text.",
                author: {
                  name: "Arjun Sharma",
                  avatar: "/placeholder.svg",
                  isExpert: false,
                },
                createdAt: "1 day ago",
                likes: 5,
              },
              {
                id: "1.2",
                content:
                  "The Puttaswamy judgment also laid down a proportionality test for privacy infringements, which has become crucial for evaluating government actions that potentially violate fundamental rights.",
                author: {
                  name: "Vikram Singh",
                  avatar: "/placeholder.svg",
                  isExpert: true,
                },
                createdAt: "20 hours ago",
                likes: 7,
              },
            ],
          },
          {
            id: "2",
            content:
              "Regarding your question about comparison with other countries, Article 21 is somewhat similar to the Due Process Clause in the US Constitution's 14th Amendment. However, the Indian Supreme Court has been more expansive in reading socio-economic rights into Article 21, whereas the US Supreme Court has generally been more restrained.",
            author: {
              name: "Rahul Verma",
              avatar: "/placeholder.svg",
              isExpert: false,
            },
            createdAt: "1 day ago",
            likes: 8,
            replies: [],
          },
          {
            id: "3",
            content:
              "Another important case is Vishaka v. State of Rajasthan (1997), where the Supreme Court recognized sexual harassment at the workplace as a violation of Article 21. This led to the formulation of the Vishaka Guidelines, which were later codified into the Sexual Harassment of Women at Workplace Act, 2013. It's a great example of how judicial interpretation of Article 21 has led to concrete legislative changes.",
            author: {
              name: "Priya Patel",
              avatar: "/placeholder.svg",
              isExpert: false,
            },
            createdAt: "12 hours ago",
            likes: 10,
            replies: [],
          },
        ],
      },
    }

    return discussions[id as keyof typeof discussions] || null
  } catch (error) {
    console.error("Error fetching discussion:", error)
    throw new Error("Failed to fetch discussion")
  }
})

// Initialize database with sample data
export async function initializeDatabase() {
  try {
    const client = await clientPromise
    const db = client.db("constitution_quest")

    // Check if collections exist
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map((c) => c.name)

    // Create modules collection if it doesn't exist
    if (!collectionNames.includes("modules")) {
      await db.createCollection("modules")

      // Insert sample modules
      await db.collection("modules").insertMany([
        {
          id: 1,
          title: "Introduction to the Indian Constitution",
          description: "Learn about the history and making of the Indian Constitution",
          chapters: [
            {
              id: 1,
              title: "Historical Background",
              description: "The events leading to the creation of the Indian Constitution",
              content: "...",
              hasQuiz: true,
            },
            {
              id: 2,
              title: "Constituent Assembly",
              description: "Formation and functioning of the Constituent Assembly",
              content: "...",
              hasQuiz: true,
            },
            // More chapters...
          ],
          status: "published",
        },
        {
          id: 2,
          title: "Fundamental Rights",
          description: "Explore the fundamental rights guaranteed by the Constitution",
          chapters: [
            {
              id: 1,
              title: "Right to Equality",
              description: "Articles 14-18 of the Indian Constitution",
              content: "...",
              hasQuiz: true,
            },
            // More chapters...
          ],
          status: "published",
        },
        // More modules...
      ])
    }

    // Create quizzes collection if it doesn't exist
    if (!collectionNames.includes("quizzes")) {
      await db.createCollection("quizzes")

      // Insert sample quizzes
      await db.collection("quizzes").insertMany([
        {
          id: 1,
          moduleId: 1,
          chapterId: 1,
          title: "Historical Background Quiz",
          description: "Test your knowledge about the history of the Indian Constitution",
          questions: [
            {
              id: 1,
              question: "When was the Constituent Assembly formed?",
              options: [
                { id: "a", text: "1945" },
                { id: "b", text: "1946" },
                { id: "c", text: "1947" },
                { id: "d", text: "1948" },
              ],
              correctAnswer: "b",
            },
            // More questions...
          ],
        },
        // More quizzes...
      ])
    }

    // Create user_progress collection if it doesn't exist
    if (!collectionNames.includes("user_progress")) {
      await db.createCollection("user_progress")

      // Sample user progress will be created when users interact with the platform
    }

    // Create discussions collection if it doesn't exist
    if (!collectionNames.includes("discussions")) {
      await db.createCollection("discussions")

      // Insert sample discussions
      await db.collection("discussions").insertMany([
        {
          id: "1",
          title: "Understanding Article 21: Right to Life and Personal Liberty",
          content: "...",
          authorId: "user_1",
          createdAt: new Date(),
          updatedAt: new Date(),
          likes: 24,
          comments: 8,
          tags: ["Fundamental Rights", "Article 21", "Supreme Court"],
        },
        // More discussions...
      ])
    }

    console.log("Database initialized successfully")
    return { success: true }
  } catch (error) {
    console.error("Error initializing database:", error)
    return { success: false, error: "Failed to initialize database" }
  }
}
