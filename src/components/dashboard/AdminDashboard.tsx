
import { Admin, Result, Student, Subject } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import ResultUploadForm from "../results/ResultUploadForm";
import ResultTable from "../results/ResultTable";
import {
  getStudents,
  getSubjects,
  getAllResults,
  publishResult,
} from "@/utils/mockData";
import { toast } from "sonner";

interface AdminDashboardProps {
  admin: Admin;
}

const AdminDashboard = ({ admin }: AdminDashboardProps) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        const fetchedStudents = await getStudents();
        const fetchedSubjects = await getSubjects();
        const fetchedResults = await getAllResults();

        setStudents(fetchedStudents);
        setSubjects(fetchedSubjects);
        setResults(fetchedResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleResultUploaded = (newResult: Result) => {
    setResults((prev) => [...prev, newResult]);
  };

  const handlePublishResult = async (resultId: string) => {
    try {
      // In a real app, this would be an API call
      const updatedResult = await publishResult(resultId);
      
      // Update the results list
      setResults((prev) =>
        prev.map((result) =>
          result.id === resultId ? updatedResult : result
        )
      );
      
      toast.success("Result published successfully");
    } catch (error) {
      toast.error("Failed to publish result");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{students.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{results.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Published Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {results.filter((r) => r.isPublished).length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="upload">Upload Result</TabsTrigger>
          <TabsTrigger value="manage">Manage Results</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Result</CardTitle>
              <CardDescription>
                Create and upload a new result for a student
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="py-4 text-center">Loading...</div>
              ) : (
                <ResultUploadForm
                  students={students}
                  subjects={subjects}
                  onResultUploaded={handleResultUploaded}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Manage Results</CardTitle>
              <CardDescription>
                View, edit, and publish student results
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="py-4 text-center">Loading results...</div>
              ) : results.length > 0 ? (
                <ResultTable 
                  results={results} 
                  student={students[0]} 
                  isAdmin 
                  onPublish={handlePublishResult} 
                />
              ) : (
                <div className="py-4 text-center text-gray-500">
                  No results available yet.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
