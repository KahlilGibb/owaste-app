"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Search,
  Smartphone,
  Laptop,
  Battery,
  Camera,
  Scan,
  CheckCircle,
  AlertCircle,
  Coins,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

export default function MachinePage() {
  const [selectedDevice, setSelectedDevice] = useState("")
  const [scanProgress, setScanProgress] = useState(0)
  const [scanComplete, setScanComplete] = useState(false)
  const [estimatedPoints, setEstimatedPoints] = useState(0)

  const machines = [
    {
      id: 1,
      name: "Mall Plaza",
      address: "123 Shopping Street",
      distance: "0.5 km",
      status: "online",
      capacity: 85,
      acceptedItems: ["smartphones", "tablets", "headphones", "batteries"],
    },
    {
      id: 2,
      name: "Tech Park",
      address: "456 Innovation Ave",
      distance: "1.2 km",
      status: "online",
      capacity: 60,
      acceptedItems: ["laptops", "smartphones", "cameras", "gaming"],
    },
    {
      id: 3,
      name: "City Center",
      address: "789 Downtown Blvd",
      distance: "2.1 km",
      status: "maintenance",
      capacity: 0,
      acceptedItems: [],
    },
  ]

  const deviceTypes = [
    { value: "smartphone", label: "Smartphone", icon: Smartphone, points: "50-150" },
    { value: "laptop", label: "Laptop", icon: Laptop, points: "200-500" },
    { value: "tablet", label: "Tablet", icon: Smartphone, points: "100-200" },
    { value: "camera", label: "Camera", icon: Camera, points: "100-300" },
    { value: "battery", label: "Battery", icon: Battery, points: "10-30" },
  ]

  const handleScan = () => {
    setScanProgress(0)
    setScanComplete(false)

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setScanComplete(true)
          setEstimatedPoints(Math.floor(Math.random() * 200) + 50)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">O'Waste Machines</h1>
          <p className="text-gray-600">Find a machine near you or use our virtual interface</p>
        </div>

        <Tabs defaultValue="find" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="find">Find Machine</TabsTrigger>
            <TabsTrigger value="virtual">Virtual Interface</TabsTrigger>
          </TabsList>

          <TabsContent value="find" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Find Nearby O'Waste machines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Input placeholder="Enter your location..." className="flex-1" />
                  <Button>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Machine List */}
            <div className="space-y-4">
              {machines.map((machine) => (
                <Card key={machine.id} className={machine.status === "maintenance" ? "opacity-60" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{machine.name}</h3>
                          <p className="text-gray-600 mb-2">{machine.address}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{machine.distance}</span>
                            <Badge
                              className={
                                machine.status === "online" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }
                            >
                              {machine.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="mb-2">
                          <span className="text-sm text-gray-500">Capacity</span>
                          <Progress value={machine.capacity} className="w-24 h-2 mt-1" />
                        </div>
                        <Button disabled={machine.status === "maintenance"} size="sm">
                          {machine.status === "maintenance" ? "Unavailable" : "Get Directions"}
                        </Button>
                      </div>
                    </div>
                    {machine.acceptedItems.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-600 mb-2">Accepts:</p>
                        <div className="flex flex-wrap gap-2">
                          {machine.acceptedItems.map((item) => (
                            <Badge key={item} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="virtual" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Device Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Select Your Device
                  </CardTitle>
                  <CardDescription>Choose the type of device you want to recycle</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select device type" />
                    </SelectTrigger>
                    <SelectContent>
                      {deviceTypes.map((device) => (
                        <SelectItem key={device.value} value={device.value}>
                          <div className="flex items-center gap-2">
                            <device.icon className="w-4 h-4" />
                            {device.label} ({device.points} points)
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedDevice && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Device Information</h4>
                      <p className="text-sm text-blue-700 mb-4">
                        Please ensure your device is clean and remove any personal data before recycling.
                      </p>
                      <Button onClick={handleScan} disabled={scanProgress > 0 && scanProgress < 100} className="w-full">
                        <Scan className="w-4 h-4 mr-2" />
                        {scanProgress > 0 && scanProgress < 100 ? "Scanning..." : "Start Assessment"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Assessment Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scan className="w-5 h-5" />
                    Device Assessment
                  </CardTitle>
                  <CardDescription>AI-powered device evaluation</CardDescription>
                </CardHeader>
                <CardContent>
                  {scanProgress === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Scan className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Select a device and start assessment</p>
                    </div>
                  )}

                  {scanProgress > 0 && scanProgress < 100 && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Scan className="w-8 h-8 text-blue-600 animate-pulse" />
                        </div>
                        <p className="font-medium mb-2">Scanning your device...</p>
                        <Progress value={scanProgress} className="w-full" />
                        <p className="text-sm text-gray-600 mt-2">{scanProgress}% complete</p>
                      </div>
                    </div>
                  )}

                  {scanComplete && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Assessment Complete!</h3>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Estimated Value:</span>
                          <div className="flex items-center gap-1">
                            <Coins className="w-4 h-4 text-green-600" />
                            <span className="text-lg font-bold text-green-600">{estimatedPoints} points</span>
                          </div>
                        </div>
                        <p className="text-sm text-green-700">
                          Based on device condition, model, and current market value
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Device is in good condition</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>All components functional</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                          <span>Minor cosmetic wear detected</span>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                        Confirm Recycling
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>How to Use Virtual Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-blue-600">1</span>
                    </div>
                    <h4 className="font-medium mb-2">Select Device</h4>
                    <p className="text-sm text-gray-600">Choose your device type from the dropdown menu</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-blue-600">2</span>
                    </div>
                    <h4 className="font-medium mb-2">AI Assessment</h4>
                    <p className="text-sm text-gray-600">Our AI evaluates your device condition and value</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-lg font-bold text-blue-600">3</span>
                    </div>
                    <h4 className="font-medium mb-2">Get Points</h4>
                    <p className="text-sm text-gray-600">Confirm recycling and earn instant reward points</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
