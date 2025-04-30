
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { searchByRollNumber, searchByVerificationId } from "@/utils/mockData";
import { Result, Student } from "@/types";
import ResultCard from "../results/ResultCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Search } from "lucide-react";

const verifyByIdSchema = z.object({
  verificationId: z.string().min(1, { message: "Verification ID is required" }),
});

const verifyByRollSchema = z.object({
  rollNumber: z.string().min(1, { message: "Roll Number is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of Birth is required" }),
});

type VerifyByIdFormValues = z.infer<typeof verifyByIdSchema>;
type VerifyByRollFormValues = z.infer<typeof verifyByRollSchema>;

const VerifyResultForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    result: Result;
    student: Student;
  } | null>(null);

  const idForm = useForm<VerifyByIdFormValues>({
    resolver: zodResolver(verifyByIdSchema),
    defaultValues: {
      verificationId: "",
    },
  });

  const rollForm = useForm<VerifyByRollFormValues>({
    resolver: zodResolver(verifyByRollSchema),
    defaultValues: {
      rollNumber: "",
      dateOfBirth: "",
    },
  });

  const onVerifyById = (values: VerifyByIdFormValues) => {
    setIsLoading(true);
    setVerificationResult(null);

    // In a real application, this would be an API call
    setTimeout(() => {
      try {
        const result = searchByVerificationId(values.verificationId);
        
        if (!result) {
          toast.error("Result not found with the given verification ID");
          setIsLoading(false);
          return;
        }
        
        setVerificationResult(result);
      } catch (error) {
        toast.error("Failed to verify result");
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  const onVerifyByRoll = (values: VerifyByRollFormValues) => {
    setIsLoading(true);
    setVerificationResult(null);

    // In a real application, this would be an API call
    setTimeout(() => {
      try {
        const result = searchByRollNumber(values.rollNumber, values.dateOfBirth);
        
        if (!result) {
          toast.error("No results found with the given details");
          setIsLoading(false);
          return;
        }
        
        setVerificationResult(result);
      } catch (error) {
        toast.error("Failed to verify result");
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs defaultValue="verification-id" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="verification-id">
            By Verification ID
          </TabsTrigger>
          <TabsTrigger value="roll-number">By Roll Number</TabsTrigger>
        </TabsList>
        
        <TabsContent value="verification-id">
          <Form {...idForm}>
            <form onSubmit={idForm.handleSubmit(onVerifyById)} className="space-y-4">
              <FormField
                control={idForm.control}
                name="verificationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. RES-A1B2C3"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-edu-navy"
                disabled={isLoading}
              >
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? "Verifying..." : "Verify Result"}
              </Button>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="roll-number">
          <Form {...rollForm}>
            <form onSubmit={rollForm.handleSubmit(onVerifyByRoll)} className="space-y-4">
              <FormField
                control={rollForm.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. CS-2023-001"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={rollForm.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-edu-navy"
                disabled={isLoading}
              >
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? "Verifying..." : "Verify Result"}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>

      {verificationResult && (
        <div className="mt-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Verified Result</h2>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <p className="text-green-700">
              This is an authentic result issued by the institution.
            </p>
          </div>
          <div className="bg-white p-4 rounded-md border mb-4">
            <h3 className="font-medium mb-2">Student Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Name:</span>{" "}
                <span>{verificationResult.student.name}</span>
              </div>
              <div>
                <span className="text-gray-500">Roll Number:</span>{" "}
                <span>{verificationResult.student.rollNumber}</span>
              </div>
              <div>
                <span className="text-gray-500">Program:</span>{" "}
                <span>{verificationResult.student.program}</span>
              </div>
              <div>
                <span className="text-gray-500">Batch:</span>{" "}
                <span>{verificationResult.student.batch}</span>
              </div>
            </div>
          </div>
          
          <ResultCard 
            result={verificationResult.result}
            student={verificationResult.student}
          />
        </div>
      )}
    </div>
  );
};

export default VerifyResultForm;
