import { AlertTriangle, X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export default function NotificationPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-4 px-4">
      <div className="bg-card border rounded-lg shadow-lg max-w-sm w-full animate-in slide-in-from-top-2">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h3 className="font-semibold">Critical Alert</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 space-y-3">
          <div className="text-sm">
            <p className="font-medium text-destructive">
              Ngozi Nwosu - High Risk
            </p>
            <p className="text-muted-foreground mt-1">
              Payment overdue by 30 days
            </p>
            <p className="text-muted-foreground">Loan Amount: ₦630,000</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
              onClick={() => navigate("/customer/4")}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
