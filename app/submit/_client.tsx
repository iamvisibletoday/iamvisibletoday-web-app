'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import { SubmitFormProvider, useSubmitForm } from '@/components/submit/SubmitFormContext'
import StepIndicator from '@/components/submit/StepIndicator'
import AgeGateStep from '@/components/submit/steps/AgeGateStep'
import FormatStep from '@/components/submit/steps/FormatStep'
import ContentStep from '@/components/submit/steps/ContentStep'
import PrivacyStep from '@/components/submit/steps/PrivacyStep'
import ReviewStep from '@/components/submit/steps/ReviewStep'
import ConfirmationStep from '@/components/submit/steps/ConfirmationStep'

const steps = [
  { component: AgeGateStep, label: 'Verify Age' },
  { component: FormatStep, label: 'Format' },
  { component: ContentStep, label: 'Your Story' },
  { component: PrivacyStep, label: 'Privacy' },
  { component: ReviewStep, label: 'Review' },
  { component: ConfirmationStep, label: 'Done' },
]

function SubmitFormContent() {
  const { currentStep } = useSubmitForm()
  const CurrentStepComponent = steps[currentStep].component
  const isConfirmation = currentStep === steps.length - 1

  return (
    <>
      {/* Header */}
      <section className="py-8 md:py-12 bg-rose-50 dark:bg-dark-bg-secondary border-b border-rose-200 dark:border-dark-bg-tertiary">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl text-text-primary dark:text-dark-text-primary mb-4">
              Share Your Story
            </h1>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Your moment of visibility matters. Share it safely and anonymously.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Step Indicator (hidden on confirmation) */}
      {!isConfirmation && (
        <section className="py-6 border-b border-rose-100 dark:border-dark-bg-tertiary">
          <Container maxWidth="content">
            <StepIndicator
              steps={steps.slice(0, -1).map((s) => s.label)}
              currentStep={currentStep}
            />
          </Container>
        </section>
      )}

      {/* Step Content */}
      <section className="py-12">
        <Container maxWidth="content">
          <AnimatePresence mode="wait">
            <CurrentStepComponent key={currentStep} />
          </AnimatePresence>
        </Container>
      </section>
    </>
  )
}

export default function SubmitPageClient() {
  return (
    <SubmitFormProvider>
      <SubmitFormContent />
    </SubmitFormProvider>
  )
}
