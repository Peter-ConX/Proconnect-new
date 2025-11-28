"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"
import type { SubscriptionModalProps } from "@/lib/pricing/types"

export function SubscriptionModal({ isOpen, onClose, status, planName }: SubscriptionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {status === "success" ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Subscription Successful</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <span>Subscription Failed</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {status === "success"
              ? `You have successfully subscribed to the ${planName} plan. Welcome to the enhanced Proconnect experience!`
              : `There was an error processing your subscription to the ${planName} plan. Please try again or contact support.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button onClick={onClose}>{status === "success" ? "Continue to Dashboard" : "Try Again"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
