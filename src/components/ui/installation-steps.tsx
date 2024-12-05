import { CodeBlock } from "../code-block"
import { Separator } from "./separator"

interface Step {
  title: string
  code?: string
  language?: string
  description?: string
  filename?: string
}

interface InstallationStepsProps {
  steps: Step[]
}

export function InstallationSteps({ steps }: InstallationStepsProps) {
  return (
    <div className="space-y-8">
      <Separator className="mb-4"/>
      {steps.map((step, index) => (
        <div key={index} className="relative">
          <div className="flex items-start gap-4 flex-col md:flex-row">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
              {index + 1}
            </div>
            <div className="space-y-4 w-full">
              <h3 className="font-semibold leading-none tracking-tight">
                {step.title}
              </h3>
              {step.description && (
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              )}
              {step.code && (
                <div className="mt-4">
                  <CodeBlock
                    code={step.code}
                    language={step.language || "typescript"}
                    filename={step.filename}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

