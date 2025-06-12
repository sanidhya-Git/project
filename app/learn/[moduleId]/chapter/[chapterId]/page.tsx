import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle } from "lucide-react"
import Link from "next/link"

export default async function ChapterPage({ params }: { params: { moduleId: string; chapterId: string } }) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const moduleId = Number.parseInt(params.moduleId)
  const chapterId = Number.parseInt(params.chapterId)

  // This would normally be fetched from your database
  const chapterContent = {
    title: "Right to Equality",
    content: `
      <h2>Article 14: Equality before law</h2>
      <p>The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.</p>
      
      <h3>Key Points:</h3>
      <ul>
        <li>Article 14 guarantees equality before law and equal protection of laws to all persons within the territory of India.</li>
        <li>It applies to all individuals - citizens and foreigners.</li>
        <li>It is a fundamental right that forms the foundation of democracy.</li>
      </ul>
      
      <h3>Reasonable Classification:</h3>
      <p>The principle of equality does not mean that all laws must be general in character or that the same laws should apply to all persons. The varying needs of different classes of persons often require separate treatment. The legislature can classify persons for legitimate purposes, provided:</p>
      <ol>
        <li>The classification is based on an intelligible differentia which distinguishes persons grouped together from others left out of the group.</li>
        <li>The differentia must have a rational relation to the object sought to be achieved by the law.</li>
      </ol>
      
      <h3>Important Supreme Court Judgments:</h3>
      <p><strong>E.P. Royappa v. State of Tamil Nadu (1974):</strong> The Supreme Court held that equality is a dynamic concept with many aspects and dimensions. It cannot be imprisoned within traditional and doctrinaire limits.</p>
      
      <p><strong>Maneka Gandhi v. Union of India (1978):</strong> The Court held that Article 14 strikes at arbitrariness in State action and ensures fairness and equality of treatment.</p>
      
      <h2>Article 15: Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth</h2>
      <p>The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them.</p>
      
      <h3>Key Provisions:</h3>
      <ul>
        <li>No citizen shall be subjected to any disability, liability, restriction or condition on grounds of religion, race, caste, sex, place of birth.</li>
        <li>No citizen shall be denied access to shops, public restaurants, hotels, places of public entertainment, or the use of wells, tanks, bathing ghats, roads and places of public resort maintained wholly or partly out of State funds or dedicated to the use of the general public.</li>
        <li>The State is empowered to make special provisions for women and children.</li>
        <li>The State can make special provisions for the advancement of socially and educationally backward classes, Scheduled Castes, and Scheduled Tribes.</li>
      </ul>
    `,
    hasQuiz: true,
    nextChapterId: 2,
    prevChapterId: null,
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link href={`/learn/${moduleId}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Module
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-orange-500" />
            <span className="font-medium">Chapter {chapterId}</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{chapterContent.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: chapterContent.content }}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            {chapterContent.prevChapterId ? (
              <Link href={`/learn/${moduleId}/chapter/${chapterContent.prevChapterId}`}>
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Previous Chapter
                </Button>
              </Link>
            ) : (
              <div></div>
            )}

            <div className="flex gap-2">
              {chapterContent.hasQuiz && (
                <Link href={`/learn/${moduleId}/quiz/${chapterId}`}>
                  <Button variant="secondary">Take Quiz</Button>
                </Link>
              )}

              {chapterContent.nextChapterId ? (
                <Link href={`/learn/${moduleId}/chapter/${chapterContent.nextChapterId}`}>
                  <Button>
                    Next Chapter <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Link href={`/learn/${moduleId}`}>
                  <Button>
                    Complete Module <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}
