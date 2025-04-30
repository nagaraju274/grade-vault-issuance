
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { School, User as UserIcon, LogOut, Menu, X } from "lucide-react";

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="bg-edu-navy text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <School className="h-6 w-6" />
            <span className="font-bold text-lg">GradeVault</span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-edu-gold transition-colors">Home</Link>
            <Link to="/verify-result" className="hover:text-edu-gold transition-colors">Verify Result</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-edu-gold transition-colors">Dashboard</Link>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-edu-blue flex items-center justify-center">
                      <UserIcon className="h-4 w-4" />
                    </div>
                    <span>{user.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={onLogout}
                    className="text-white hover:text-edu-gold"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Button asChild variant="ghost" className="text-white hover:text-edu-gold">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-edu-gold text-edu-navy hover:bg-opacity-90">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3 animate-fade-in">
            <Link to="/" className="block py-2 hover:text-edu-gold transition-colors">
              Home
            </Link>
            <Link to="/verify-result" className="block py-2 hover:text-edu-gold transition-colors">
              Verify Result
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="block py-2 hover:text-edu-gold transition-colors">
                  Dashboard
                </Link>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-edu-blue flex items-center justify-center">
                      <UserIcon className="h-4 w-4" />
                    </div>
                    <span>{user.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={onLogout}
                    className="text-white hover:text-edu-gold"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Button asChild variant="ghost" className="text-white hover:text-edu-gold w-full">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-edu-gold text-edu-navy hover:bg-opacity-90 w-full">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
