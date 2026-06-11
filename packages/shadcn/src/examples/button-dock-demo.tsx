"use client"

import { Button } from "@/components/ui/button"
import { ButtonDock } from "@/components/ui/button-dock"
import { Save, Trash2, Zap } from "lucide-react"

export default function ButtonDockDemo() {
  return (
    <div className="p-8 min-h-[120px] border border-dashed rounded-lg relative">
      <ButtonDock showMode>
        <Button size="sm">
          <Zap className="mr-2 h-4 w-4" />
          Generar
        </Button>
        <Button variant="outline" size="sm">
          <Save className="mr-2 h-4 w-4" />
          Guardar
        </Button>
        <Button variant="destructive" size="sm" className="px-2">
          <Trash2 className="h-4 w-4" />
        </Button>
      </ButtonDock>
    </div>
  )
}
