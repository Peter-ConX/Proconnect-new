"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check } from "lucide-react"
import { AvatarUploadModal } from "@/components/modals/avatar-upload-modal"

const ACCOUNT_TIERS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Get started with Proconnect",
    features: ["Up to 3 projects", "Basic profile", "Community access", "Limited collaborators"],
    current: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "Perfect for professionals",
    features: [
      "Unlimited projects",
      "Advanced profile",
      "Priority support",
      "Up to 10 collaborators",
      "Analytics dashboard",
      "Custom branding",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    description: "For large teams",
    features: [
      "Everything in Pro",
      "Team management",
      "SSO & security",
      "Unlimited collaborators",
      "Dedicated support",
      "Custom integrations",
    ],
  },
]

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState("/images/profile-picture.jpeg")
  const [currentTier, setCurrentTier] = useState("free")

  const handleAvatarUpload = async (file: File) => {
    // In a real app, this would upload to a server
    const reader = new FileReader()
    reader.onload = (e) => {
      setProfileImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleUpgradeTier = (tierId: string) => {
    setCurrentTier(tierId)
    alert(`Upgraded to ${ACCOUNT_TIERS.find((t) => t.id === tierId)?.name} plan!`)
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your account and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your profile photo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback className="bg-sky-700 text-white text-xl">OC</AvatarFallback>
                </Avatar>
                <AvatarUploadModal currentImage={profileImage} onUpload={handleAvatarUpload}>
                  <Button className="bg-sky-500 hover:bg-sky-600">Change Picture</Button>
                </AvatarUploadModal>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Okafor Chidera"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    defaultValue="okafor@proconnect.com"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <textarea
                    defaultValue="Founder, C.E.O of Proconnect"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-24"
                  />
                </div>
                <Button className="bg-sky-500 hover:bg-sky-600">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="space-y-4">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Choose Your Plan</h2>
                <p className="text-gray-600 dark:text-gray-400">Upgrade to unlock more features</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ACCOUNT_TIERS.map((tier) => (
                  <Card
                    key={tier.id}
                    className={`relative transition-all ${
                      currentTier === tier.id ? "border-orange-500 shadow-lg" : "hover:shadow-md"
                    }`}
                  >
                    {currentTier === tier.id && (
                      <div className="absolute -top-3 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Current Plan
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">{tier.price}</span>
                        {tier.period && <span className="text-sm text-gray-500">{tier.period}</span>}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {currentTier === tier.id ? (
                        <Button disabled className="w-full">
                          Current Plan
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleUpgradeTier(tier.id)}
                          className="w-full bg-sky-500 hover:bg-sky-600"
                        >
                          {tier.id === "free" ? "Downgrade" : "Upgrade"}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Preferences</CardTitle>
                <CardDescription>Manage your email notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="flex items-center gap-3 p-3 rounded border border-border cursor-pointer hover:bg-muted/50">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <div>
                    <p className="font-medium">Project Updates</p>
                    <p className="text-sm text-gray-500">Get notified about project progress</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded border border-border cursor-pointer hover:bg-muted/50">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <div>
                    <p className="font-medium">Collaborator Invites</p>
                    <p className="text-sm text-gray-500">Receive team collaboration requests</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded border border-border cursor-pointer hover:bg-muted/50">
                  <input type="checkbox" className="w-4 h-4" />
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-gray-500">Learn about new features and updates</p>
                  </div>
                </label>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
