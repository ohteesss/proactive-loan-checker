"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { AlertTriangle, Bell, Filter, Search, Shield } from "lucide-react";
import { useState } from "react";
import NotificationPopup from "./components/notification";
import { alerts } from "./constant/alerts";
import { customers } from "./constant/customer";
import DashboardStats from "./dashborad-stats";
import { useNavigate } from "react-router";
import { getRiskBadgeVariant, getStatusBadgeVariant } from "./lib/utils";

function formatNaira(amount: number) {
  return `₦${(amount / 1000000).toFixed(1)}M`;
}

export function LoanRiskDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [showNotification, setShowNotification] = useState(true);
  const navigate = useNavigate();

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRisk =
      riskFilter === "all" || customer.riskLevel.toLowerCase() === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="min-h-screen bg-background">
      <NotificationPopup
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
      />

      <header className="border-b bg-card px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold text-foreground">LoanGuard Pro</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNotification(true)}
            >
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="ml-1 text-xs">
                {alerts.length}
              </Badge>
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              AO
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <DashboardStats />

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-primary" />
              Priority Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <Alert
                key={alert.id}
                className={
                  alert.priority === "Critical" ? "border-destructive" : ""
                }
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="text-sm">
                  <div className="flex items-center justify-between">
                    <span>{alert.customer}</span>
                    <Badge
                      variant={
                        alert.priority === "Critical"
                          ? "destructive"
                          : alert.priority === "High"
                          ? "secondary"
                          : "default"
                      }
                      className="text-xs"
                    >
                      {alert.priority}
                    </Badge>
                  </div>
                </AlertTitle>
                <AlertDescription className="text-xs">
                  <div className="flex items-center justify-between mt-1">
                    <span>{alert.message}</span>
                    <span className="text-muted-foreground">
                      {alert.timestamp}
                    </span>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Customer Risk Overview</CardTitle>
            <div className="flex gap-2 mt-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm bg-white"
                />
              </div>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-24">
                  <Filter className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="border rounded-lg p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{customer.name}</h4>
                  <Badge
                    variant={getRiskBadgeVariant(customer.riskLevel)}
                    className="text-xs"
                  >
                    {customer.riskLevel}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Loan: </span>
                    <span className="font-medium">
                      {formatNaira(customer.loanAmount)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status: </span>
                    <Badge
                      variant={getStatusBadgeVariant(customer.status)}
                      className="text-xs"
                    >
                      {customer.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Risk:</span>
                    <span className="text-xs font-medium">
                      {customer.riskScore}
                    </span>
                    <Progress value={customer.riskScore} className="w-12 h-1" />
                  </div>
                  {customer.daysOverdue > 0 && (
                    <span className="text-xs text-destructive font-medium">
                      {customer.daysOverdue} days overdue
                    </span>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs bg-transparent"
                  onClick={() => navigate(`/customer/${customer.id}`)}
                >
                  View Details
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
