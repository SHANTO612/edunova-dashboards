import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "@/contexts/ThemeContext"
import { Moon, Sun, Users, BarChart3, Zap, Shield, ArrowRight, GraduationCap, LogIn } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const ConnectivityAnimation = () => {
  const roles = [
    { name: "Teacher", color: "hsl(var(--primary))", angle: 0 },
    { name: "Student", color: "hsl(var(--chart-5))", angle: 120 },
    { name: "Marketer", color: "hsl(var(--accent))", angle: 240 },
  ]

  const radius = 85
  const centerX = 120
  const centerY = 120

  return (
    <motion.div
      className="relative w-64 h-64"
      animate={{ rotate: 360 }}
      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
    >
      <svg className="absolute inset-0" viewBox="0 0 240 240">
        {/* Animated connecting lines */}
        {roles.map((role, idx) => {
          const nextRole = roles[(idx + 1) % roles.length]
          const x1 = centerX + radius * Math.cos((role.angle * Math.PI) / 180)
          const y1 = centerY + radius * Math.sin((role.angle * Math.PI) / 180)
          const x2 = centerX + radius * Math.cos((nextRole.angle * Math.PI) / 180)
          const y2 = centerY + radius * Math.sin((nextRole.angle * Math.PI) / 180)

          return (
            <motion.line
              key={`line-${idx}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={role.color}
              strokeWidth="2"
              opacity="0.3"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, delay: idx * 0.3, repeat: Number.POSITIVE_INFINITY }}
            />
          )
        })}

        {/* Center pulse */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="10"
          fill="hsl(var(--primary))"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="10"
          fill="hsl(var(--primary))"
          opacity="0.3"
          animate={{ scale: [1, 2.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </svg>

      {/* Animated role nodes */}
      {roles.map((role) => {
        const x = centerX + radius * Math.cos((role.angle * Math.PI) / 180)
        const y = centerY + radius * Math.sin((role.angle * Math.PI) / 180)

        return (
          <motion.div
            key={role.name}
            className="absolute w-14 h-14 rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold"
            style={{
              left: x - 28,
              top: y - 28,
              backgroundColor: role.color,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            {role.name.slice(0, 1)}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [engagementParticles, setEngagementParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    setMounted(true)

    // Generate floating engagement animation particles
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    }))
    setEngagementParticles(particles)
  }, [])

  const features = [
    {
      icon: GraduationCap,
      title: "Student Engagement",
      description: "Interactive assignments with real-time feedback and gamified learning experiences",
      color: "from-primary/20 to-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Users,
      title: "Live Collaboration",
      description: "Connect students and teachers in real-time for instant feedback and support",
      color: "from-chart-5/20 to-chart-5/10",
      iconColor: "text-chart-5",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track engagement metrics, performance trends, and student progress",
      color: "from-accent/20 to-accent/10",
      iconColor: "text-accent",
    },
    {
      icon: Zap,
      title: "AI-Powered Content",
      description: "Automatic content generation and intelligent course recommendations",
      color: "from-success/20 to-success/10",
      iconColor: "text-success",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security with encrypted communications",
      color: "from-primary/20 to-chart-5/20",
      iconColor: "text-primary",
    },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-lg bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-chart-5 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">SynapseX</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-border hover:bg-secondary"
            >
              <Link to="/login" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </Button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Engagement Animation */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 py-12 sm:py-20">
        <div className="absolute top-10 right-4 sm:top-20 sm:right-12 pointer-events-none opacity-50 sm:opacity-100">
          <ConnectivityAnimation />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 sm:mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-chart-5/10 border border-primary/20">
            <p className="text-sm font-medium bg-gradient-to-r from-primary to-chart-5 bg-clip-text text-transparent">
              ✨ AI-powered platform for effortless interactive learning
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-foreground via-primary to-chart-5 bg-clip-text text-transparent">
            Upload one video → Get notes, quizzes, flashcards, and courses
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            AI edits, summarizes, and builds interactive modules so teachers save time, students learn smarter, and institutes scale faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-chart-5 hover:opacity-90 text-primary-foreground border-0 transition-opacity"
            >
              <Link to="/login">
                Start Now <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Book Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 px-4">
            <div className="p-4 sm:p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur">
              <p className="text-2xl sm:text-3xl font-bold text-primary">50K+</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Active Students</p>
            </div>
            <div className="p-4 sm:p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur">
              <p className="text-2xl sm:text-3xl font-bold text-chart-5">5K+</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Educators</p>
            </div>
            <div className="p-4 sm:p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur">
              <p className="text-2xl sm:text-3xl font-bold text-accent">99.9%</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Purpose / Target Users / Core Value */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur">
            <h3 className="text-xl font-bold mb-2">Brand Purpose</h3>
            <p className="text-muted-foreground">
              AI-powered platform that helps teachers create interactive learning modules effortlessly.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur">
            <h3 className="text-xl font-bold mb-2">Target Users</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full border border-border text-sm">Coaching centers</span>
              <span className="px-3 py-1 rounded-full border border-border text-sm">Teachers</span>
              <span className="px-3 py-1 rounded-full border border-border text-sm">Students</span>
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur">
            <h3 className="text-xl font-bold mb-2">Core Value</h3>
            <p className="text-muted-foreground">
              Upload one video → AI edits, summarizes, creates notes, quizzes, flashcards, and full courses.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Benefits</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur text-center">
            <p className="text-lg font-semibold">Teachers save time</p>
          </div>
          <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur text-center">
            <p className="text-lg font-semibold">Students learn smarter</p>
          </div>
          <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur text-center">
            <p className="text-lg font-semibold">Institutes scale faster</p>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">The Problem</h2>
        <p className="text-muted-foreground text-center max-w-3xl mx-auto">
          Teachers waste time on editing and content creation, students struggle to retain information, and institutes can’t scale personalized learning.
        </p>
      </section>

      {/* Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">The Solution</h2>
        <p className="text-muted-foreground text-center max-w-3xl mx-auto">
          AI handles editing, creates notes and quizzes, generates flashcards, and delivers smart recommendations.
        </p>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid gap-6 sm:grid-cols-4">
          <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur text-center">
            <p className="font-semibold">Upload</p>
          </div>
          <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur text-center">
            <p className="font-semibold">AI builds</p>
          </div>
          <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur text-center">
            <p className="font-semibold">Students learn</p>
          </div>
          <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur text-center">
            <p className="font-semibold">Institutes grow</p>
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Outcome</h2>
        <p className="text-muted-foreground text-center max-w-3xl mx-auto">
          A modern, clear, and trustworthy learning ecosystem where everyone wins.
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Powerful Features for Modern Education</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Everything you need to create engaging, interactive learning experiences
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className={`group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br ${feature.color} border-border/50 backdrop-blur`}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="mb-3 sm:mb-4 p-3 rounded-lg w-fit bg-background/50 group-hover:bg-primary/10 transition-colors">
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-chart-5/20 blur-3xl" />
          <div className="relative p-8 sm:p-12 md:p-16 text-center border border-border/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Ready to Transform Learning?</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of educators and students building the future of education today
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-chart-5 hover:opacity-90 text-primary-foreground border-0 transition-opacity"
            >
              <Link to="/login">
                Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-12 sm:mt-24 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="text-sm sm:text-base">&copy; 2025 SynapseX. All rights reserved. Empowering education through AI.</p>
        </div>
      </footer>
    </div>
  )
}
