'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((label, idx) => {
        const isCompleted = idx < currentStep
        const isActive = idx === currentStep

        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? '#ec4899'
                    : isActive
                      ? '#ec4899'
                      : '#e2e8f0',
                }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <span
                    className={
                      isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'
                    }
                  >
                    {idx + 1}
                  </span>
                )}
              </motion.div>
              <span
                className={`text-xs mt-1 hidden sm:block ${
                  isActive
                    ? 'text-rose-600 dark:text-rose-400 font-medium'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {label}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 mb-4 sm:mb-0 ${
                  idx < currentStep
                    ? 'bg-rose-500'
                    : 'bg-slate-200 dark:bg-dark-bg-tertiary'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
