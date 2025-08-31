"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  PhoneOff,
  MessageSquare,
  Clock,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { customers } from "./constant/customer";
import { getRiskBadgeVariant, getRiskBadgeColor } from "./lib/utils";

interface ContactLog {
  id: number;
  date: string;
  type: string;
  outcome: string;
  notes: string;
}

const contactHistory: ContactLog[] = [
  {
    id: 1,
    date: "2024-01-20",
    type: "Phone Call",
    outcome: "No Answer",
    notes: "Called at 2:30 PM, no response",
  },
  {
    id: 2,
    date: "2024-01-18",
    type: "SMS",
    outcome: "Sent",
    notes: "Payment reminder sent",
  },
];

function formatNaira(amount: number) {
  return `₦${(amount / 1000000).toFixed(1)}M`;
}

function formatNairaDetailed(amount: number) {
  return `₦${amount.toLocaleString()}`;
}

export function CustomerDetails() {
  const [contactLogs, setContactLogs] = useState<ContactLog[]>(contactHistory);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { id } = useParams();
  console.log(id);

  const customerData =
    customers.find((c) => c.id === Number(id)) || customers[0];

  const navigate = useNavigate();

  const handleContactOutcome = (outcome: string) => {
    const newLog: ContactLog = {
      id: contactLogs.length + 1,
      date: new Date().toISOString().split("T")[0],
      type: "Phone Call",
      outcome: outcome,
      notes: `Contact attempt logged: ${outcome}`,
    };

    setContactLogs([newLog, ...contactLogs]);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const paymentProgress =
    (customerData.totalPaid / customerData.loanAmount) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">
              {customerData.name}
            </h1>
            <p className="text-sm text-muted-foreground">Customer Details</p>
          </div>
        </div>
      </header>

      {showSuccessMessage && (
        <Alert className="mx-4 mt-4 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Contact Logged</AlertTitle>
          <AlertDescription className="text-green-700">
            Contact attempt has been recorded successfully.
          </AlertDescription>
        </Alert>
      )}

      <div className="p-4 space-y-4">
        {/* Risk Alert */}
        {customerData.riskLevel === "High" && (
          <Alert className="border-destructive bg-destructive/5">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertTitle className="text-destructive">
              High Risk Customer
            </AlertTitle>
          </Alert>
        )}

        {/* Customer Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              Customer Information
              <Badge
                variant={getRiskBadgeVariant(customerData.riskLevel)}
                className={getRiskBadgeColor(customerData.riskLevel)}
              >
                {customerData.riskLevel} Risk
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{customerData.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{customerData.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{customerData.address}</span>
            </div>
          </CardContent>
        </Card>

        {/* Loan Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Loan Amount:</span>
                <p className="font-medium">
                  {formatNaira(customerData.loanAmount)}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Monthly Payment:</span>
                <p className="font-medium">
                  {formatNairaDetailed(customerData.monthlyPayment)}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Total Paid:</span>
                <p className="font-medium text-green-600">
                  {formatNaira(customerData.totalPaid)}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Remaining:</span>
                <p className="font-medium">
                  {formatNaira(customerData.remainingBalance)}
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Payment Progress</span>
                <span>{Math.round(paymentProgress)}%</span>
              </div>
              <Progress value={paymentProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Last Payment:</span>
                <p className="font-medium">{customerData.lastPayment}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Next Due:</span>
                <p className="font-medium text-destructive">
                  {customerData.nextPayment}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              {customerData.daysOverdue > 0 && (
                <span className="text-xs text-destructive font-medium">
                  {Math.abs(customerData.daysOverdue)} days overdue
                </span>
              )}

              {customerData.daysOverdue === 0 && (
                <span className="text-xs text-muted-foreground font-medium">
                  On time
                </span>
              )}

              {customerData.daysOverdue < 0 && (
                <span className="text-xs text-green-500 font-medium">
                  {Math.abs(customerData.daysOverdue)} days ahead
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Contact Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleContactOutcome("Positive Feedback")}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Positive Response
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleContactOutcome("Negative Feedback")}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Not Good Response
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleContactOutcome("Number Didn't Go Through")}
              >
                <PhoneOff className="h-4 w-4 mr-1" />
                Number Failed
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleContactOutcome("No Answer")}
              >
                <Clock className="h-4 w-4 mr-1" />
                No Answer
              </Button>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => handleContactOutcome("Left Message")}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Left Message/Voicemail
            </Button>
          </CardContent>
        </Card>

        {/* Contact History */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Contact History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {contactLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{log.type}</span>
                  <span className="text-xs text-muted-foreground">
                    {log.date}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge
                    variant={
                      log.outcome === "Positive Feedback"
                        ? "default"
                        : log.outcome === "Negative Feedback"
                        ? "destructive"
                        : "secondary"
                    }
                    className={` ${
                      log.outcome === "Positive Feedback"
                        ? "bg-green-500"
                        : log.outcome === "Negative Feedback"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    } text-xs`}
                  >
                    {log.outcome}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{log.notes}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
