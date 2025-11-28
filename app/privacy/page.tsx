import Link from "next/link"
import { ArrowLeft, Shield, Lock, Eye, Server } from "lucide-react"

export default function PrivacyPolicyPage() {
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

        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="lead">
            At Proconnect, we value your privacy and are committed to protecting your personal data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-lg">
              <Shield className="h-8 w-8 text-sky-600 dark:text-sky-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Data Protection</h3>
              <p className="text-sm text-muted-foreground">
                We implement strong security measures to protect your personal information from unauthorized access.
              </p>
            </div>

            <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-lg">
              <Lock className="h-8 w-8 text-sky-600 dark:text-sky-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Encryption</h3>
              <p className="text-sm text-muted-foreground">
                All sensitive data is encrypted both in transit and at rest using industry-standard protocols.
              </p>
            </div>

            <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-lg">
              <Eye className="h-8 w-8 text-sky-600 dark:text-sky-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Transparency</h3>
              <p className="text-sm text-muted-foreground">
                We're transparent about what data we collect and how we use it to provide our services.
              </p>
            </div>

            <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-lg">
              <Server className="h-8 w-8 text-sky-600 dark:text-sky-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Data Minimization</h3>
              <p className="text-sm text-muted-foreground">
                We only collect the data necessary to provide and improve our services.
              </p>
            </div>
          </div>

          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you:</p>
          <ul>
            <li>Create an account and set up your profile</li>
            <li>Use our platform features and services</li>
            <li>Communicate with other users</li>
            <li>Participate in surveys, contests, or promotions</li>
            <li>Contact our support team</li>
          </ul>

          <h3>1.1 Personal Information</h3>
          <p>
            This may include your name, email address, phone number, profile picture, professional background, skills,
            and other information you choose to provide.
          </p>

          <h3>1.2 Usage Information</h3>
          <p>We collect information about how you use our platform, including:</p>
          <ul>
            <li>Log data (IP address, browser type, pages visited, time spent)</li>
            <li>Device information (hardware model, operating system)</li>
            <li>Location information (with your consent)</li>
            <li>Cookies and similar technologies</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Create and maintain your account</li>
            <li>Process transactions</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Personalize your experience</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, prevent, and address technical issues</li>
            <li>Protect against harmful or illegal activity</li>
          </ul>

          <h2>3. Data Sharing and Disclosure</h2>
          <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
          <ul>
            <li>With your consent</li>
            <li>With service providers who perform services on our behalf</li>
            <li>To comply with legal obligations</li>
            <li>In connection with a merger, sale, or acquisition</li>
          </ul>

          <h2>4. Your Rights and Choices</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate or incomplete information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction or objection to processing</li>
            <li>Data portability</li>
            <li>Withdrawal of consent</li>
          </ul>

          <h2>5. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide our services and fulfill the
            purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
          </p>

          <h2>6. International Data Transfers</h2>
          <p>
            Your information may be transferred to, and processed in, countries other than the country in which you
            reside. These countries may have data protection laws that are different from the laws of your country.
          </p>

          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a
              href="mailto:privacy@proconnect.com"
              className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
            >
              privacy@proconnect.com
            </a>
            .
          </p>

          <p className="text-sm text-muted-foreground mt-8">Last updated: May 15, 2023</p>
        </div>
      </div>
    </div>
  )
}
