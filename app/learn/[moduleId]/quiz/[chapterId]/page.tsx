"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function QuizPage({ params }: { params: { moduleId: string; chapterId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [earnedXp, setEarnedXp] = useState(0)

  // Mock quiz data - would normally be fetched from API
  const quiz = {
    title: "Fundamental Rights - Right to Equality Quiz",
    description: "Test your knowledge about Articles 14-18 of the Indian Constitution",
    timeLimit: 300, // 5 minutes in seconds
    questions: [
      {
        id: 1,
        question: "Which article of the Indian Constitution guarantees equality before law?",
        options: [
          { id: "a", text: "Article 14" },
          { id: "b", text: "Article 15" },
          { id: "c", text: "Article 16" },
          { id: "d", text: "Article 17" },
        ],
        correctAnswer: "a",
      },
      {
        id: 2,
        question: "Article 15 of the Indian Constitution prohibits discrimination on grounds of:",
        options: [
          { id: "a", text: "Only religion and caste" },
          { id: "b", text: "Only sex and place of birth" },
          { id: "c", text: "Religion, race, caste, sex, and place of birth" },
          { id: "d", text: "Only race and religion" },
        ],
        correctAnswer: "c",
      },
      {
        id: 3,
        question: "Which article abolishes untouchability?",
        options: [
          { id: "a", text: "Article 14" },
          { id: "b", text: "Article 15" },
          { id: "c", text: "Article 16" },
          { id: "d", text: "Article 17" },
        ],
        correctAnswer: "d",
      },
      {
        id: 4,
        question: "Article 16 of the Constitution deals with:",
        options: [
          { id: "a", text: "Equality before law" },
          { id: "b", text: "Prohibition of discrimination" },
          { id: "c", text: "Equality of opportunity in public employment" },
          { id: "d", text: "Abolition of titles" },
        ],
        correctAnswer: "c",
      },
      {
        id: 5,
        question: "Which of the following is NOT a ground of prohibition of discrimination under Article 15?",
        options: [
          { id: "a", text: "Religion" },
          { id: "b", text: "Race" },
          { id: "c", text: "Economic status" },
          { id: "d", text: "Sex" },
        ],
        correctAnswer: "c",
      },
    ],
  }

  // Timer effect
  useEffect(() => {
    if (quizSubmitted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizSubmitted])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerId: string) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerId
    setSelectedAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitQuiz = () => {
    // Calculate score
    let correctAnswers = 0
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100)
    setScore(finalScore)

    // Calculate XP earned (base 50 XP for completion, bonus for correct answers)
    const xpEarned = 50 + correctAnswers * 10
    setEarnedXp(xpEarned)

    setQuizSubmitted(true)

    toast({
      title: "Quiz Submitted!",
      description: `You scored ${finalScore}% and earned ${xpEarned} XP!`,
    })
  }

  const isAnswerCorrect = (questionIndex: number, optionId: string) => {
    return quiz.questions[questionIndex].correctAnswer === optionId
  }

  const handleFinish = () => {
    router.push(`/learn/${params.moduleId}`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link href={`/learn/${params.moduleId}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Module
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className={`font-medium ${timeLeft < 60 ? "text-red-500" : ""}`}>
              Time Remaining: {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </div>
              <Badge variant="outline">
                {currentQuestion + 1} of {quiz.questions.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {!quizSubmitted ? (
              <div className="space-y-6">
                <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} className="h-2 mb-6" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Question {currentQuestion + 1}: {quiz.questions[currentQuestion].question}
                  </h3>

                  <RadioGroup
                    value={selectedAnswers[currentQuestion] || ""}
                    onValueChange={handleAnswerSelect}
                    className="space-y-3"
                  >
                    {quiz.questions[currentQuestion].options.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={() => handleAnswerSelect(option.id)}
                      >
                        <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                        <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                    {score >= 70 ? (
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                      <AlertCircle className="h-8 w-8 text-orange-500" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    You scored {score}% ({Math.round((score / 100) * quiz.questions.length)}/{quiz.questions.length}{" "}
                    correct)
                  </p>
                  <div className="mt-4 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg inline-block">
                    <p className="text-orange-600 dark:text-orange-400 font-medium">+{earnedXp} XP Earned</p>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <h4 className="font-medium">Review Your Answers:</h4>
                  {quiz.questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        {selectedAnswers[index] === question.correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium">{question.question}</p>
                          <div className="mt-2 space-y-1">
                            {question.options.map((option) => (
                              <div
                                key={option.id}
                                className={`text-sm p-2 rounded ${
                                  option.id === question.correctAnswer
                                    ? "bg-green-100 dark:bg-green-900/20"
                                    : selectedAnswers[index] === option.id
                                      ? "bg-red-100 dark:bg-red-900/20"
                                      : ""
                                }`}
                              >
                                {option.text}
                                {option.id === question.correctAnswer && (
                                  <span className="ml-2 text-green-600 dark:text-green-400">(Correct Answer)</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {!quizSubmitted ? (
              <>
                <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
                  Previous
                </Button>
                <div>
                  {currentQuestion === quiz.questions.length - 1 ? (
                    <Button
                      onClick={handleSubmitQuiz}
                      disabled={selectedAnswers.filter(Boolean).length !== quiz.questions.length}
                    >
                      Submit Quiz
                    </Button>
                  ) : (
                    <Button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestion]}>
                      Next Question
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <div className="w-full flex justify-center">
                <Button onClick={handleFinish}>Return to Module</Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}
