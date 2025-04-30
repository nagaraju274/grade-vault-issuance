
import { Result, Student } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { generateResultPDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";
import { useState } from "react";

interface ResultCardProps {
  result: Result;
  student: Student;
}

const ResultCard = ({ result, student }: ResultCardProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const pdfUrl = await generateResultPDF(result, student);
      
      // In a real application, this would open the PDF in a new tab
      // or trigger a download
      toast.success("Result PDF generated successfully!");
      
      // Mock download by opening a blank page
      window.open("about:blank", "_blank");
    } catch (error) {
      toast.error("Failed to generate PDF");
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Semester {result.semester} Results</span>
          <span className="text-sm text-edu-navy bg-edu-gold bg-opacity-40 px-2 py-1 rounded">
            {result.examType}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500">Date Issued</span>
            <span>{new Date(result.dateIssued).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Verification ID</span>
            <span>{result.verificationId}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Total Marks</span>
            <span>{result.totalMarks}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">GPA</span>
            <span className="font-medium">{result.averageGrade.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="border-t pt-3">
          <h4 className="font-medium mb-2">Subject Results</h4>
          <div className="space-y-3">
            {result.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm border-b pb-1">
                <span className="font-medium">{item.subject.name} ({item.subject.code})</span>
                <div className="text-right">
                  <span className="px-2">{item.marks}/100</span>
                  <span className={`font-medium ${
                    item.grade.letterGrade === "F" 
                      ? "text-red-600" 
                      : item.grade.letterGrade.startsWith("A") 
                        ? "text-green-600"
                        : ""
                  }`}>
                    {item.grade.letterGrade} ({item.grade.gradePoints.toFixed(1)})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleDownload} 
          className="bg-edu-navy w-full"
          disabled={isDownloading}
        >
          <Download className="w-4 h-4 mr-2" />
          {isDownloading ? "Generating PDF..." : "Download Result"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultCard;
