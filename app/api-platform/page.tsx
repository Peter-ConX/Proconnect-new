"use client"

import { useState } from "react"
import { Code, Key, Zap, Shield, Globe, Copy, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock API data
const apiEndpoints = [
  {
    method: "GET",
    endpoint: "/api/v1/users",
    description: "Retrieve user profiles and information",
    parameters: ["limit", "offset", "skills", "location"],
    response: "User objects with profile data",
  },
  {
    method: "POST",
    endpoint: "/api/v1/projects",
    description: "Create a new collaborative project",
    parameters: ["title", "description", "skills_required", "team_size"],
    response: "Created project object",
  },
  {
    method: "GET",
    endpoint: "/api/v1/skills/assessments",
    description: "Get available skill assessments",
    parameters: ["category", "difficulty", "duration"],
    response: "Array of assessment objects",
  },
  {
    method: "POST",
    endpoint: "/api/v1/connections",
    description: "Send connection request to another user",
    parameters: ["user_id", "message"],
    response: "Connection request status",
  },
]

const sdkExamples = [
  {
    language: "JavaScript",
    code: `import { ProconnectAPI } from '@proconnect/sdk';

const client = new ProconnectAPI({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Get user profile
const user = await client.users.get('user-id');

// Create a project
const project = await client.projects.create({
  title: 'AI-Powered Dashboard',
  description: 'Building an analytics dashboard',
  skills_required: ['React', 'Python', 'Data Science']
});`,
  },
  {
    language: "Python",
    code: `from proconnect import ProconnectClient

client = ProconnectClient(
    api_key='your-api-key',
    environment='production'
)

# Get user profile
user = client.users.get('user-id')

# Create a project
project = client.projects.create(
    title='AI-Powered Dashboard',
    description='Building an analytics dashboard',
    skills_required=['React', 'Python', 'Data Science']
)`,
  },
  {
    language: "cURL",
    code: `# Get user profile
curl -X GET "https://api.proconnect.com/v1/users/user-id" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json"

# Create a project
curl -X POST "https://api.proconnect.com/v1/projects" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "AI-Powered Dashboard",
    "description": "Building an analytics dashboard",
    "skills_required": ["React", "Python", "Data Science"]
  }'`,
  },
]

export default function APIPlatformPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, language: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(language)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Proconnect API Platform</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Build powerful integrations and applications on top of Proconnect's professional networking platform
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="endpoints">API Reference</TabsTrigger>
            <TabsTrigger value="sdks">SDKs</TabsTrigger>
            <TabsTrigger value="authentication">Auth</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                  </div>
                  <CardTitle>Fast & Reliable</CardTitle>
                  <CardDescription>
                    99.9% uptime with global CDN and optimized response times under 100ms
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Secure by Default</CardTitle>
                  <CardDescription>
                    Enterprise-grade security with OAuth 2.0, rate limiting, and data encryption
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Global Scale</CardTitle>
                  <CardDescription>
                    Deployed across multiple regions with automatic scaling and load balancing
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Quick Start */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>Get started with the Proconnect API in minutes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      1
                    </div>
                    <h3 className="font-medium mb-1">Get API Key</h3>
                    <p className="text-sm text-gray-500">Sign up and generate your API key</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      2
                    </div>
                    <h3 className="font-medium mb-1">Install SDK</h3>
                    <p className="text-sm text-gray-500">Choose your preferred language SDK</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                      3
                    </div>
                    <h3 className="font-medium mb-1">Make Requests</h3>
                    <p className="text-sm text-gray-500">Start building your integration</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-6">
            <div className="space-y-4">
              {apiEndpoints.map((endpoint, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          endpoint.method === "GET"
                            ? "bg-green-100 text-green-800"
                            : endpoint.method === "POST"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-orange-100 text-orange-800"
                        }
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {endpoint.endpoint}
                      </code>
                    </div>
                    <CardDescription>{endpoint.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Parameters</h4>
                        <div className="space-y-1">
                          {endpoint.parameters.map((param, i) => (
                            <code key={i} className="block text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {param}
                            </code>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Response</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{endpoint.response}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sdks" className="space-y-6">
            <div className="space-y-6">
              {sdkExamples.map((example, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        {example.language}
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(example.code, example.language)}
                      >
                        {copiedCode === example.language ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm">{example.code}</code>
                    </pre>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="authentication" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Authentication
                </CardTitle>
                <CardDescription>Secure your API requests with proper authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="api-key">Your API Key</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="api-key"
                      type="password"
                      value="pk_live_1234567890abcdef"
                      readOnly
                      className="font-mono"
                    />
                    <Button variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-400 mb-2">Security Best Practices</h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>• Never expose your API key in client-side code</li>
                    <li>• Use environment variables to store your API key</li>
                    <li>• Rotate your API keys regularly</li>
                    <li>• Use different keys for development and production</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Webhook Events</CardTitle>
                <CardDescription>Receive real-time notifications when events occur in your application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { event: "user.connected", description: "When a user accepts a connection request" },
                    { event: "project.created", description: "When a new project is created" },
                    { event: "skill.assessed", description: "When a user completes a skill assessment" },
                    { event: "message.received", description: "When a user receives a new message" },
                  ].map((webhook, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {webhook.event}
                        </code>
                        <p className="text-sm text-gray-500 mt-1">{webhook.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
