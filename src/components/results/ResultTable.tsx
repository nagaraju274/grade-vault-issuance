
import { Result, Student } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Download } from "lucide-react";
import { useState } from "react";
import { generateResultPDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ResultCard from "./ResultCard";

interface ResultTableProps {
  results: Result[];
  student: Student;
  isAdmin?: boolean;
  onPublish?: (resultId: string) => void;
}

const ResultTable = ({ results, student, isAdmin = false, onPublish }: ResultTableProps) => {
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const handleDownload = async (result: Result) => {
    setIsDownloading(result.id);
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
      setIsDownloading(null);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Semester</TableHead>
            <TableHead>Exam Type</TableHead>
            <TableHead>Date Issued</TableHead>
            <TableHead>GPA</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result) => (
            <TableRow key={result.id}>
              <TableCell className="font-medium">{result.semester}</TableCell>
              <TableCell>{result.examType}</TableCell>
              <TableCell>{new Date(result.dateIssued).toLocaleDateString()}</TableCell>
              <TableCell>{result.averageGrade.toFixed(2)}</TableCell>
              <TableCell className="text-center">
                {result.isPublished ? (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Published
                  </span>
                ) : (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    Draft
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedResult(result)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(result)}
                  disabled={isDownloading === result.id}
                >
                  {isDownloading === result.id ? (
                    "..."
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </Button>
                {isAdmin && !result.isPublished && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onPublish && onPublish(result.id)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Publish
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedResult} onOpenChange={() => setSelectedResult(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Result Details</DialogTitle>
          </DialogHeader>
          {selectedResult && <ResultCard result={selectedResult} student={student} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResultTable;
