import { useState, useMemo } from "react"
import { Package, ShoppingCart, TrendingUp, Users, Copy, Pencil, Archive, Eye, Rocket, CheckCircle2, Gift, Plus, Clock } from "lucide-react"
import StatCard from "@/components/StatCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

type BundleStatus = "Draft" | "Active" | "Paused" | "Archived"
type Bundle = {
  id: string
  title: string
  status: BundleStatus
  preview: string[]
  sales: number
  revenue: number
}

type CampaignStatus = "Planned" | "Scheduled" | "Launched"
type Campaign = {
  id: string
  name: string
  status: CampaignStatus
  eta: string
  impact: string
}

const MarketerDashboard = () => {
  const { toast } = useToast()

  const stats = [
    {
      title: "Active Bundles",
      value: 8,
      icon: Package,
      trend: { value: 15, isPositive: true },
      color: "from-blue-500/10 to-blue-600/10",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Sales",
      value: 456,
      icon: ShoppingCart,
      trend: { value: 23, isPositive: true },
      color: "from-emerald-500/10 to-emerald-600/10",
      iconColor: "text-emerald-600",
    },
    {
      title: "Revenue",
      value: "$89,340",
      icon: TrendingUp,
      trend: { value: 18, isPositive: true },
      color: "from-purple-500/10 to-purple-600/10",
      iconColor: "text-purple-600",
    },
    {
      title: "Students Enrolled",
      value: 2847,
      icon: Users,
      trend: { value: 12, isPositive: true },
      color: "from-orange-500/10 to-orange-600/10",
      iconColor: "text-orange-600",
    },
  ]

  const [bundles, setBundles] = useState<Bundle[]>([
    {
      id: "b1",
      title: "Full Stack Developer Bundle",
      status: "Active",
      preview: ["React Basics", "Node APIs", "SQL Primer"],
      sales: 120,
      revenue: 2400,
    },
    {
      id: "b2",
      title: "Data Science Master Bundle",
      status: "Paused",
      preview: ["Python DS", "Pandas", "ML Intro"],
      sales: 95,
      revenue: 1900,
    },
    {
      id: "b3",
      title: "Mobile Development Bundle",
      status: "Draft",
      preview: ["RN Basics", "Navigation", "Deploy"],
      sales: 0,
      revenue: 0,
    },
  ])

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: "c1", name: "Back-to-School", status: "Planned", eta: "Sep 10", impact: "+15%" },
    { id: "c2", name: "Diwali Mega Sale", status: "Scheduled", eta: "Nov 1", impact: "+22%" },
  ])

  const [tasks, setTasks] = useState([
    { id: "t1", label: "Launch seasonal campaign", done: false },
    { id: "t2", label: "Send bundle promo emails", done: false },
    { id: "t3", label: "Review bundle feedback", done: true },
  ])

  const taskProgress = useMemo(() => {
    const total = tasks.length || 1
    const done = tasks.filter((t) => t.done).length
    return Math.round((done / total) * 100)
  }, [tasks])

  const handleEditBundle = (bundle: any) => {
    toast({
      title: "Edit Bundle",
      description: `Editing "${bundle.title}"...`,
    })
  }

  const handleDuplicateBundle = (bundle: any) => {
    const newBundle: Bundle = { ...bundle, id: `${bundle.id}-copy`, title: `${bundle.title} (Copy)`, status: "Draft" }
    setBundles((prev) => [...prev, newBundle])
    toast({
      title: "Bundle Duplicated",
      description: `"${bundle.title}" has been duplicated.`,
    })
  }

  const handleArchiveBundle = (bundle: Bundle) => {
    const newStatus: BundleStatus = bundle.status === "Archived" ? "Draft" : "Archived"
    setBundles((prev) => prev.map((b) => (b.id === bundle.id ? { ...b, status: newStatus } as Bundle : b)))
    toast({
      title: bundle.status === "Archived" ? "Bundle Restored" : "Bundle Archived",
      description: `"${bundle.title}" has been ${newStatus.toLowerCase()}.`,
    })
  }

  const handlePreviewBundle = (bundle: any) => {
    toast({
      title: "Preview Mode",
      description: `Previewing "${bundle.title}". This would open in a new window.`,
    })
  }

  const handleLaunchCampaign = (campaign: Campaign) => {
    setCampaigns((prev) => prev.map((c) => (c.id === campaign.id ? { ...c, status: "Launched" as CampaignStatus } : c)))
    toast({
      title: "Campaign Launched",
      description: `"${campaign.name}" is now live!`,
    })
  }

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)))
  }

  const handleGeneratePromo = () => {
    const code = `SAVE${Math.floor(Math.random() * 50)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
    toast({
      title: "Promo Code Generated",
      description: `Code: ${code} - Copy to clipboard`,
    })
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
      Paused: "bg-amber-100 text-amber-700 border-amber-200",
      Draft: "bg-slate-100 text-slate-600 border-slate-200",
      Archived: "bg-slate-50 text-slate-500 border-slate-100",
      Launched: "bg-emerald-100 text-emerald-700 border-emerald-200",
      Scheduled: "bg-blue-100 text-blue-700 border-blue-200",
      Planned: "bg-purple-100 text-purple-700 border-purple-200",
    }
    return colors[status] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marketer Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage bundles, campaigns, and track performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

        <Card>
          <CardHeader className="border-b border-slate-200 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Bundle Management</CardTitle>
                <CardDescription>Create, edit, and manage your course bundles</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {bundles.map((bundle) => (
                <div
                  key={bundle.id}
                  className="group flex items-center justify-between p-4 rounded-lg border hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{bundle.title}</h3>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(bundle.status)}`}
                      >
                        {bundle.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{bundle.sales} sales</span>
                      <span>${bundle.revenue.toLocaleString()} revenue</span>
                      <span>{bundle.preview.length} courses</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePreviewBundle(bundle)}
                      title="Preview bundle"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditBundle(bundle)} title="Edit bundle">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDuplicateBundle(bundle)}
                      title="Duplicate bundle"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleArchiveBundle(bundle)}
                      title="Archive bundle"
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-slate-200 pb-6">
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>Plan, schedule, and launch your marketing campaigns</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="p-4 rounded-lg border hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 inline mr-1" />
                        ETA: {campaign.eta}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(campaign.status)}`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <div className="mb-4 p-3 rounded-lg border bg-accent/5 border-accent/30">
                    <p className="text-sm font-semibold">Expected Impact: {campaign.impact} sales</p>
                  </div>
                  <Button
                    onClick={() => handleLaunchCampaign(campaign)}
                    disabled={campaign.status === "Launched"}
                    className="w-full"
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    {campaign.status === "Launched" ? "Launched" : "Launch Campaign"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-slate-200 pb-6">
            <CardTitle>Task Progress</CardTitle>
            <CardDescription>Complete your marketing tasks</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Progress</span>
                <span className="text-lg font-bold text-primary">{taskProgress}%</span>
              </div>
              <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${taskProgress}%` }} />
              </div>
            </div>
            <div className="space-y-2">
              {tasks.map((task) => (
                <label
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-secondary/50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleToggleTask(task.id)}
                    className="w-5 h-5 rounded accent-primary cursor-pointer"
                  />
                  <span className={`text-sm flex-1 ${task.done ? "line-through text-muted-foreground" : ""}`}>
                    {task.label}
                  </span>
                  {task.done && <CheckCircle2 className="h-5 w-5 text-success" />}
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-slate-200 pb-6">
            <CardTitle>Generate Promo Codes</CardTitle>
            <CardDescription>Create promotional codes for your bundles</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Button onClick={handleGeneratePromo}>
                <Gift className="h-4 w-4 mr-2" />
                Generate New Code
              </Button>
              <Button variant="outline">View History</Button>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}

export default MarketerDashboard
