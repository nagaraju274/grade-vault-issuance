
import { Link } from "react-router-dom";
import { School } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-edu-navy text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <School className="h-6 w-6" />
              <span className="font-bold text-lg">GradeVault</span>
            </div>
            <p className="text-gray-300 mb-4">
              Secure platform for educational institutions to manage and issue student results digitally.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-edu-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/verify-result" className="text-gray-300 hover:text-edu-gold transition-colors">
                  Verify Result
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-edu-gold transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-edu-gold transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: support@gradevault.edu</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Education Ave, Knowledge City</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>© {currentYear} GradeVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
