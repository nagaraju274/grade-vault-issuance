
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VerifyResultForm from "@/components/verification/VerifyResult";

const VerifyResult = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={null} onLogout={() => {}} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Result</h1>
          <p className="text-gray-600">
            Verify the authenticity of academic results by using the
            verification ID or student details.
          </p>
        </div>

        <VerifyResultForm />
      </main>

      <Footer />
    </div>
  );
};

export default VerifyResult;
