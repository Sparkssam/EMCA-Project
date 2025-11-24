"use client"

import { useState } from "react"
import { TrendingUp, Edit, Trash2, Plus, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { createImpactStat, updateImpactStat, deleteImpactStat, type ImpactStat } from "@/lib/actions/content"

const ICON_OPTIONS = [
  { value: "TreePine", label: "Tree Pine" },
  { value: "Users", label: "Users" },
  { value: "Sprout", label: "Sprout" },
  { value: "Recycle", label: "Recycle" },
  { value: "Leaf", label: "Leaf" },
  { value: "Globe", label: "Globe" },
  { value: "Target", label: "Target" },
  { value: "Award", label: "Award" },
]

const COLOR_OPTIONS = [
  { value: "text-emca-primary", label: "Primary Green", bg: "bg-emca-primary/10" },
  { value: "text-emca-medium", label: "Medium Green", bg: "bg-emca-medium/10" },
  { value: "text-emca-yellow", label: "Yellow", bg: "bg-emca-yellow/10" },
  { value: "text-emca-lime", label: "Lime", bg: "bg-emca-lime/10" },
  { value: "text-blue-600", label: "Blue", bg: "bg-blue-500/10" },
  { value: "text-purple-600", label: "Purple", bg: "bg-purple-500/10" },
  { value: "text-orange-600", label: "Orange", bg: "bg-orange-500/10" },
  { value: "text-red-600", label: "Red", bg: "bg-red-500/10" },
]

interface ImpactStatsManagerProps {
  stats: ImpactStat[]
  userEmail: string
}

export function ImpactStatsManager({ stats: initialStats, userEmail }: ImpactStatsManagerProps) {
  const [stats, setStats] = useState<ImpactStat[]>(initialStats)
  const [editingStat, setEditingStat] = useState<ImpactStat | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<ImpactStat>>({
    stat_value: 0,
    stat_suffix: "+",
    stat_label: "",
    stat_description: "",
    icon_name: "TreePine",
    icon_color: "text-emca-primary",
    bg_color: "bg-emca-primary/10",
    stat_order: 1,
    active: true,
  })

  const handleCreate = () => {
    setIsCreating(true)
    setFormData({
      stat_value: 0,
      stat_suffix: "+",
      stat_label: "",
      stat_description: "",
      icon_name: "TreePine",
      icon_color: "text-emca-primary",
      bg_color: "bg-emca-primary/10",
      stat_order: stats.length + 1,
      active: true,
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (stat: ImpactStat) => {
    setIsCreating(false)
    setEditingStat(stat)
    setFormData({
      stat_value: stat.stat_value,
      stat_suffix: stat.stat_suffix,
      stat_label: stat.stat_label,
      stat_description: stat.stat_description,
      icon_name: stat.icon_name,
      icon_color: stat.icon_color,
      bg_color: stat.bg_color,
      stat_order: stat.stat_order,
      active: stat.active,
    })
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    if (!formData.stat_label || !formData.stat_description) {
      toast.error("Please fill in all required fields")
      return
    }

    if (isCreating) {
      const result = await createImpactStat(formData as Omit<ImpactStat, "id">, userEmail)
      if (result.success) {
        toast.success("Impact stat created successfully!")
        window.location.reload()
      } else {
        toast.error(result.error || "Failed to create impact stat")
      }
    } else if (editingStat) {
      const result = await updateImpactStat(editingStat.id, formData, userEmail)
      if (result.success) {
        toast.success("Impact stat updated successfully!")
        window.location.reload()
      } else {
        toast.error(result.error || "Failed to update impact stat")
      }
    }
  }

  const handleDelete = async (id: number, label: string) => {
    if (!confirm(`Are you sure you want to delete "${label}"?`)) return

    const result = await deleteImpactStat(id)
    if (result.success) {
      toast.success("Impact stat deleted successfully!")
      setStats(stats.filter((s) => s.id !== id))
    } else {
      toast.error(result.error || "Failed to delete impact stat")
    }
  }

  const handleColorChange = (color: string) => {
    const selectedColor = COLOR_OPTIONS.find((c) => c.value === color)
    if (selectedColor) {
      setFormData({ ...formData, icon_color: selectedColor.value, bg_color: selectedColor.bg })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-pompiere text-foreground">Manage Impact Statistics</h2>
            <p className="text-muted-foreground mt-1">Create and edit impact metrics displayed on the homepage</p>
          </div>
          <Button onClick={handleCreate} className="bg-emca-primary hover:bg-emca-secondary text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Stat
          </Button>
        </div>

        {/* Stats List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-card border-2 border-border rounded-xl p-6 hover:border-emca-primary/40 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 ${stat.bg_color} rounded-xl flex items-center justify-center`}>
                  <TrendingUp className={`h-6 w-6 ${stat.icon_color}`} />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(stat)} variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(stat.id, stat.stat_label)}
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className={`${stat.icon_color} text-4xl font-bold mb-2`}>
                {stat.stat_value.toLocaleString()}
                {stat.stat_suffix}
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-1">{stat.stat_label}</h3>
              <p className="text-sm text-muted-foreground">{stat.stat_description}</p>

              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span>Order: {stat.stat_order}</span>
                <span>•</span>
                <span className={stat.active ? "text-green-600" : "text-red-600"}>
                  {stat.active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {stats.length === 0 && (
          <div className="text-center py-12 bg-card border-2 border-dashed border-border rounded-xl">
            <TrendingUp className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">No impact stats yet. Create your first stat!</p>
          </div>
        )}

        {/* Create/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isCreating ? "Create New Impact Stat" : "Edit Impact Stat"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Value *</label>
                  <Input
                    type="number"
                    value={formData.stat_value}
                    onChange={(e) => setFormData({ ...formData, stat_value: parseInt(e.target.value) || 0 })}
                    placeholder="e.g., 50000"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Suffix</label>
                  <Input
                    value={formData.stat_suffix}
                    onChange={(e) => setFormData({ ...formData, stat_suffix: e.target.value })}
                    placeholder="e.g., +"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Label *</label>
                <Input
                  value={formData.stat_label}
                  onChange={(e) => setFormData({ ...formData, stat_label: e.target.value })}
                  placeholder="e.g., Trees Planted"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description *</label>
                <Textarea
                  value={formData.stat_description}
                  onChange={(e) => setFormData({ ...formData, stat_description: e.target.value })}
                  placeholder="Brief description of this stat"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Icon</label>
                  <Select value={formData.icon_name} onValueChange={(value) => setFormData({ ...formData, icon_name: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ICON_OPTIONS.map((icon) => (
                        <SelectItem key={icon.value} value={icon.value}>
                          {icon.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Color</label>
                  <Select value={formData.icon_color} onValueChange={handleColorChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COLOR_OPTIONS.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          {color.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Display Order</label>
                  <Input
                    type="number"
                    value={formData.stat_order}
                    onChange={(e) => setFormData({ ...formData, stat_order: parseInt(e.target.value) || 1 })}
                    min="1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select
                    value={formData.active ? "active" : "inactive"}
                    onValueChange={(value) => setFormData({ ...formData, active: value === "active" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-emca-primary hover:bg-emca-secondary text-white">
                <Save className="h-4 w-4 mr-2" />
                {isCreating ? "Create Stat" : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
