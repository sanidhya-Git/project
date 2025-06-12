import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white dark:bg-gray-950 shadow-md",
            headerTitle: "text-orange-500",
            headerSubtitle: "text-gray-500 dark:text-gray-400",
            formButtonPrimary: "bg-orange-500 hover:bg-orange-600",
            footerActionLink: "text-orange-500 hover:text-orange-600",
          },
        }}
      />
    </div>
  )
}
