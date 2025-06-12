import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard-layout";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
} from "lucide-react";

type PageProps = {
  params: {
    moduleId: string;
  };
};

export default async function ModulePage({ params }: PageProps) {
  const moduleId = parseInt(params.moduleId);

  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  // Mock modules data — replace with DB fetch later
  const modules = {
    1: {
      id: 1,
      title: "Introduction to the Indian Constitution",
      description: "Learn about the history and making of the Indian Constitution",
      progress: 100,
      chapters: [
        {
          id: 1,
          title: "Historical Background",
          description: "The events leading to the creation of the Indian Constitution",
          completed: true,
          hasQuiz: true,
          quizCompleted: true,
        },
        {
          id: 2,
          title: "Constituent Assembly",
          description: "Formation and functioning of the Constituent Assembly",
          completed: true,
          hasQuiz: true,
          quizCompleted: true,
        },
        {
          id: 3,
          title: "Drafting Committee",
          description: "Role of Dr. B.R. Ambedkar and the Drafting Committee",
          completed: true,
          hasQuiz: true,
          quizCompleted: true,
        },
        {
          id: 4,
          title: "Adoption of the Constitution",
          description: "The process of adoption and implementation",
          completed: true,
          hasQuiz: true,
          quizCompleted: true,
        },
        {
          id: 5,
          title: "Basic Structure",
          description: "Overview of the structure and key features",
          completed: true,
          hasQuiz: true,
          quizCompleted: true,
        },
      ],
    },
    2: {
      id: 2,
      title: "Fundamental Rights",
      description: "Explore the fundamental rights guaranteed by the Constitution",
      progress: 75,
      chapters: [
        {
          id: 1,
          title: "Right to Equality",
          description: "Articles 14-18 of the Indian Constitution",
          completed: true,
          hasQuiz: true,
          quizCompleted: true,
        },
        {
          id: 2,
          title: "Right to Freedom",
          description: "Articles 19-22 of the Indian Constitution",
          completed: true,
          hasQuiz: true,
          quizCompleted: true,
        },
        {
          id: 3,
          title: "Right against Exploitation",
          description: "Articles 23-24 of the Indian Constitution",
          completed: true,
          hasQuiz: true,
          quizCompleted: false,
        },
        {
          id: 4,
          title: "Right to Freedom of Religion",
          description: "Articles 25-28 of the Indian Constitution",
          completed: false,
          hasQuiz: true,
          quizCompleted: false,
        },
        {
          id: 5,
          title: "Cultural and Educational Rights",
          description: "Articles 29-30 of the Indian Constitution",
          completed: false,
          hasQuiz: true,
          quizCompleted: false,
        },
        {
          id: 6,
          title: "Right to Constitutional Remedies",
          description: "Article 32 of the Indian Constitution",
          completed: false,
          hasQuiz: true,
          quizCompleted: false,
        },
      ],
    },
  };

  const module = modules[moduleId as keyof typeof modules];

  if (!module) {
    redirect("/learn");
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/learn">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Modules
            </Button>
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">{module.title}</h1>
          <p className="text-gray-500 dark:text-gray-400">{module.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-orange-500" />
            <span className="font-medium">{module.chapters.length} Chapters</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{module.progress}% Complete</span>
            <Progress value={module.progress} className="w-40 h-2" />
          </div>
        </div>

        <div className="space-y-4">
          {module.chapters.map((chapter, index) => (
            <Card key={chapter.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>
                      Chapter {index + 1}: {chapter.title}
                    </CardTitle>
                    <CardDescription>{chapter.description}</CardDescription>
                  </div>
                  {chapter.completed && (
                    <Badge className="bg-green-500">
                      <CheckCircle className="h-3 w-3 mr-1" /> Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                  {chapter.hasQuiz && (
                    <Badge
                      variant={chapter.quizCompleted ? "outline" : "secondary"}
                      className={
                        chapter.quizCompleted
                          ? "border-green-500 text-green-500"
                          : ""
                      }
                    >
                      {chapter.quizCompleted ? "Quiz Passed" : "Has Quiz"}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link href={`/learn/${moduleId}/chapter/${chapter.id}`}>
                    <Button variant={chapter.completed ? "outline" : "default"}>
                      {chapter.completed ? "Review" : "Start"} Chapter
                    </Button>
                  </Link>
                  {chapter.hasQuiz && (
                    <Link href={`/learn/${moduleId}/quiz/${chapter.id}`}>
                      <Button variant="secondary">
                        {chapter.quizCompleted ? "Retake Quiz" : "Take Quiz"}
                      </Button>
                    </Link>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-between">
          <Link href="/learn">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" /> All Modules
            </Button>
          </Link>
          <Link
            href={
              moduleId < Object.keys(modules).length
                ? `/learn/${moduleId + 1}`
                : "/learn"
            }
          >
            <Button>
              {moduleId < Object.keys(modules).length
                ? "Next Module"
                : "Back to All Modules"}{" "}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
