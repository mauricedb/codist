import { ShieldCheckIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { FeatureSection } from "./feature-section"
import { CalendarMockup, TodayMockup, VoiceCaptureMockup } from "./mockups"

export function Features() {
  return (
    <div id="features">
      <FeatureSection
        eyebrow="Clear your mind"
        title="Capture tasks at the speed of thought"
        description="We've spent over a decade refining Codist to be an extension of your mind. Capture and organize tasks instantly using easy-flowing, natural language."
        visual={<VoiceCaptureMockup />}
      />
      <FeatureSection
        title="Simplify your planning"
        description="Make the most of your time. Schedule due dates, visualize your week in calendar view, and set recurring tasks with ease."
        visual={<TodayMockup />}
      />
      <FeatureSection
        eyebrow="Organize your teamwork, too"
        title="A home for your team's tasks"
        description="Give your team a shared space to collaborate and stay on top of it all – alongside but separate from your personal tasks and projects."
        link={{ label: "Learn more about teams", href: "/teams" }}
        visual={<CalendarMockup />}
      >
        <Card size="sm" className="mt-4 bg-muted/50">
          <CardContent className="flex gap-3">
            <ShieldCheckIcon aria-hidden className="size-5 shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="font-semibold">
                Enterprise-grade security with SOC2 Type II certification.
              </p>
              <p className="text-muted-foreground">
                Codist meets the compliance standards your company requires,
                without the complexity.
              </p>
            </div>
          </CardContent>
        </Card>
      </FeatureSection>
    </div>
  )
}
