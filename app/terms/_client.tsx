'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Link from 'next/link'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'By accessing and using I Am Visible Today, you agree to be bound by these Terms of Service and our Privacy Policy.',
      'If you do not agree with any part of these terms, you may not use the platform.',
      'We may modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.',
      'These terms apply to all users, regardless of age, location, or device.',
    ],
  },
  {
    title: '2. Eligibility',
    content: [
      'Age Requirement: You must be at least 13 years old to use I Am Visible Today.',
      'Age Verification: We require verification of age (date of birth) upon submission.',
      'Account Responsibility: You are responsible for maintaining the confidentiality of your account information.',
      'Legal Capacity: You represent that you have the legal capacity to enter this agreement.',
      'Prohibited Users: Users under 13, individuals with intellectual disabilities who cannot consent, and those in jurisdictions where our service is prohibited cannot use this platform.',
    ],
  },
  {
    title: '3. Description of Service',
    content: [
      'I Am Visible Today is a privacy-first mental health story archive where users share "visibility moments" anonymously.',
      'The platform provides: submission of stories (text, photos, voice), human curation and moderation, and public display of published stories.',
      'Service Changes: We may modify, add, or discontinue features or services at any time with or without notice.',
      'Availability: We do not guarantee uninterrupted or error-free service. Access may be interrupted for maintenance, updates, or security reasons.',
      'Not a Service Provider: This platform is NOT a medical service, therapy service, mental health treatment, or crisis support line. See section 10 (Mental Health Disclaimer).',
    ],
  },
  {
    title: '4. User Accounts & Anonymity',
    content: [
      'Anonymous Submissions: You can submit stories without creating an account or providing identifying information.',
      'Pseudonyms: You may use any name or identifier. We do not verify your identity.',
      'Future Accounts (Phase 2): In the future, we may offer optional user accounts for tracking your submissions. These will remain pseudonymous.',
      'Your Responsibility: You are responsible for all content submitted under your name/pseudonym, even if anonymous.',
      'Account Security: Do not share your access credentials. We are not responsible for unauthorized access due to your negligence.',
    ],
  },
  {
    title: '5. User Content & Intellectual Property Rights',
    content: [
      'Ownership: You retain all ownership rights to your submitted content.',
      'License Granted: By submitting content, you grant I Am Visible Today a non-exclusive, worldwide, royalty-free license to store, display, and distribute your content.',
      'Attribution: We may identify stories by pseudonym, date, or story number. We do not identify you by real name.',
      'Original Content: You represent that your submission is original or that you have permission to share it.',
      'Third-Party Content: You are responsible for obtaining permission from any third parties whose content appears in your submission.',
      'Copyright: If your work is copyrighted and you do not want it displayed here, do not submit it. Upon takedown request, we will remove it.',
    ],
  },
  {
    title: '6. Community Guidelines',
    content: [
      'These terms incorporate our Community Guidelines by reference. See /guidelines for full details.',
      'Acceptable Submissions: Stories must be authentic, respectful, and relate to personal mental health visibility moments.',
      'Prohibited Content: Submissions must not target individuals, contain hate speech, promote self-harm, be commercial, or violate others\' privacy.',
      'Consequences: Violations may result in story rejection, content removal, or platform access termination.',
      'Moderation Process: All submissions are reviewed by human moderators within 24-48 hours. You will receive notification of acceptance or rejection.',
      'Appeals: If your story is rejected, you can request clarification or submit an appeal via email.',
    ],
  },
  {
    title: '7. Intellectual Property Rights',
    content: [
      'Platform IP: I Am Visible Today, its design, logo, and all original content are owned or licensed by the platform.',
      'Trademark: "I Am Visible Today™" is a registered trademark. Do not use it without permission.',
      'User Content: You retain ownership of your submitted stories. The platform has a license to display them.',
      'Open Source: The platform source code is open-sourced under the AGPL-3.0 license. See LICENSE.md for details.',
      'Limitations: You may not copy, modify, or distribute our platform code, design, or content without permission (except as permitted by AGPL-3.0 for developers).',
      'Third-Party IP: Do not submit content that infringes third-party intellectual property rights.',
    ],
  },
  {
    title: '8. Content Protection & Prohibition on Scraping and AI Training',
    content: [
      'Content Protection: All user-submitted stories, photos, and voice notes are protected intellectual property.',
      'No Scraping: You may not use automated tools, bots, scripts, or any method to extract, copy, or collect content from the platform.',
      'No AI Training: You may not use any content from this platform to train, fine-tune, or improve artificial intelligence models, machine learning systems, or large language models.',
      'No Commercial Use: Content from this platform may not be used for commercial purposes, resale, or redistribution.',
      'No Reverse Engineering: You may not attempt to reverse-engineer, decompile, or extract our technical infrastructure or security measures.',
      'Technical Protections: We employ technical measures to prevent unauthorized access, including session-based tokens, encryption, and access logging.',
      'Legal Enforcement: Violations of this section may result in legal action, including copyright infringement claims and CFAA violations.',
      'User Consent: By submitting content, you authorize us to protect it from unauthorized use and take legal action on your behalf if necessary.',
    ],
  },
  {
    title: '9. Privacy Policy',
    content: [
      'These terms incorporate our Privacy Policy by reference. See /privacy for full details.',
      'Data Collection: We collect minimal data (only what you provide). See Privacy Policy for details.',
      'No Tracking: We do not track you, profile you, or sell your data.',
      'GDPR/CCPA Compliance: We comply with privacy regulations including GDPR, CCPA, COPPA, and PIPEDA.',
      'Your Rights: You have the right to access, delete, and correct your data. See Privacy Policy for how to exercise your rights.',
    ],
  },
  {
    title: '10. Prohibited Activities',
    content: [
      'Harassment: Do not submit content that harasses, threatens, or defames individuals or groups.',
      'Hate Speech: No content promoting hatred, discrimination, or violence based on identity.',
      'Self-Harm: Do not submit content promoting, glorifying, or providing instructions for self-harm or suicide.',
      'Commercial Use: No advertising, promotion, or commercial content. No spam or commercial offers.',
      'Impersonation: Do not pretend to be someone else or misrepresent your identity with intent to deceive.',
      'Illegal Content: Do not submit content describing illegal activities or encouraging illegal behavior.',
      'Privacy Violation: Do not share other people\'s private information, photos, or content without consent.',
      'Automated Access: Do not use bots, scripts, or automated tools to access the platform.',
      'Security Circumvention: Do not attempt to hack, breach, or bypass platform security measures.',
      'Misinformation: Do not submit false or misleading information presented as fact (personal stories are okay).',
      'Sexual Content: No sexually explicit content or child sexual abuse material (CSAM).',
    ],
  },
  {
    title: '11. Mental Health Disclaimer (CRITICAL)',
    content: [
      '⚠️ IMPORTANT: This platform is NOT a substitute for professional mental health care.',
      'Not Therapy: I Am Visible Today is not therapy, counseling, or mental health treatment.',
      'No Professional Relationship: Reading or submitting stories does not create a doctor-patient, therapist-client, or professional healthcare relationship.',
      'Not Medical Advice: Content is not medical advice. Do not treat stories as medical guidance.',
      'Seek Professional Help: If you are struggling with mental health, please reach out to a qualified mental health professional.',
      'Crisis Resources: If you are in crisis or having thoughts of self-harm:',
      '  • US: Call or text 988 (Suicide & Crisis Lifeline)',
      '  • Canada: Call 1-833-456-4566 (Crisis Text Line)',
      '  • International: Visit findahelpline.com',
      'Liability Limitation: We are not liable for any harm, distress, or negative outcomes related to content on this platform.',
      'User Responsibility: You are responsible for seeking professional help if content affects your mental health.',
    ],
  },
  {
    title: '12. Moderation & Content Removal',
    content: [
      'Human Moderation: All submissions are reviewed by human moderators. No algorithms decide what is published.',
      'Curator Discretion: Moderators use judgment to ensure stories align with guidelines. Decisions are final.',
      'No Guarantee of Publication: Submission does not guarantee publication. We may reject stories for any reason.',
      'Removal Rights: We may remove published stories without notice if they violate these terms.',
      'Timeframe: Moderation typically occurs within 24-48 hours. During high volume, it may take longer.',
      'Notification: You will be notified of acceptance or rejection. If rejected, you may ask for clarification.',
      'Appeal Process: If you believe your story was unfairly rejected, contact our team to request review.',
      'Takedown Requests: If you submitted content that should be removed, contact us via our contact section.',
    ],
  },
  {
    title: '13. Disclaimers of Warranties',
    content: [
      '"AS IS" Basis: The platform is provided "AS IS" and "AS AVAILABLE" without warranties.',
      'No Warranties: We make no express or implied warranties about accuracy, completeness, timeliness, or legality of content.',
      'User-Generated Content: Stories are submitted by users and do not represent the platform\'s views or endorsements.',
      'No Guarantee of Results: We do not guarantee that sharing or reading stories will improve mental health.',
      'Third-Party Content: We are not liable for third-party content, links, or services.',
      'Uptime: We do not guarantee uninterrupted service, error-free operation, or absence of harmful code.',
      'Disclaimer Scope: These disclaimers apply to the fullest extent permitted by law.',
    ],
  },
  {
    title: '14. Limitation of Liability',
    content: [
      'No Indirect Damages: We are not liable for indirect, incidental, special, or consequential damages.',
      'No Lost Data Liability: We are not liable for data loss, even if caused by our negligence.',
      'No Emotional Distress Liability: We are not liable for emotional distress, psychological harm, or mental health impacts from content.',
      'Maximum Liability: Our total liability under these terms shall not exceed $100 CAD.',
      'Exceptions: These limitations do not apply where prohibited by law (e.g., gross negligence, willful misconduct).',
      'Third-Party Claims: We are not liable for third-party claims related to your submitted content.',
    ],
  },
  {
    title: '15. Indemnification',
    content: [
      'You Agree to Indemnify: You agree to defend, indemnify, and hold harmless I Am Visible Today from any claims, damages, or costs arising from:',
      '  • Your violation of these terms',
      '  • Your submitted content',
      '  • Your use of the platform',
      '  • Your infringement of third-party rights',
      '  • Claims by others based on your content',
      'Legal Defense: You will pay for our legal defense if you violate these terms.',
      'Third-Party Claims: You are responsible for third-party claims related to your submitted content.',
    ],
  },
  {
    title: '16. Termination',
    content: [
      'Termination by You: You may stop using the platform at any time without notice or explanation.',
      'Termination by Us: We may terminate your access if you violate these terms, engage in harassment, or pose a safety risk.',
      'No Warning Required: We may terminate access without warning if necessary for safety or legal compliance.',
      'Effect of Termination: Upon termination, your account and content access will be restricted.',
      'Content Deletion: If you request deletion, we will remove your content from public view within 24 hours and delete from backups within 90 days.',
      'Survival: Certain provisions (Disclaimers, Limitation of Liability, Indemnification) survive termination.',
    ],
  },
  {
    title: '17. Changes to Terms',
    content: [
      'Right to Modify: We may modify these terms at any time without notice.',
      'Notification: For significant changes affecting your rights, we will notify you via email or platform notification.',
      'Effective Date: Changes take effect immediately upon posting unless stated otherwise.',
      'Continued Use: Your continued use after changes constitutes acceptance of the modified terms.',
      'Review Regularly: We encourage you to review these terms regularly for updates.',
    ],
  },
  {
    title: '18. Governing Law & Dispute Resolution',
    content: [
      'Governing Law: These terms are governed by the laws of Canada, Province of Ontario, without regard to conflict of law principles.',
      'Jurisdiction: You agree to submit to the exclusive jurisdiction of courts in Ontario, Canada.',
      'Arbitration: Non-refundable disputes may be resolved through binding arbitration rather than court litigation.',
      'Class Action Waiver: You agree not to participate in class action lawsuits against the platform.',
      'Dispute Process: Before legal action, try to resolve disputes by contacting our legal team via the contact section.',
      'Informal Resolution: We will attempt to resolve disputes informally within 30 days.',
    ],
  },
  {
    title: '19. Miscellaneous',
    content: [
      'Entire Agreement: These terms, Privacy Policy, and Community Guidelines constitute the entire agreement.',
      'Severability: If any provision is unenforceable, the rest of the terms remain in effect.',
      'No Waiver: Failure to enforce any provision does not constitute waiver of that provision.',
      'Assignment: You may not assign these terms to others. We may assign to successors or acquirers.',
      'Force Majeure: We are not liable for failures due to causes beyond our control (natural disasters, war, pandemics).',
      'Interpretation: These terms are interpreted fairly. Ambiguities are not interpreted against the drafter.',
      'Notices: Legal notices should be sent to our legal team contact address (see Contact Information).',
    ],
  },
  {
    title: '20. Contact Information',
    content: [
      'For questions about these Terms of Service, use the contact form below or refer to our Privacy Policy for all contact options.',
      'Mailing Address: 330 Avro Ave, Pointe-Claire, Quebec H9R 5W5, Canada',
      'Response Time: We aim to respond within 30 days.',
      'For specific inquiries: see the "Need Help?" section below for direct contact methods.',
    ],
  },
]

export default function TermsPageClient() {
  return (
    <>
      {/* Header */}
      <section className="py-6 md:py-8 bg-rose-50 dark:bg-dark-bg-secondary">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl text-text-primary dark:text-dark-text-primary mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Your agreement with I Am Visible Today. Please read carefully.
            </p>
            <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary mt-4">
              Effective Date: February 2026 | Last Updated: February 2026
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Terms Sections */}
      <section className="py-16">
        <Container maxWidth="content">
          <div className="space-y-8">
            {sections.map((section) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card>
                  <h2 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mb-4">
                    {section.title}
                  </h2>
                  <ul className="space-y-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                    {section.content.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-rose-500 font-bold mt-0.5 shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Related Policies */}
      <section className="py-16 bg-slate-50 dark:bg-dark-bg-secondary border-t border-rose-200 dark:border-dark-bg-tertiary transition-colors duration-200">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white dark:bg-dark-bg-tertiary">
              <h2 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mb-6">
                Related Policies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">Privacy Policy</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
                    Learn how we collect, protect, and respect your data.
                  </p>
                  <Link href="/privacy" className="text-rose-600 dark:text-rose-400 hover:underline text-sm font-medium">
                    Read Privacy Policy →
                  </Link>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">Community Guidelines</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
                    Understand what makes stories shareable and our moderation process.
                  </p>
                  <Link href="/guidelines" className="text-rose-600 dark:text-rose-400 hover:underline text-sm font-medium">
                    Read Guidelines →
                  </Link>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">Open Source</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
                    Our platform is AGPL-3.0 open source. View the code on GitHub.
                  </p>
                  <a
                    href="https://github.com/iamvisibletoday/iamvisibletoday-web-app.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-600 dark:text-rose-400 hover:underline text-sm font-medium"
                  >
                    View on GitHub →
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        </Container>
      </section>

      {/* Contact & Mental Health Resources */}
      <section className="py-16 bg-white dark:bg-dark-bg-primary">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-l-4 border-l-rose-500 dark:border-l-rose-400">
              <h2 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mb-6">
                Need Help?
              </h2>
              <div className="space-y-4 mb-6">
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  Questions about these Terms? Visit our{' '}
                  <Link href="/contact" className="text-rose-600 dark:text-rose-400 hover:underline font-medium">
                    Contact page
                  </Link>{' '}
                  for all ways to reach us and our response times.
                </p>
                <div className="pt-4 border-t border-rose-200 dark:border-rose-900/30">
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-4">In Crisis?</h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    <strong>US:</strong> Call{' '}
                    <a href="tel:988" className="text-rose-600 dark:text-rose-400 hover:underline font-medium">
                      988
                    </a>
                    <br />
                    <strong>Canada:</strong> Call{' '}
                    <a href="tel:+1-833-456-4566" className="text-rose-600 dark:text-rose-400 hover:underline font-medium">
                      1-833-456-4566
                    </a>
                    <br />
                    <strong>International:</strong> Visit{' '}
                    <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" className="text-rose-600 dark:text-rose-400 hover:underline font-medium">
                      findahelpline.com
                    </a>
                  </p>
                </div>
              </div>
              <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary mt-6 pt-6 border-t border-rose-200 dark:border-rose-900/30">
                Last updated: February 2026 | Version 1.0
              </p>
            </Card>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
