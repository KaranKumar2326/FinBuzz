import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DollarSign, MessageSquare, PieChart, Settings, LogOut } from "lucide-react";
import Button from "../components/Button";
import ExpenseTracker from "../components/ExpenseTracker";
import EmergencyFund from "../components/EmergencyFund";
import InvestmentOverview from "../components/InvestmentOverview";
import SavingsGoal from "../components/SavingsGoal";
import { UserProfile } from "../lib/types";

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold">FinBuzz</span>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className="flex items-center space-x-2 p-2 rounded-lg bg-blue-50 text-blue-700">
                <PieChart className="h-5 w-5" />
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link to="/chat" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <MessageSquare className="h-5 w-5" />
                <span>AI Advisor</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">
            Welcome back, {userProfile?.firstName || 'Guest'}!
          </h1>
          <Button variant="outline" className="flex items-center space-x-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <InvestmentOverview currency={userProfile?.currency || 'USD'} />
          <SavingsGoal currency={userProfile?.currency || 'USD'} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpenseTracker currency={userProfile?.currency || 'USD'} />
          <EmergencyFund />
        </div>
      </main>
    </div>
  );
}