
import { Faculty, Result, Student, Subject } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import ResultUploadForm from "../results/ResultUploadForm";
import ResultTable from "../results/ResultTable";
import {
  getStudents,
  getSubjects,
  getFacultyResults,
} from "@/utils/mockData";

interface FacultyDashboardProps {
  faculty: Faculty;
}

const FacultyDashboard = ({ faculty }: FacultyDashboardProps) => {
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
        const fetchedResults = await getFacultyResults(faculty.id);

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
  }, [faculty.id]);

  const handleResultUploaded = (newResult: Result) => {
    setResults((prev) => [...prev, newResult]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Department
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{faculty.department}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Designation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{faculty.designation}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Results Uploaded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{results.length}</p>
          </CardContent>
        </Card>
      </div>

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

      <Card>
        <CardHeader>
          <CardTitle>Your Uploaded Results</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-4 text-center">Loading results...</div>
          ) : results.length > 0 ? (
            <ResultTable results={results} student={students[0]} />
          ) : (
            <div className="py-4 text-center text-gray-500">
              No results uploaded yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyDashboard;
