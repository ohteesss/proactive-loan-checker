import { AlertTriangle, TrendingDown, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { customers } from "./constant/customer";

function DashboardStats() {
  const highRiskCustomers = customers.filter(
    (customer) => customer.riskLevel === "High"
  ).length;
  const mediumRiskCustomers = customers.filter(
    (customer) => customer.riskLevel === "Medium"
  ).length;
  const overdueCustomers = customers.filter(
    (customer) => customer.status === "Overdue"
  ).length;
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            Critical Risk
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          5
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +2.5%
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            High Risk
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xl font-bold text-destructive">
            {highRiskCustomers}
          </div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +1 this week
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            Medium Risk
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xl font-bold text-yellow-500">
            {mediumRiskCustomers}
          </div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +1 this week
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            Overdue
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xl font-bold text-destructive">
            {overdueCustomers}
          </div>
          <p className="text-xs text-muted-foreground">
            <TrendingDown className="inline h-3 w-3 mr-1" />
            -1 yesterday
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardStats;
