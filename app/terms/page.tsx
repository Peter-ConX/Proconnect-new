import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl py-12 px-4">
        <Link
          href="/auth"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>

        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="lead">
            Welcome to Proconnect. These Terms of Service govern your use of our platform and services.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Proconnect, you agree to be bound by these Terms of Service. If you do not agree to
            all the terms and conditions, you may not access or use our services.
          </p>

          <h2>2. User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate, complete, and current information. You are
            responsible for safeguarding your password and for all activities that occur under your account.
          </p>

          <h2>3. Data Protection and Privacy</h2>
          <p>
            We take data protection seriously. Your personal information is collected, stored, and processed in
            accordance with our{" "}
            <Link href="/privacy" className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300">
              Privacy Policy
            </Link>
            .
          </p>

          <h3>3.1 Data Security</h3>
          <p>
            We implement appropriate technical and organizational measures to ensure a level of security appropriate to
            the risk, including:
          </p>
          <ul>
            <li>Encryption of personal data during transmission and at rest</li>
            <li>Regular testing and evaluation of security measures</li>
            <li>Ability to ensure ongoing confidentiality, integrity, and availability of processing systems</li>
            <li>Process for regularly testing, assessing, and evaluating security measures</li>
          </ul>

          <h2>4. User Content</h2>
          <p>
            You retain ownership of any content you post on Proconnect. By posting content, you grant us a
            non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, modify, publicly
            display, and distribute such content on our platform.
          </p>

          <h2>5. Prohibited Activities</h2>
          <p>You agree not to engage in any of the following prohibited activities:</p>
          <ul>
            <li>Violating any laws or regulations</li>
            <li>Impersonating another person or entity</li>
            <li>Posting content that is defamatory, obscene, or otherwise objectionable</li>
            <li>Attempting to interfere with the proper functioning of the platform</li>
            <li>Engaging in any activity that could disable, overburden, or impair the platform</li>
          </ul>

          <h2>6. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to our services at our sole discretion,
            without notice, for conduct that we believe violates these Terms of Service or is harmful to other users,
            us, or third parties, or for any other reason.
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            We may revise these Terms of Service from time to time. The most current version will always be posted on
            our website. By continuing to access or use our services after revisions become effective, you agree to be
            bound by the revised terms.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at{" "}
            <a
              href="mailto:legal@proconnect.com"
              className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
            >
              legal@proconnect.com
            </a>
            .
          </p>

          <p className="text-sm text-muted-foreground mt-8">Last updated: May 15, 2023</p>
        </div>
      </div>
    </div>
  )
}
