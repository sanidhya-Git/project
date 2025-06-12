"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BookOpen, BarChart2, Award, Users, Settings, Menu, Home, HelpCircle, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const isAdmin = pathname?.startsWith("/admin")

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      active: pathname === "/dashboard",
    },
    {
      href: "/learn",
      label: "Learn",
      icon: <BookOpen className="h-5 w-5" />,
      active: pathname === "/learn" || pathname?.startsWith("/learn/"),
    },
    {
      href: "/quizzes",
      label: "Quizzes",
      icon: <HelpCircle className="h-5 w-5" />,
      active: pathname === "/quizzes" || pathname?.startsWith("/quizzes/"),
    },
    {
      href: "/leaderboard",
      label: "Leaderboard",
      icon: <BarChart2 className="h-5 w-5" />,
      active: pathname === "/leaderboard",
    },
    {
      href: "/badges",
      label: "Badges",
      icon: <Award className="h-5 w-5" />,
      active: pathname === "/badges",
    },
  ]

  const adminRoutes = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      active: pathname === "/admin",
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: <Users className="h-5 w-5" />,
      active: pathname === "/admin/users",
    },
    {
      href: "/admin/modules",
      label: "Modules",
      icon: <BookOpen className="h-5 w-5" />,
      active: pathname === "/admin/modules" || pathname?.startsWith("/admin/modules/"),
    },
    {
      href: "/admin/quizzes",
      label: "Quizzes",
      icon: <HelpCircle className="h-5 w-5" />,
      active: pathname === "/admin/quizzes" || pathname?.startsWith("/admin/quizzes/"),
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      active: pathname === "/admin/settings",
    },
  ]

  const activeRoutes = isAdmin ? adminRoutes : routes

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-white dark:bg-gray-950 dark:border-gray-800">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">ConstitutionQuest</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {activeRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                route.active
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  : "text-gray-500 dark:text-gray-400",
              )}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 mt-auto border-t dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserButton afterSignOutUrl="/" />
              <div className="text-sm">
                <p className="font-medium">Student</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Level 5</p>
              </div>
            </div>
            {isAdmin && (
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Exit Admin</span>
                </Button>
              </Link>
            )}
            {!isAdmin && (
              <Link href="/admin">
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Admin</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between h-14 px-4 border-b bg-white dark:bg-gray-950 dark:border-gray-800">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileNavOpen(false)}>
                <BookOpen className="h-6 w-6 text-orange-500" />
                <span className="text-xl font-bold">ConstitutionQuest</span>
              </Link>
            </div>
            <nav className="flex-1 px-4 space-y-1">
              {activeRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                    route.active
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                      : "text-gray-500 dark:text-gray-400",
                  )}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {route.icon}
                  {route.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 mt-auto border-t dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserButton afterSignOutUrl="/" />
                  <div className="text-sm">
                    <p className="font-medium">Student</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Level 5</p>
                  </div>
                </div>
                {isAdmin && (
                  <Link href="/dashboard" onClick={() => setIsMobileNavOpen(false)}>
                    <Button variant="ghost" size="icon">
                      <LogOut className="h-4 w-4" />
                      <span className="sr-only">Exit Admin</span>
                    </Button>
                  </Link>
                )}
                {!isAdmin && (
                  <Link href="/admin" onClick={() => setIsMobileNavOpen(false)}>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">Admin</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-orange-500" />
          <span className="font-bold">ConstitutionQuest</span>
        </Link>

        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Main content */}
      <main className="flex-1 md:p-8 p-4 pt-16 md:pt-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  )
}
