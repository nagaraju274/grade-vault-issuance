
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Result, ResultItem, Student, Subject } from "@/types";
import { calculateGPA, calculateGrade, generateVerificationId } from "@/utils/gradeCalculator";

const subjectSchema = z.object({
  subjectId: z.string().min(1, { message: "Subject is required" }),
  marks: z.coerce.number().min(0).max(100),
});

const resultUploadSchema = z.object({
  studentId: z.string().min(1, { message: "Student is required" }),
  semester: z.string().min(1, { message: "Semester is required" }),
  examType: z.string().min(1, { message: "Exam type is required" }),
  subjects: z.array(subjectSchema).min(1, { message: "At least one subject is required" }),
});

type ResultUploadFormValues = z.infer<typeof resultUploadSchema>;

interface ResultUploadFormProps {
  students: Student[];
  subjects: Subject[];
  onResultUploaded: (result: Result) => void;
}

const ResultUploadForm = ({ students, subjects, onResultUploaded }: ResultUploadFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResultUploadFormValues>({
    resolver: zodResolver(resultUploadSchema),
    defaultValues: {
      studentId: "",
      semester: "",
      examType: "",
      subjects: [{ subjectId: "", marks: 0 }],
    },
  });

  const onSubmit = (values: ResultUploadFormValues) => {
    setIsLoading(true);

    try {
      // Find the selected student
      const student = students.find((s) => s.id === values.studentId);
      if (!student) throw new Error("Student not found");

      // Process result items
      const resultItems: ResultItem[] = values.subjects.map((subjectData) => {
        const subject = subjects.find((s) => s.id === subjectData.subjectId);
        if (!subject) throw new Error(`Subject ${subjectData.subjectId} not found`);

        const grade = calculateGrade(subjectData.marks);

        return {
          subject,
          marks: subjectData.marks,
          grade,
        };
      });

      // Calculate total marks
      const totalMarks = resultItems.reduce((sum, item) => sum + item.marks, 0);
      
      // Calculate GPA
      const averageGrade = calculateGPA(resultItems);

      // Create result object
      const result: Result = {
        id: `RES-${Date.now()}`,
        studentId: values.studentId,
        student,
        semester: values.semester,
        examType: values.examType,
        dateIssued: new Date().toISOString(),
        items: resultItems,
        totalMarks,
        averageGrade,
        verificationId: generateVerificationId(),
        isPublished: false,
      };

      // In a real app, this would be sent to an API
      setTimeout(() => {
        setIsLoading(false);
        onResultUploaded(result);
        toast.success(`Result uploaded for ${student.name}`);
        form.reset();
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast.error(`Error: ${(error as Error).message}`);
    }
  };

  const addSubject = () => {
    const subjects = form.getValues("subjects");
    form.setValue("subjects", [...subjects, { subjectId: "", marks: 0 }]);
  };

  const removeSubject = (index: number) => {
    const subjects = form.getValues("subjects");
    if (subjects.length > 1) {
      form.setValue(
        "subjects",
        subjects.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload New Result</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name} ({student.rollNumber})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 8 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            Semester {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="examType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select exam type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Final">Final</SelectItem>
                        <SelectItem value="Mid-term">Mid-term</SelectItem>
                        <SelectItem value="Supplementary">Supplementary</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border p-4 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium">Subject Marks</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSubject}
                >
                  Add Subject
                </Button>
              </div>

              {form.watch("subjects").map((_, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-3 items-end">
                  <div className="col-span-8">
                    <FormField
                      control={form.control}
                      name={`subjects.${index}.subjectId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Subject {index + 1}</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem key={subject.id} value={subject.id}>
                                  {subject.name} ({subject.code})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name={`subjects.${index}.marks`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Marks</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-500"
                      onClick={() => removeSubject(index)}
                      disabled={form.watch("subjects").length === 1}
                    >
                      X
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-edu-navy"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload Result"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ResultUploadForm;
