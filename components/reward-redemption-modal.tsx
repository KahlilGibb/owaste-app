"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Gift, Coins, Leaf, Loader2 } from "lucide-react"
import { redeemReward, type RewardItem } from "@/app/actions/stripe"

interface RewardRedemptionModalProps {
  isOpen: boolean
  onClose: () => void
  reward: RewardItem | null
  userPoints: number
}

export default function RewardRedemptionModal({ isOpen, onClose, reward, userPoints }: RewardRedemptionModalProps) {
  const [step, setStep] = useState<"confirm" | "processing" | "success" | "error">("confirm")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [successData, setSuccessData] = useState<any>(null)

  if (!reward) return null

  const canRedeem = userPoints >= reward.pointsCost
  const pointsNeeded = reward.pointsCost - userPoints

  const handleRedemption = async () => {
    setIsLoading(true)
    setError("")
    setStep("processing")

    try {
      const result = await redeemReward(reward.id, "user-123") // Replace with actual user ID

      if (result.success) {
        setSuccessData(result)
        setStep("success")
      } else {
        setError(result.error || "Redemption failed")
        setStep("error")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setStep("error")
    } finally {
      setIsLoading(false)
    }
  }

  const resetModal = () => {
    setStep("confirm")
    setError("")
    setSuccessData(null)
    onClose()
  }

  const getRewardIcon = () => {
    switch (reward.type) {
      case "cash":
        return <Coins className="w-12 h-12 text-green-600" />
      case "voucher":
        return <Gift className="w-12 h-12 text-purple-600" />
      case "donation":
        return <Leaf className="w-12 h-12 text-green-600" />
      default:
        return <Gift className="w-12 h-12 text-blue-600" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getRewardIcon()}
            Redeem Reward
          </DialogTitle>
          <DialogDescription>
            {step === "confirm" && "Confirm your reward redemption"}
            {step === "processing" && "Processing your redemption"}
            {step === "success" && "Redemption successful!"}
            {step === "error" && "Redemption failed"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {step === "confirm" && (
            <>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">{reward.name}</h3>
                <p className="text-gray-600 mb-4">{reward.description}</p>

                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Points Required:</span>
                    <Badge variant="outline">{reward.pointsCost} points</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Your Points:</span>
                    <Badge
                      className={
                        userPoints >= reward.pointsCost ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }
                    >
                      {userPoints} points
                    </Badge>
                  </div>
                  {reward.cashValue && (
                    <div className="flex justify-between items-center">
                      <span>Value:</span>
                      <span className="font-semibold">₹{reward.cashValue}</span>
                    </div>
                  )}
                </div>
              </div>

              {!canRedeem && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>You need {pointsNeeded} more points to redeem this reward.</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={resetModal} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button onClick={handleRedemption} disabled={!canRedeem || isLoading} className="flex-1">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Redeem Now"
                  )}
                </Button>
              </div>
            </>
          )}

          {step === "processing" && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-600" />
              <h3 className="text-lg font-semibold mb-2">Processing Redemption</h3>
              <p className="text-gray-600">Please wait while we process your reward...</p>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-4">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-lg font-semibold mb-2">Success!</h3>
              <p className="text-gray-600 mb-4">
                {successData?.message || "Your reward has been processed successfully!"}
              </p>

              {successData?.voucherCode && (
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <p className="font-medium text-green-900 mb-2">Your Voucher Code:</p>
                  <code className="bg-white px-3 py-2 rounded border text-lg font-mono">{successData.voucherCode}</code>
                  <p className="text-sm text-green-700 mt-2">
                    Expires: {new Date(successData.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              {successData?.donationId && (
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <p className="font-medium text-green-900 mb-2">Donation ID:</p>
                  <code className="bg-white px-3 py-2 rounded border">{successData.donationId}</code>
                </div>
              )}

              {successData?.transactionId && successData?.type === "cash" && (
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <p className="font-medium text-green-900 mb-2">Transaction ID:</p>
                  <code className="bg-white px-3 py-2 rounded border">{successData.transactionId}</code>
                </div>
              )}

              <Button onClick={resetModal} className="w-full">
                Done
              </Button>
            </div>
          )}

          {step === "error" && (
            <div className="text-center py-4">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h3 className="text-lg font-semibold mb-2">Redemption Failed</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetModal} className="flex-1 bg-transparent">
                  Close
                </Button>
                <Button onClick={() => setStep("confirm")} className="flex-1">
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
