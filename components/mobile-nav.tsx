"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Menu,
  BookOpen,
  BarChart2,
  Award,
  Users,
  Settings,
  Home,
  HelpCircle,
  Search,
  MessageCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

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
    {
      href: "/community",
      label: "Community",
      icon: <MessageCircle className="h-5 w-5" />,
      active: pathname === "/community" || pathname?.startsWith("/community/"),
    },
    {
      href: "/search",
      label: "Search",
      icon: <Search className="h-5 w-5" />,
      active: pathname === "/search",
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <Users className="h-5 w-5" />,
      active: pathname === "/profile",
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
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
              onClick={() => setIsOpen(false)}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
