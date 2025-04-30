
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { School, FileText, Shield, UserCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={null} onLogout={() => {}} />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="edu-gradient py-16 md:py-24">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Secure Digital Academic Results Platform
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 mb-8">
              GradeVault helps educational institutions manage and issue student results
              securely with verification features.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-edu-gold text-edu-navy hover:bg-opacity-90">
                <Link to="/verify-result">Verify a Result</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-edu-navy">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Comprehensive Result Management System
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-16 w-16 bg-edu-navy bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-edu-navy" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
                <p className="text-gray-600">
                  Role-based access control ensures that only authorized personnel
                  can view, create, or modify academic results.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-16 w-16 bg-edu-blue bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-edu-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Digital Results</h3>
                <p className="text-gray-600">
                  Generate, view, and download student results in PDF format
                  with automated grade calculation.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-16 w-16 bg-edu-gold bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <UserCheck className="h-8 w-8 text-edu-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Result Verification</h3>
                <p className="text-gray-600">
                  Public verification portal allows anyone to verify the
                  authenticity of issued results using unique verification IDs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-edu-navy mb-4">01</div>
                <h3 className="text-xl font-semibold mb-2">Upload Results</h3>
                <p className="text-gray-600">
                  Faculty members enter marks for each subject, and the system
                  automatically calculates grades.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-edu-navy mb-4">02</div>
                <h3 className="text-xl font-semibold mb-2">Review & Approve</h3>
                <p className="text-gray-600">
                  Administrators review submitted results before publishing them
                  to students.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-edu-navy mb-4">03</div>
                <h3 className="text-xl font-semibold mb-2">Access Results</h3>
                <p className="text-gray-600">
                  Students login to view their results and download
                  official PDF reports.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-edu-navy mb-4">04</div>
                <h3 className="text-xl font-semibold mb-2">Verify Authenticity</h3>
                <p className="text-gray-600">
                  Each result includes a unique verification ID that can be
                  used to confirm authenticity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-edu-navy py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join educational institutions worldwide using GradeVault to simplify
              result management and enhance data security.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-edu-navy hover:bg-gray-100">
                <Link to="/register">Register Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-edu-navy">
                <Link to="/verify-result">Verify a Result</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
