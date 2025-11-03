"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface RoleCardProps {
  title: string
  description: string
  icon: LucideIcon
  features: string[]
  isSelected: boolean
  onClick: () => void
  colorClasses: string
  iconColor: string
}

export function RoleCard({
  title,
  description,
  icon: Icon,
  features,
  isSelected,
  onClick,
  colorClasses,
  iconColor,
}: RoleCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-200 ${colorClasses} ${
        isSelected ? "ring-2 ring-primary shadow-lg scale-105" : "hover:shadow-md"
      }`}
      onClick={onClick}
    >
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
            <Icon className={`w-8 h-8 ${iconColor}`} />
          </div>
        </div>
        <CardTitle className="text-xl text-card-foreground">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground text-pretty">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-card-foreground mb-3">Key Features:</h4>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
