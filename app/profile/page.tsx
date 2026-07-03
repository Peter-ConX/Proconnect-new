"use client"

import { useState, useEffect } from "react"
import { VerifiedBadge } from "@/components/verified-badge"
import {
  MapPin,
  UserPlus,
  ThumbsUp,
  MessageSquare,
  Briefcase,
  Award,
  Users,
  Lightbulb,
  Calendar,
  LinkIcon,
  Edit,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AvatarUploadModal } from "@/components/modals/avatar-upload-modal"
import { MenteeRegistrationModal } from "@/components/modals/mentee-registration-modal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

// Mock data for the profile
const profileData = {
  name: "Okafor Chidera",
  profession: "Founder, C.E.O of Proconnect",
  location: "Lagos, Nigeria",
  bio: "Passionate about connecting professionals and creating opportunities for growth. Building Proconnect to revolutionize how professionals collaborate and showcase their expertise.",
  skills: ["Leadership", "Product Strategy", "UX Design", "Frontend Development", "Business Development"],
  stats: {
    projects: 24,
    endorsements: 312,
    connections: 1248,
    missions: 18,
  },
  workHistory: [
    {
      company: "Proconnect",
      position: "Founder & CEO",
      startDate: "2022",
      endDate: "Present",
      description: "Leading product strategy and business development",
    },
    {
      company: "TechStart Inc.",
      position: "Senior Product Manager",
      startDate: "2020",
      endDate: "2022",
      description: "Managed product roadmap and cross-functional teams",
    },
  ],
  education: [
    {
      institution: "Stanford University",
      degree: "BS in Computer Science",
      year: "2018",
    },
  ],
  certifications: [
    {
      name: "Certified Product Manager",
      issuer: "Product Management Institute",
      year: "2021",
      verified: true,
    },
    {
      name: "UX Design Certification",
      issuer: "Google",
      year: "2020",
      verified: true,
    },
  ],
  socialLinks: {
    github: "github.com/okaforchidera",
    linkedin: "linkedin.com/in/okaforchidera",
    twitter: "twitter.com/okaforchidera",
    website: "proconnect.com",
  },
}

// Mock data for other users' profiles
const otherUsersData: Record<string, typeof profileData> = {
  alexmorgan: {
    name: "Alex Morgan",
    profession: "Senior UX Designer at DesignHub",
    location: "San Francisco, CA",
    bio: "Passionate about creating intuitive user interfaces and scalability. 10+ years experience in fintech and SaaS projects.",
    skills: ["UI/UX", "Figma", "User Research", "Design Systems"],
    stats: { projects: 12, endorsements: 342, connections: 890, missions: 5 },
    workHistory: [
      {
        company: "DesignHub",
        position: "Senior UX Designer",
        startDate: "2021",
        endDate: "Present",
        description: "Lead UX strategy for client apps"
      }
    ],
    education: [
      {
        institution: "UC Berkeley",
        degree: "BA in Cognitive Science",
        year: "2015"
      }
    ],
    certifications: [
      {
        name: "Human-Computer Interaction",
        issuer: "Coursera",
        year: "2017",
        verified: true
      }
    ],
    socialLinks: {
      github: "github.com/alexmorgan",
      linkedin: "linkedin.com/in/alexmorgan",
      twitter: "twitter.com/alexmorgan",
      website: "alexmorgan.design"
    }
  },
  sarahchen: {
    name: "Sarah Chen",
    profession: "Frontend Architect at TechCorp",
    location: "Seattle, WA",
    bio: "Specializing in React, Next.js, and web performance optimization. Open source contributor.",
    skills: ["React", "TypeScript", "Next.js", "Web Performance"],
    stats: { projects: 18, endorsements: 287, connections: 750, missions: 12 },
    workHistory: [
      {
        company: "TechCorp",
        position: "Frontend Architect",
        startDate: "2020",
        endDate: "Present",
        description: "Design next-gen web platform architecture"
      }
    ],
    education: [
      {
        institution: "MIT",
        degree: "BS in Computer Science",
        year: "2018"
      }
    ],
    certifications: [
      {
        name: "React Advanced Certification",
        issuer: "TechCorp",
        year: "2020",
        verified: true
      }
    ],
    socialLinks: {
      github: "github.com/sarahchen",
      linkedin: "linkedin.com/in/sarahchen",
      twitter: "twitter.com/sarahchen",
      website: "sarahchen.dev"
    }
  },
  davidkim: {
    name: "David Kim",
    profession: "Product Manager at TechStart",
    location: "New York, NY",
    bio: "Bridging the gap between design and engineering to build product experiences that users love.",
    skills: ["Product Strategy", "Agile", "Analytics", "Roadmapping"],
    stats: { projects: 8, endorsements: 412, connections: 920, missions: 4 },
    workHistory: [
      {
        company: "TechStart",
        position: "Product Manager",
        startDate: "2022",
        endDate: "Present",
        description: "Manage product strategy and user feedback loops"
      }
    ],
    education: [
      {
        institution: "NYU",
        degree: "MBA",
        year: "2021"
      }
    ],
    certifications: [
      {
        name: "Agile Product Owner",
        issuer: "Scrum Alliance",
        year: "2019",
        verified: true
      }
    ],
    socialLinks: {
      github: "github.com/davidkim",
      linkedin: "linkedin.com/in/davidkim",
      twitter: "twitter.com/davidkim",
      website: "davidkim.product"
    }
  },
  emmawilson: {
    name: "Emma Wilson",
    profession: "Data Scientist at AI Research Lab",
    location: "Boston, MA",
    bio: "Machine learning engineer exploring data patterns. Developing predictive algorithms.",
    skills: ["Python", "Machine Learning", "Data Visualization", "SQL"],
    stats: { projects: 15, endorsements: 256, connections: 512, missions: 9 },
    workHistory: [
      {
        company: "AI Research Lab",
        position: "Data Scientist",
        startDate: "2021",
        endDate: "Present",
        description: "Train neural networks and analyze unstructured data"
      }
    ],
    education: [
      {
        institution: "Harvard University",
        degree: "MS in Data Science",
        year: "2020"
      }
    ],
    certifications: [
      {
        name: "Machine Learning Specialist",
        issuer: "Stanford Online",
        year: "2021",
        verified: true
      }
    ],
    socialLinks: {
      github: "github.com/emmawilson",
      linkedin: "linkedin.com/in/emmawilson",
      twitter: "twitter.com/emmawilson",
      website: "emmawilson.ai"
    }
  }
}


// Mock data for showcase projects
const showcaseProjects = [
  {
    id: "1",
    title: "Proconnect Platform",
    thumbnail: "/placeholder.svg?height=200&width=400&text=Proconnect",
    description: "A professional networking platform designed to connect experts across industries.",
    skills: ["React", "Next.js", "UI/UX", "TypeScript"],
    endorsements: 156,
  },
  {
    id: "2",
    title: "AI-Powered Skill Matching",
    thumbnail: "/placeholder.svg?height=200&width=400&text=AI+Matching",
    description: "Algorithm that matches professionals based on complementary skills and project needs.",
    skills: ["Machine Learning", "Python", "Data Science"],
    endorsements: 89,
  },
  {
    id: "3",
    title: "Proconnect Mobile App",
    thumbnail: "/placeholder.svg?height=200&width=400&text=Mobile+App",
    description:
      "Native mobile application for iOS and Android that brings the Proconnect experience to mobile devices.",
    skills: ["React Native", "Mobile Design", "Cross-platform"],
    endorsements: 67,
  },
]

// Mock data for completed missions
const completedMissions = [
  {
    id: "1",
    title: "Launch MVP Platform",
    difficulty: "Expert",
    xp: 500,
    badge: "Founder",
    completedDate: "Jan 15, 2023",
  },
  {
    id: "2",
    title: "Secure Seed Funding",
    difficulty: "Expert",
    xp: 450,
    badge: "Entrepreneur",
    completedDate: "Mar 22, 2023",
  },
  {
    id: "3",
    title: "Reach 1000 Users",
    difficulty: "Advanced",
    xp: 350,
    badge: "Growth Hacker",
    completedDate: "May 10, 2023",
  },
  {
    id: "4",
    title: "Implement AI Recommendations",
    difficulty: "Advanced",
    xp: 300,
    badge: "Innovator",
    completedDate: "Jul 5, 2023",
  },
]

// Mock data for collaborations
const collaborations = [
  {
    id: "1",
    title: "Proconnect Design System",
    status: "Completed",
    members: [
      { name: "Alex Morgan", avatar: "/placeholder.svg?height=40&width=40&text=AM" },
      { name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40&text=SC" },
      { name: "David Kim", avatar: "/placeholder.svg?height=40&width=40&text=DK" },
    ],
    role: "Project Lead",
    completedDate: "Apr 18, 2023",
  },
  {
    id: "2",
    title: "User Onboarding Optimization",
    status: "Active",
    members: [
      { name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40&text=EW" },
      { name: "Michael Rodriguez", avatar: "/placeholder.svg?height=40&width=40&text=MR" },
    ],
    role: "UX Advisor",
    progress: 75,
  },
  {
    id: "3",
    title: "Enterprise Client Portal",
    status: "Active",
    members: [
      { name: "Lisa Johnson", avatar: "/placeholder.svg?height=40&width=40&text=LJ" },
      { name: "Mark Williams", avatar: "/placeholder.svg?height=40&width=40&text=MW" },
      { name: "Sophia Garcia", avatar: "/placeholder.svg?height=40&width=40&text=SG" },
    ],
    role: "Product Strategist",
    progress: 40,
  },
]

// Mock data for mentorships
const mentorships = [
  {
    id: "1",
    mentee: {
      name: "Alex Morgan",
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
      role: "Senior UX Designer",
    },
    focus: "Product Leadership",
    startDate: "Feb 10, 2023",
    duration: "6 months",
    status: "Active",
  },
  {
    id: "2",
    mentee: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      role: "Frontend Architect",
    },
    focus: "Startup Growth",
    startDate: "Mar 5, 2023",
    duration: "6 months",
    status: "Active",
  },
  {
    id: "3",
    mentee: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40&text=DK",
      role: "Product Manager",
    },
    focus: "Career Transition to Product",
    startDate: "Jan 15, 2023",
    duration: "3 months",
    status: "Completed",
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("showcase")
  const [profile, setProfile] = useState<typeof profileData | null>(null)
  const [profileImage, setProfileImage] = useState("/images/profile-picture.jpeg")
  const [isCurrentUser, setIsCurrentUser] = useState(true)

  // Dialog open/close states
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isMessageOpen, setIsMessageOpen] = useState(false)
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [isMentorshipOpen, setIsMentorshipOpen] = useState(false)

  // Form states
  const [editName, setEditName] = useState("")
  const [editProfession, setEditProfession] = useState("")
  const [editLocation, setEditLocation] = useState("")
  const [editBio, setEditBio] = useState("")
  const [editSkills, setEditSkills] = useState("")
  const [editGithub, setEditGithub] = useState("")
  const [editLinkedin, setEditLinkedin] = useState("")
  const [editTwitter, setEditTwitter] = useState("")
  const [editWebsite, setEditWebsite] = useState("")

  const [messageSubject, setMessageSubject] = useState("")
  const [messageText, setMessageText] = useState("")
  
  const [inviteProject, setInviteProject] = useState("")
  const [inviteRole, setInviteRole] = useState("")

  useEffect(() => {
    // Client-side execution
    const searchParams = new URLSearchParams(window.location.search)
    const username = searchParams.get("username")

    if (username && otherUsersData[username]) {
      const data = otherUsersData[username]
      setProfile(data)
      setProfileImage(username === "alexmorgan" ? "/placeholder.svg?height=128&width=128&text=AM" : 
                       username === "sarahchen" ? "/placeholder.svg?height=128&width=128&text=SC" : 
                       username === "davidkim" ? "/placeholder.svg?height=128&width=128&text=DK" : 
                       "/placeholder.svg?height=128&width=128&text=EW")
      setIsCurrentUser(false)
    } else {
      const savedProfile = localStorage.getItem("proconnect_profile")
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile)
          setProfile(parsed)
          setProfileImage(parsed.avatar || "/images/profile-picture.jpeg")
        } catch {
          setProfile(profileData)
        }
      } else {
        setProfile(profileData)
        localStorage.setItem("proconnect_profile", JSON.stringify(profileData))
      }
      setIsCurrentUser(true)
    }
  }, [])

  // Initialize edit forms when profile loads
  useEffect(() => {
    if (profile && isCurrentUser) {
      setEditName(profile.name)
      setEditProfession(profile.profession)
      setEditLocation(profile.location)
      setEditBio(profile.bio)
      setEditSkills(profile.skills.join(", "))
      setEditGithub(profile.socialLinks.github)
      setEditLinkedin(profile.socialLinks.linkedin)
      setEditTwitter(profile.socialLinks.twitter)
      setEditWebsite(profile.socialLinks.website)
    }
  }, [profile, isCurrentUser])

  if (!profile) {
    return (
      <div className="pt-20 text-center text-gray-500">
        Loading profile...
      </div>
    )
  }

  const handleAvatarUpload = async (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      setProfileImage(base64)
      
      if (isCurrentUser && profile) {
        const updated = { ...profile, avatar: base64 }
        setProfile(updated)
        localStorage.setItem("proconnect_profile", JSON.stringify(updated))
        toast.success("Profile picture updated successfully!")
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    const updated = {
      ...profile,
      name: editName,
      profession: editProfession,
      location: editLocation,
      bio: editBio,
      skills: editSkills.split(",").map((s) => s.trim()).filter(Boolean),
      socialLinks: {
        github: editGithub,
        linkedin: editLinkedin,
        twitter: editTwitter,
        website: editWebsite,
      }
    }

    setProfile(updated)
    localStorage.setItem("proconnect_profile", JSON.stringify(updated))
    setIsEditOpen(false)
    toast.success("Profile details updated successfully!")
  }

  const handleEndorse = () => {
    if (!profile) return
    const updated = {
      ...profile,
      stats: {
        ...profile.stats,
        endorsements: profile.stats.endorsements + 1,
      }
    }
    setProfile(updated)
    if (isCurrentUser) {
      localStorage.setItem("proconnect_profile", JSON.stringify(updated))
    }
    toast.success(`You endorsed ${profile.name} for their skills!`)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim()) return

    // Save message to inbox simulation
    const savedMessages = localStorage.getItem("proconnect_messages")
    const list = savedMessages ? JSON.parse(savedMessages) : []
    const newMessage = {
      id: String(Date.now()),
      sender: {
        name: profile.name,
        avatar: profileImage,
        role: profile.profession,
        email: `${profile.name.toLowerCase().replace(" ", "")}@example.com`,
      },
      recipients: ["you@example.com"],
      subject: messageSubject || "No Subject",
      preview: messageText.substring(0, 60) + "...",
      content: `<p>${messageText}</p>`,
      date: "Just now",
      isRead: false,
      isStarred: false,
      folder: "inbox",
    }
    list.unshift(newMessage)
    localStorage.setItem("proconnect_messages", JSON.stringify(list))

    setIsMessageOpen(false)
    setMessageSubject("")
    setMessageText("")
    toast.success(`Message sent to ${profile.name}!`)
  }

  const handleInviteProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteProject) {
      toast.error("Please select a project.")
      return
    }
    setIsInviteOpen(false)
    setInviteProject("")
    setInviteRole("")
    toast.success(`Invitation to join "${inviteProject}" sent to ${profile.name}!`)
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container px-4 mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-sky-400 to-sky-600 relative">
            {isCurrentUser && (
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
                  onClick={() => setIsEditOpen(true)}
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit Profile</span>
                </Button>
                <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Profile Details</DialogTitle>
                    <DialogDescription>Update your professional information seen on your profile banner.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Full Name</Label>
                      <Input id="edit-name" value={editName} onChange={(e) => setEditName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-profession">Profession / Title</Label>
                      <Input id="edit-profession" value={editProfession} onChange={(e) => setEditProfession(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-location">Location</Label>
                      <Input id="edit-location" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-bio">Bio</Label>
                      <Textarea id="edit-bio" rows={3} value={editBio} onChange={(e) => setEditBio(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-skills">Skills (comma separated)</Label>
                      <Input id="edit-skills" value={editSkills} onChange={(e) => setEditSkills(e.target.value)} placeholder="e.g. Leadership, React, Python" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-github">GitHub Username</Label>
                        <Input id="edit-github" value={editGithub} onChange={(e) => setEditGithub(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-linkedin">LinkedIn Username</Label>
                        <Input id="edit-linkedin" value={editLinkedin} onChange={(e) => setEditLinkedin(e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-twitter">Twitter Handle</Label>
                        <Input id="edit-twitter" value={editTwitter} onChange={(e) => setEditTwitter(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-website">Website URL</Label>
                        <Input id="edit-website" value={editWebsite} onChange={(e) => setEditWebsite(e.target.value)} />
                      </div>
                    </div>
                    <DialogFooter className="mt-4">
                      <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                      <Button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white">Save Changes</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div className="px-6 pb-6 relative">
            <div className="absolute -top-16 left-6">
              <div className="relative w-32 h-32 group">
                <Avatar className="w-full h-full border-4 border-white dark:border-gray-800 shadow-md">
                  <AvatarImage src={profileImage || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback className="bg-sky-700 text-white text-2xl">
                    {profile.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {isCurrentUser && (
                  <AvatarUploadModal currentImage={profileImage} onUpload={handleAvatarUpload}>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Edit className="h-5 w-5 text-white" />
                    </div>
                  </AvatarUploadModal>
                )}
              </div>
            </div>

            <div className="ml-36 pt-4 md:flex md:justify-between md:items-start">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-1.5">
                  {profile.name}
                  {["Alex Morgan", "Sarah Chen", "David Kim", "Emma Wilson", "John Doe", "Jane Smith", "David Lee"].includes(profile.name) && (
                    <VerifiedBadge className="h-5 w-5 bg-transparent text-[#0095f6]" />
                  )}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{profile.profession}</p>
                <div className="flex items-center gap-2 mt-1 text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
              </div>

              {!isCurrentUser && (
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
                    <Button className="bg-sky-500 hover:bg-sky-600 text-white" onClick={() => setIsMessageOpen(true)}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Send Message to {profile.name}</DialogTitle>
                        <DialogDescription>Compose a direct message. It will be sent to their mock inbox.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSendMessage} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="msg-subject">Subject</Label>
                          <Input id="msg-subject" placeholder="Subject..." value={messageSubject} onChange={(e) => setMessageSubject(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="msg-text">Message</Label>
                          <Textarea id="msg-text" placeholder="Write your message here..." value={messageText} onChange={(e) => setMessageText(e.target.value)} required rows={4} />
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setIsMessageOpen(false)}>Cancel</Button>
                          <Button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white">Send Message</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                    <Button variant="outline" onClick={() => setIsInviteOpen(true)}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite to Project
                    </Button>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Invite to Project</DialogTitle>
                        <DialogDescription>Invite {profile.name} to collaborate on one of your active projects.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleInviteProject} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="invite-proj">Select Project</Label>
                          <select
                            id="invite-proj"
                            className="w-full border rounded-md p-2 bg-background text-foreground"
                            value={inviteProject}
                            onChange={(e) => setInviteProject(e.target.value)}
                            required
                          >
                            <option value="">-- Choose a Project --</option>
                            <option value="Proconnect Platform Redesign">Proconnect Platform Redesign</option>
                            <option value="Mobile App Development">Mobile App Development</option>
                            <option value="AI Recommendation Engine">AI Recommendation Engine</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="invite-role">Proposed Role</Label>
                          <Input id="invite-role" placeholder="e.g. Frontend Developer, Designer" value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} />
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
                          <Button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white">Send Invitation</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" onClick={handleEndorse}>
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Endorse
                  </Button>

                  <Button variant="outline" onClick={() => setIsMentorshipOpen(true)}>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Request Mentorship
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-6">
              <p className="text-gray-700 dark:text-gray-300">{profile.bio}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">{profile.stats.projects}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Projects</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">{profile.stats.endorsements}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Endorsements</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">{profile.stats.connections}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Connections</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">{profile.stats.missions}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Missions</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
                {profile.socialLinks.github && (
                  <a
                    href={`https://${profile.socialLinks.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Github className="h-5 w-5" />
                    <span className="text-sm">{profile.socialLinks.github}</span>
                  </a>
                )}
                {profile.socialLinks.linkedin && (
                  <a
                    href={`https://${profile.socialLinks.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="text-sm">{profile.socialLinks.linkedin}</span>
                  </a>
                )}
                {profile.socialLinks.twitter && (
                  <a
                    href={`https://${profile.socialLinks.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="text-sm">{profile.socialLinks.twitter}</span>
                  </a>
                )}
                {profile.socialLinks.website && (
                  <a
                    href={`https://${profile.socialLinks.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <LinkIcon className="h-5 w-5" />
                    <span className="text-sm">{profile.socialLinks.website}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="showcase" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800">
            <TabsTrigger value="showcase" className="flex-1">
              <Briefcase className="mr-2 h-4 w-4" />
              Showcase
            </TabsTrigger>
            <TabsTrigger value="missions" className="flex-1">
              <Award className="mr-2 h-4 w-4" />
              Missions Completed
            </TabsTrigger>
            <TabsTrigger value="collabs" className="flex-1">
              <Users className="mr-2 h-4 w-4" />
              Collabs
            </TabsTrigger>
            <TabsTrigger value="mentorships" className="flex-1">
              <Lightbulb className="mr-2 h-4 w-4" />
              Mentorships
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex-1">
              <Briefcase className="mr-2 h-4 w-4" />
              Experience
            </TabsTrigger>
          </TabsList>

          <TabsContent value="showcase" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {showcaseProjects.map((project) => (
                <Card
                  key={project.id}
                  className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.thumbnail || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-sky-500 text-sky-600 dark:text-sky-400">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-1 text-gray-600">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{project.endorsements} endorsements</span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <ExternalLink className="h-4 w-4" />
                      <span>View</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="missions" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedMissions.map((mission) => (
                <Card key={mission.id} className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{mission.title}</CardTitle>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Completed
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="border-orange-500 text-orange-600">
                        {mission.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        <Calendar className="inline-block mr-1 h-3 w-3" />
                        {mission.completedDate}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-orange-500" />
                        <span className="font-medium">{mission.badge} Badge</span>
                      </div>
                      <div className="text-sm font-medium text-sky-600 dark:text-sky-400">+{mission.xp} XP</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collabs" className="mt-6">
            <div className="space-y-6">
              {collaborations.map((collab) => (
                <Card key={collab.id} className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{collab.title}</CardTitle>
                      <Badge
                        className={
                          collab.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
                        }
                      >
                        {collab.status}
                      </Badge>
                    </div>
                    <CardDescription>Role: {collab.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Team Members:</p>
                      <div className="flex -space-x-2">
                        {collab.members.map((member, index) => (
                          <Avatar key={index} className="border-2 border-white dark:border-gray-800">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback className="bg-sky-700 text-white">{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>

                    {collab.status === "Active" && collab.progress && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{collab.progress}%</span>
                        </div>
                        <Progress value={collab.progress} className="h-2" />
                      </div>
                    )}

                    {collab.status === "Completed" && collab.completedDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>Completed on {collab.completedDate}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mentorships" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mentorships.map((mentorship) => (
                <Card key={mentorship.id} className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={mentorship.mentee.avatar || "/placeholder.svg"}
                            alt={mentorship.mentee.name}
                          />
                          <AvatarFallback className="bg-sky-700 text-white">
                            {mentorship.mentee.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{mentorship.mentee.name}</CardTitle>
                          <CardDescription>{mentorship.mentee.role}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        className={
                          mentorship.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
                        }
                      >
                        {mentorship.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-500">Focus:</span>
                        <p className="font-medium">{mentorship.focus}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Duration:</span>
                        <p className="font-medium">{mentorship.focus}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Started:</span>
                        <p className="font-medium">{mentorship.startDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experience" className="mt-6 space-y-6">
            {/* Work History */}
            <Card>
              <CardHeader>
                <CardTitle>Work History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.workHistory?.map((job: any, index: number) => (
                  <div key={index} className="border-l-4 border-teal-500 pl-4 py-2">
                    <h4 className="font-semibold text-lg">{job.position}</h4>
                    <p className="text-teal-600 dark:text-teal-400 font-medium">{job.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.startDate} - {job.endDate}
                    </p>
                    <p className="text-sm mt-2">{job.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.education?.map((edu: any, index: number) => (
                  <div key={index} className="border-l-4 border-amber-500 pl-4 py-2">
                    <h4 className="font-semibold text-lg">{edu.degree}</h4>
                    <p className="text-amber-600 dark:text-amber-400 font-medium">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.certifications?.map((cert: any, index: number) => (
                  <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground mt-1">{cert.year}</p>
                    </div>
                    {cert.verified && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        Verified
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <MenteeRegistrationModal
        isOpen={isMentorshipOpen}
        onClose={() => setIsMentorshipOpen(false)}
        mentor={{
          name: profile.name,
          expertise: profile.skills,
          title: profile.profession,
        }}
      />
    </div>
  )
}
