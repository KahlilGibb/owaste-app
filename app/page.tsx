import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Recycle,
  Smartphone,
  Laptop,
  Battery,
  Headphones,
  Camera,
  Gamepad2,
  Tablet,
  ArrowRight,
  Leaf,
  Award,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const acceptedItems = [
    { icon: Smartphone, name: "Smartphones", points: "50-150", color: "bg-blue-100 text-blue-600" },
    { icon: Laptop, name: "Laptops", points: "200-500", color: "bg-green-100 text-green-600" },
    { icon: Battery, name: "Batteries", points: "10-30", color: "bg-yellow-100 text-yellow-600" },
    { icon: Headphones, name: "Headphones", points: "20-80", color: "bg-purple-100 text-purple-600" },
    { icon: Camera, name: "Cameras", points: "100-300", color: "bg-red-100 text-red-600" },
    { icon: Gamepad2, name: "Gaming", points: "80-250", color: "bg-indigo-100 text-indigo-600" },
    { icon: Tablet, name: "Tablets", points: "100-200", color: "bg-pink-100 text-pink-600" },
  ]

  const stats = [
    { icon: Recycle, value: "50,000+", label: "Items Recycled" },
    { icon: Users, value: "12,000+", label: "Active Users" },
    { icon: Leaf, value: "25 Tons", label: "CO2 Saved" },
    { icon: Award, value: "₹2.5M", label: "Rewards Given" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img src="/images/owaste-logo.jpeg" alt="O'Waste Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              O'Waste
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">
              How It Works
            </Link>
            <Link href="#rewards" className="text-gray-600 hover:text-green-600 transition-colors">
              Rewards
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">
              Dashboard
            </Link>
            <Button asChild>
              <Link href="/machine">Find Machine</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100">🌱 Sustainable Technology</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Turn E-Waste into
            <br />
            Instant Rewards
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Recycle your old electronics at our O'Waste machines and earn points that can be redeemed for cash,
            vouchers, or eco-friendly products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              asChild
            >
              <Link href="/machine">
                Start Recycling <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accepted Items */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What We Accept</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bring your old electronics and earn points based on their condition and type
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {acceptedItems.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-2">
                  <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center mx-auto mb-3`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {item.points} points
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">Simple steps to turn your e-waste into rewards</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Find a Machine</h3>
              <p className="opacity-90">Locate the nearest O'Waste machine using our app or website</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Drop & Scan</h3>
              <p className="opacity-90">Place your device in the machine and let our AI assess its value</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Earn Rewards</h3>
              <p className="opacity-90">Get instant points that can be redeemed for cash or vouchers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already making money while saving the planet
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            asChild
          >
            <Link href="/machine">
              Find Nearest Machine <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg overflow-hidden">
                  <img src="/images/owaste-logo.jpeg" alt="O'Waste Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-lg font-bold">O'Waste</span>
              </div>
              <p className="text-gray-600">Making e-waste recycling rewarding and accessible for everyone.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/machine" className="block text-gray-600 hover:text-green-600">
                  Find Machine
                </Link>
                <Link href="/dashboard" className="block text-gray-600 hover:text-green-600">
                  Dashboard
                </Link>
                <Link href="/rewards" className="block text-gray-600 hover:text-green-600">
                  Rewards
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <Link href="/help" className="block text-gray-600 hover:text-green-600">
                  Help Center
                </Link>
                <Link href="/contact" className="block text-gray-600 hover:text-green-600">
                  Contact Us
                </Link>
                <Link href="/faq" className="block text-gray-600 hover:text-green-600">
                  FAQ
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-gray-600 hover:text-green-600">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-gray-600 hover:text-green-600">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 O'Waste. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
