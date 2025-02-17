import { useState } from "react";
import { DollarSign, ArrowLeft, ChevronDown } from "lucide-react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { CURRENCIES, UserProfile } from "../lib/types";

export default function Signup() {
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    firstName: "",
    lastName: "",
    email: "",
    currency: "USD"
  });
  const [showCurrencies, setShowCurrencies] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle signup here
    // For now, just store the user data in localStorage and redirect
    localStorage.setItem('userProfile', JSON.stringify(formData));
    navigate("/dashboard");
  };

  const selectedCurrency = CURRENCIES.find(c => c.code === formData.currency);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <div className="max-w-md mx-auto mt-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold">Join FinBuzz</h1>
            <p className="text-gray-600 mt-2">Start your financial journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
            <div className="space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Currency
                </label>
                <button
                  type="button"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-left flex items-center justify-between"
                  onClick={() => setShowCurrencies(!showCurrencies)}
                >
                  <span>{selectedCurrency?.symbol} {selectedCurrency?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showCurrencies && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {CURRENCIES.map((currency) => (
                      <button
                        key={currency.code}
                        type="button"
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                        onClick={() => {
                          setFormData({ ...formData, currency: currency.code });
                          setShowCurrencies(false);
                        }}
                      >
                        <span className="w-8">{currency.symbol}</span>
                        <span>{currency.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}