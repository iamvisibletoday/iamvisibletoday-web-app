'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

const sections = [
  {
    title: 'About This Privacy Policy',
    content: [
      'This privacy policy explains how I Am Visible Today collects, uses, stores, and protects your information.',
      'We are committed to protecting your privacy. This policy applies to all users, regardless of location.',
      'This policy was last updated in February 2026. We will notify you of significant changes via email or platform notification.',
    ],
  },
  {
    title: 'Data Controller & Contact Information',
    content: [
      'Data Controller: I Am Visible Today (operating as individual sole proprietor in Canada)',
      'Mailing Address: 330 Avro Ave, Pointe-Claire, Quebec H9R 5W5, Canada',
      'Contact: See "Questions about your privacy?" section below for all contact methods',
      'Response Time: We aim to respond to all privacy requests within 30 days',
      'Inquiries: For privacy, legal, or general questions, use the contact options provided in the contact section',
    ],
  },
  {
    title: 'What Data We Collect',
    content: [
      'Stories you submit: text, photos, voice recordings (with your explicit consent)',
      'Optional contact information: only if you choose to provide it for follow-up communication',
      'Basic anonymized usage data: story submission patterns (no user tracking)',
      'We do NOT collect: IP addresses, cookies for tracking, device identifiers, geolocation, browsing history, or any identifying information',
      'Age verification: date of birth to confirm 13+ age requirement (collected during submission)',
    ],
  },
  {
    title: 'How We Use Your Data',
    content: [
      'To publish and display your story with your consent',
      'To moderate content and ensure community safety (human moderation only)',
      'To improve our platform and user experience',
      'To respond to your inquiries if you contact us',
      'To comply with legal obligations and protect safety',
      'We will NEVER: Sell your data, share it with third parties for marketing, use it for advertising, profile you, train AI models on your content, or use it for purposes beyond what you consented to',
    ],
  },
  {
    title: 'Legal Basis for Processing (GDPR)',
    content: [
      'Consent: Your explicit agreement to submit stories and share them publicly',
      'Legitimate Interest: To operate the platform, ensure safety, prevent abuse, maintain technical security',
      'Contractual Necessity: To deliver the service and fulfill our moderation responsibilities',
      'Legal Compliance: To meet legal obligations under Canadian, GDPR, CCPA, COPPA, and PIPEDA requirements',
    ],
  },
  {
    title: 'Children\'s Privacy (COPPA Compliance)',
    content: [
      'Minimum Age: I Am Visible Today is intended for users 13 years and older',
      'Age Verification: We require date of birth confirmation. Users under 13 cannot submit or access the platform.',
      'We do not knowingly collect information from children under 13. If we discover this has occurred, we will delete the information immediately.',
      'Parents/Guardians: If your child has submitted content without your consent, contact us (see Contact Information section) for removal',
      'No parental consent process is required for 13+ users, as this platform does not target children under 13',
    ],
  },
  {
    title: 'Photo & Image Privacy',
    content: [
      'Automatic EXIF Stripping: All photos are processed to remove metadata including location, device info, timestamps, and camera settings',
      'Compression: Images are compressed for web performance without reducing privacy or data security',
      'No AI Analysis: We do not analyze, tag, extract data, or use machine learning on your images',
      'Storage: Images are stored encrypted on secure Supabase servers with access restricted to authorized moderators only',
      'Deletion: You can request permanent deletion of images, and we will remove them from all backups within 90 days',
    ],
  },
  {
    title: 'Voice Recording Privacy',
    content: [
      'Client-Side Processing: Voice recordings are processed on your device before upload',
      'Encrypted in Transit: Sent securely to our servers using HTTPS encryption',
      'No Transcription: We do not transcribe, analyze, or use voice recordings for any purpose beyond storage and display',
      'No Speaker Identification: We do not perform speaker identification or voice analysis',
      'Storage: Voice files are encrypted at rest and accessed only by authorized moderators',
      'Deletion: You can request permanent deletion of voice recordings',
    ],
  },
  {
    title: 'Your Anonymity Rights',
    content: [
      'Complete Anonymity: You can submit stories without providing any identifying information',
      'Pseudonyms: Use any name or identifier you choose. We do not verify identity.',
      'No Tracking: We do not track you across devices, browsers, or sessions',
      'No Profiling: We never create profiles, track individual users, or build behavioral profiles',
      'Deletion: You can request deletion of your story or entire submission history at any time',
      'Permanent Removal: Upon deletion request, your content will be removed from public view within 24 hours and deleted from backups within 90 days',
    ],
  },
  {
    title: 'Third-Party Services & Data Transfers',
    content: [
      'Hosting Provider: Supabase (open source, privacy-focused, SOC 2 compliant) for data storage - servers in North America and EU',
      'Deployment Platform: Vercel (servers in North America) for website hosting with end-to-end encryption',
      'Analytics: Vercel Web Analytics only (privacy-focused, aggregated data including country/region; no tracking cookies, no individual user identification, no behavioral profiles)',
      'No Third-Party Analytics: We do not use Google Analytics, Facebook Pixel, Mixpanel, or similar tracking services',
      'No Cookies: We use localStorage for theme preferences (dark/light mode) only - no tracking cookies',
      'Data Processors: All third parties are bound by data processing agreements and cannot use your data for their own purposes',
    ],
  },
  {
    title: 'International Data Transfers',
    content: [
      'Server Locations: Data may be stored on servers in Canada, USA, or EU depending on Supabase region',
      'GDPR Compliance: For EU users, we comply with GDPR through Supabase\'s Standard Contractual Clauses',
      'Cross-Border Transfers: We only transfer data to countries/regions with adequate data protection or with appropriate safeguards',
      'Your Rights: You have the right to know where your data is processed and can request transfer to different regions if available',
    ],
  },
  {
    title: 'Data Security & Encryption',
    content: [
      'In Transit: All data is encrypted using HTTPS/TLS encryption',
      'At Rest: All stored data is encrypted using AES-256 encryption',
      'Access Control: Only authorized moderators can access submission data; access is logged and monitored',
      'Regular Security: We conduct regular security reviews and vulnerability assessments',
      'Incident Response: If we discover a security breach, we will notify affected users within 72 hours as required by law',
      'Compliance: We follow GDPR, CCPA, COPPA, and PIPEDA security standards',
    ],
  },
  {
    title: 'Your Rights (All Users)',
    content: [
      'Right to Access: Request a copy of your data and submission history',
      'Right to Deletion: Request deletion of your story or entire account at any time',
      'Right to Correction: Ask us to fix or update your information',
      'Right to Opt-Out: Stop using our platform without penalty or explanation required',
      'Right to Data Portability: Request your data in a portable, machine-readable format',
      'Right to Lodge Complaint: Contact your local data protection authority (for EU: your country\'s DPA)',
    ],
  },
  {
    title: 'Rights for EU Residents (GDPR)',
    content: [
      'Right to Erasure: "Right to be forgotten" - we will delete your data upon request',
      'Right to Restrict Processing: Limit how we use your data',
      'Right to Object: Oppose our processing of your data',
      'Right to Automated Decision-Making: Not applicable (all decisions are human-reviewed)',
      'Right to Data Portability: Receive data in a portable format (e.g., JSON)',
      'Right to Withdraw Consent: Stop sharing future stories anytime',
      'Contact DPA: If you believe we have violated your rights, contact your national Data Protection Authority',
    ],
  },
  {
    title: 'Rights for California Residents (CCPA)',
    content: [
      'Right to Know: Request what personal information we collect, use, and share',
      'Right to Delete: Ask us to delete your personal information (with limited exceptions)',
      'Right to Opt-Out: We do not sell your personal information and never will. CCPA "Do Not Sell" does not apply.',
      'Right to Non-Discrimination: You will not be discriminated against for exercising your rights',
      'Right to Correct: Ask us to correct inaccurate personal information',
      'Authorized Agent: You can designate an authorized agent to submit requests on your behalf',
      'Response Time: We will respond to requests within 45 days',
    ],
  },
  {
    title: 'Canadian Residents (PIPEDA)',
    content: [
      'Right to Access: Request access to your personal information',
      'Right to Correction: Ask us to correct inaccurate information',
      'Right to Challenge: Challenge the accuracy and completeness of your information',
      'Right to Withdraw Consent: Withdraw consent for collection/use at any time',
      'Right to Complain: File a complaint with Privacy Commissioner of Canada if we mishandle your data',
      'No Sale of Data: Canadian law prohibits sale of personal information without consent',
    ],
  },
  {
    title: 'Data Retention',
    content: [
      'Published Stories: Retained indefinitely until you request deletion',
      'Submission Queue (pending moderation): Deleted after 90 days if not published',
      'Rejected Submissions: Deleted immediately after rejection notification',
      'Deletion Requests: Upon your request, content is removed from public view within 24 hours. Deleted from all backups within 90 days.',
      'Account Data: Deleted within 30 days of final deletion request',
      'Backups: Backups are deleted according to our backup retention policy (maximum 90 days)',
      'Legal Hold: Data may be retained longer if required by law or legal proceeding',
    ],
  },
  {
    title: 'Cookies & Tracking',
    content: [
      'No Tracking Cookies: We do not use cookies for tracking or analytics',
      'Local Storage: We use browser localStorage to remember your theme preference (dark/light mode). This is essential for functionality.',
      'Third-Party Tracking: We do not allow third parties to set tracking cookies',
      'Browser Privacy Features: Your browser\'s "Do Not Track" settings are respected',
      'Privacy Tools: You can disable localStorage in your browser settings, though this will reset your theme preference',
    ],
  },
  {
    title: 'Changes to This Privacy Policy',
    content: [
      'Right to Update: We may update this policy at any time as needed to maintain compliance or improve clarity',
      'Notification: For significant changes affecting your rights, we will notify you via email or platform notification',
      'Effective Date: Changes take effect immediately upon posting unless stated otherwise',
      'Continued Use: Your continued use of the platform after changes means you accept the updated policy',
      'Archive: Previous versions of this policy are available upon request',
    ],
  },
  {
    title: 'How to Exercise Your Rights',
    content: [
      'Email: Send requests with "Privacy Request" in the subject line (see contact section for email address)',
      'Information Needed: Include your email/submission details and the specific right you want to exercise',
      'Verification: We may ask for verification of your identity to protect your privacy',
      'Response: We will respond within 30 days. Complex requests may take longer (up to 90 days) with notification',
      'No Fee: Exercising your rights is free. No charge unless request is manifestly unfounded.',
      'Appeal: If we deny your request, you can request an explanation or appeal',
    ],
  },
]

export default function PrivacyPageClient() {
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
              Privacy Policy
            </h1>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Your privacy is not negotiable. Here&apos;s exactly how we protect it (GDPR, CCPA, COPPA, PIPEDA compliant).
            </p>
            <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary mt-4">
              Effective Date: February 2026 | Last Updated: February 2026
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Policy Sections */}
      <section className="py-16">
        <Container maxWidth="content">
          <div className="space-y-8">
            {sections.map((section, idx) => (
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
                        <span className="text-rose-500 font-bold mt-0.5">•</span>
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

      {/* Contact */}
      <section className="py-16 bg-slate-50 dark:bg-dark-bg-secondary border-t border-rose-200 dark:border-dark-bg-tertiary transition-colors duration-200">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-white dark:bg-dark-bg-tertiary">
              <h2 className="font-display text-2xl text-text-primary dark:text-dark-text-primary mb-4">
                Questions about your privacy?
              </h2>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                We take privacy seriously and are happy to answer any questions.{' '}
                <Link href="/contact" className="text-rose-600 dark:text-rose-400 hover:underline font-medium">
                  Visit our Contact page
                </Link>{' '}
                for all contact options and response times.
              </p>
              <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary font-medium mb-2">
                ⚠️ This is a living document. We update it to maintain compliance with GDPR, CCPA, COPPA, and PIPEDA.
              </p>
              <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                Last updated: February 2026 | Version 1.1
              </p>
            </Card>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
