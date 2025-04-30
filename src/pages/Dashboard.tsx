
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Admin, Faculty, Student, User } from "@/types";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import FacultyDashboard from "@/components/dashboard/FacultyDashboard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if not logged in
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data and redirect to login
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.name || "User"}!
          </p>
        </div>

        {user?.role === "student" && (
          <StudentDashboard student={user as Student} />
        )}
        {user?.role === "admin" && <AdminDashboard admin={user as Admin} />}
        {user?.role === "faculty" && (
          <FacultyDashboard faculty={user as Faculty} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
