
import { Result, Student } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResultTable from "../results/ResultTable";
import { useState, useEffect } from "react";
import { getStudentResults } from "@/utils/mockData";

interface StudentDashboardProps {
  student: Student;
}

const StudentDashboard = ({ student }: StudentDashboardProps) => {
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchResults = async () => {
      try {
        const studentResults = await getStudentResults(student.id);
        setResults(studentResults);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [student.id]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Program
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{student.program}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Roll Number
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{student.rollNumber}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Batch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{student.batch}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Academic Results</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-4 text-center">Loading results...</div>
          ) : results.length > 0 ? (
            <ResultTable results={results} student={student} />
          ) : (
            <div className="py-4 text-center text-gray-500">
              No results available yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
