
import { Link } from "react-router-dom";
import { School } from "lucide-react";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link to="/" className="flex items-center">
              <School className="h-10 w-10 text-edu-navy" />
              <span className="ml-2 text-2xl font-bold text-edu-navy">GradeVault</span>
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-edu-blue hover:text-edu-navy"
            >
              sign in to your account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <RegisterForm />
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-edu-blue">
              Back to home page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
