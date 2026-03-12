"use client";

import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, CreditCard, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { PaymentInfo } from "@/types";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  payment: PaymentInfo;
}

export default function PaymentModal({ open, onClose, payment }: PaymentModalProps) {
  const qrData = JSON.stringify({
    to: payment.sellerName,
    amount: payment.amount,
    item: payment.listingTitle,
    phone: payment.sellerPhone,
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            You Won! Complete Payment
          </DialogTitle>
          <DialogDescription>
            Contact the seller to complete the payment for{" "}
            <span className="font-medium text-foreground">{payment.listingTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Amount */}
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl border border-border">
            <span className="text-muted-foreground text-sm">Winning Bid</span>
            <span className="font-display font-bold text-xl text-primary">
              {formatCurrency(payment.amount)}
            </span>
          </div>

          {/* Seller info */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Seller</span>
            <span className="font-medium">{payment.sellerName}</span>
          </div>

          <Separator />

          {/* Payment methods */}
          <Tabs defaultValue="cash">
            <TabsList className="w-full bg-secondary/50">
              <TabsTrigger value="cash" className="flex-1 gap-1.5">
                <Phone className="w-3.5 h-3.5" /> Cash in Hand
              </TabsTrigger>
              <TabsTrigger value="qr" className="flex-1 gap-1.5">
                <CreditCard className="w-3.5 h-3.5" /> QR Payment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cash" className="mt-4 space-y-3">
              <div className="p-4 bg-secondary/30 rounded-xl border border-border text-sm space-y-2">
                <p className="text-muted-foreground">
                  Arrange a safe meetup with the seller and pay in cash. Always meet in a public place.
                </p>
                {payment.sellerPhone && (
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-muted-foreground">Seller Phone</span>
                    <a
                      href={`tel:${payment.sellerPhone}`}
                      className="font-mono font-medium text-primary hover:underline"
                    >
                      {payment.sellerPhone}
                    </a>
                  </div>
                )}
              </div>
              <Badge variant="outline" className="text-yellow-500 border-yellow-500/30 text-xs">
                ⚠ Always meet in a public, safe location
              </Badge>
            </TabsContent>

            <TabsContent value="qr" className="mt-4">
              <div className="flex flex-col items-center gap-4 p-4 bg-secondary/30 rounded-xl border border-border">
                <div className="bg-white p-3 rounded-xl">
                  <QRCodeSVG value={qrData} size={180} />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Scan this QR code with your mobile banking app (eSewa, Khalti, IME Pay) to pay{" "}
                  <strong>{formatCurrency(payment.amount)}</strong>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}