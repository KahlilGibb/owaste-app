"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Recycle,
  TrendingUp,
  Gift,
  History,
  Smartphone,
  Laptop,
  Battery,
  MapPin,
  Calendar,
  Award,
  Coins,
  Leaf,
} from "lucide-react"
import Link from "next/link"
import RewardRedemptionModal from "@/components/reward-redemption-modal"
import type { RewardItem } from "@/app/actions/stripe"
import { useState } from "react"

export default function DashboardPage() {
  const recentTransactions = [
    { id: 1, item: "iPhone 12", points: 120, date: "2024-01-15", status: "completed", icon: Smartphone },
    { id: 2, item: "MacBook Air", points: 350, date: "2024-01-12", status: "completed", icon: Laptop },
    { id: 3, item: "Power Bank", points: 25, date: "2024-01-10", status: "completed", icon: Battery },
    { id: 4, item: "iPad Pro", points: 180, date: "2024-01-08", status: "completed", icon: Smartphone },
  ]

  const achievements = [
    { title: "First Recycler", description: "Recycled your first device", earned: true },
    { title: "Green Warrior", description: "Recycled 10 devices", earned: true },
    { title: "Eco Champion", description: "Recycled 25 devices", earned: false },
    { title: "Planet Saver", description: "Recycled 50 devices", earned: false },
  ]

  const nearbyMachines = [
    { name: "Mall Plaza", distance: "0.5 km", status: "online", items: 12 },
    { name: "Tech Park", distance: "1.2 km", status: "online", items: 8 },
    { name: "City Center", distance: "2.1 km", status: "maintenance", items: 0 },
  ]

  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null)
  const [isRedemptionModalOpen, setIsRedemptionModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img src="/images/owaste-logo.jpeg" alt="O'Waste Logo" className="w-full h-full object-cover" />
            </div>
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
            >
              O'Waste
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/machine">Find Machine</Link>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Here's your recycling impact and rewards summary</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">1,247</div>
                <Coins className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-sm opacity-90 mt-2">+85 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Items Recycled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">23</div>
                <Recycle className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-sm opacity-90 mt-2">+3 this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">CO₂ Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">45kg</div>
                <Leaf className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-sm opacity-90 mt-2">Environmental impact</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">#127</div>
                <Award className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-sm opacity-90 mt-2">Top 15% recyclers</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="machines">Machines</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest recycling transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <transaction.icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.item}</p>
                            <p className="text-sm text-gray-600">{transaction.date}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700">+{transaction.points} pts</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Transactions
                  </Button>
                </CardContent>
              </Card>

              {/* Progress to Next Level */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Progress to Next Level
                  </CardTitle>
                  <CardDescription>Green Warrior → Eco Champion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Current Level: Green Warrior</span>
                        <span>1,247 / 2,000 points</span>
                      </div>
                      <Progress value={62} className="h-3" />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Next Level Benefits</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• 20% bonus points on all items</li>
                        <li>• Priority machine access</li>
                        <li>• Exclusive eco-friendly rewards</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements
                </CardTitle>
                <CardDescription>Your recycling milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${achievement.earned ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${achievement.earned ? "bg-green-500" : "bg-gray-300"}`}
                      >
                        <Award className={`w-6 h-6 ${achievement.earned ? "text-white" : "text-gray-500"}`} />
                      </div>
                      <h4 className="font-medium mb-1">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Complete history of your recycling activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <transaction.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.item}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {transaction.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-700 mb-2">+{transaction.points} points</Badge>
                        <p className="text-sm text-gray-600 capitalize">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Available Rewards
                </CardTitle>
                <CardDescription>Redeem your points for amazing rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4">
                    <div className="w-full h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                      <Coins className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="font-medium mb-2">₹500 Cash</h3>
                    <p className="text-sm text-gray-600 mb-4">Direct bank transfer</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">1000 points</Badge>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedReward({
                            id: "cash-500",
                            name: "₹500 Cash",
                            description: "Direct bank transfer",
                            pointsCost: 1000,
                            cashValue: 500,
                            type: "cash",
                          })
                          setIsRedemptionModalOpen(true)
                        }}
                      >
                        Redeem
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="w-full h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                      <Gift className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="font-medium mb-2">Amazon Voucher</h3>
                    <p className="text-sm text-gray-600 mb-4">₹1000 shopping voucher</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">1800 points</Badge>
                      <Button
                        size="sm"
                        variant={1247 >= 1800 ? "default" : "secondary"}
                        onClick={() => {
                          setSelectedReward({
                            id: "amazon-1000",
                            name: "Amazon Voucher",
                            description: "₹1000 shopping voucher",
                            pointsCost: 1800,
                            cashValue: 1000,
                            type: "voucher",
                          })
                          setIsRedemptionModalOpen(true)
                        }}
                      >
                        {1247 >= 1800 ? "Redeem" : "Need 553 more"}
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="w-full h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg mb-4 flex items-center justify-center">
                      <Leaf className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="font-medium mb-2">Plant a Tree</h3>
                    <p className="text-sm text-gray-600 mb-4">Contribute to reforestation</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">500 points</Badge>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedReward({
                            id: "plant-tree",
                            name: "Plant a Tree",
                            description: "Contribute to reforestation",
                            pointsCost: 500,
                            cashValue: 250,
                            type: "donation",
                          })
                          setIsRedemptionModalOpen(true)
                        }}
                      >
                        Redeem
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="machines">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Nearby Machines
                </CardTitle>
                <CardDescription>Find O'Waste machines near you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyMachines.map((machine, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{machine.name}</p>
                          <p className="text-sm text-gray-600">{machine.distance} away</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            machine.status === "online" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }
                        >
                          {machine.status}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{machine.items} items accepted</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link href="/machine">View All Machines</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <RewardRedemptionModal
        isOpen={isRedemptionModalOpen}
        onClose={() => {
          setIsRedemptionModalOpen(false)
          setSelectedReward(null)
        }}
        reward={selectedReward}
        userPoints={1247}
      />
    </div>
  )
}
