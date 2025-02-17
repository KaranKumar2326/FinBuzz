import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, LogOut } from 'lucide-react';
import Button from '../components/Button';
import { UserProfile } from '../lib/types';

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }
    
    // Check for dark mode preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', (!isDarkMode).toString());
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('userProfile');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 dark:text-white">Settings</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold dark:text-white">Appearance</h2>
              <p className="text-gray-600 dark:text-gray-400">Toggle dark mode</p>
            </div>
            <Button
              variant="outline"
              onClick={toggleDarkMode}
              className="p-2"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          <div className="border-t dark:border-gray-700 pt-6">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Account Information</h2>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                Name: {userProfile?.firstName} {userProfile?.lastName}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Email: {userProfile?.email}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Preferred Currency: {userProfile?.currency}
              </p>
            </div>
          </div>

          <div className="border-t dark:border-gray-700 pt-6">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-500"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </Button>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Financial Wisdom</h2>
          <div className="space-y-4">
            {[
              {
                quote: "The best investment you can make is in yourself.",
                author: "Warren Buffett"
              },
              {
                quote: "Do not save what is left after spending, but spend what is left after saving.",
                author: "Warren Buffett"
              },
              {
                quote: "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make.",
                author: "Dave Ramsey"
              }
            ].map((item, index) => (
              <blockquote key={index} className="border-l-4 border-blue-500 pl-4 dark:text-gray-300">
                <p className="italic mb-2">{item.quote}</p>
                <footer className="text-sm text-gray-600 dark:text-gray-400">— {item.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}