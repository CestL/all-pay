import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentForm } from "@/components/dashboard/payment-form"
import { SavedPayees } from "@/components/dashboard/saved-payees"
import { PaymentHistory } from "@/components/dashboard/payment-history"

export default function PaymentPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Make a Payment</h1>
        <p className="text-muted-foreground">Pay your bills, transfer money, or make a one-time payment.</p>
      </div>

      <Tabs defaultValue="new-payment" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new-payment">New Payment</TabsTrigger>
          <TabsTrigger value="saved-payees">Saved Payees</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>
        <TabsContent value="new-payment">
          <Card>
            <CardHeader>
              <CardTitle>New Payment</CardTitle>
              <CardDescription>Make a payment to a new or existing payee.</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="saved-payees">
          <Card>
            <CardHeader>
              <CardTitle>Saved Payees</CardTitle>
              <CardDescription>Select from your saved payees to make a quick payment.</CardDescription>
            </CardHeader>
            <CardContent>
              <SavedPayees />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View your recent payment history.</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentHistory />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
