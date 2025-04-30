
import { Admin, Faculty, Grade, Result, Student, Subject } from "@/types";
import { calculateGrade } from "./gradeCalculator";

// Mock Students
const mockStudents: Student[] = [
  {
    id: "student-1",
    name: "John Smith",
    email: "student@example.com",
    role: "student",
    rollNumber: "CS-2023-001",
    program: "Computer Science",
    batch: "2023",
    dateOfBirth: "2000-05-15",
  },
  {
    id: "student-2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "student",
    rollNumber: "CS-2023-002",
    program: "Computer Science",
    batch: "2023",
    dateOfBirth: "2000-08-22",
  },
  {
    id: "student-3",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "student",
    rollNumber: "EE-2023-001",
    program: "Electrical Engineering",
    batch: "2023",
    dateOfBirth: "2001-03-10",
  },
];

// Mock Subjects
const mockSubjects: Subject[] = [
  {
    id: "subject-1",
    code: "CS101",
    name: "Introduction to Programming",
    creditHours: 3,
  },
  {
    id: "subject-2",
    code: "CS102",
    name: "Data Structures",
    creditHours: 4,
  },
  {
    id: "subject-3",
    code: "CS103",
    name: "Database Systems",
    creditHours: 3,
  },
  {
    id: "subject-4",
    code: "MATH101",
    name: "Calculus I",
    creditHours: 3,
  },
  {
    id: "subject-5",
    code: "PHYS101",
    name: "Physics I",
    creditHours: 4,
  },
  {
    id: "subject-6",
    code: "ENG101",
    name: "English Composition",
    creditHours: 2,
  },
];

// Helper to generate result items
const generateResultItems = (subjects: Subject[]) => {
  return subjects.map(subject => {
    const marks = Math.floor(Math.random() * 40) + 60; // Random marks between 60 and 99
    const grade = calculateGrade(marks);
    return {
      subject,
      marks,
      grade,
    };
  });
};

// Calculate total marks and average grade for result items
const calculateResultSummary = (items: { subject: Subject; marks: number; grade: Grade }[]) => {
  const totalMarks = items.reduce((sum, item) => sum + item.marks, 0);
  const totalCreditHours = items.reduce(
    (sum, item) => sum + item.subject.creditHours,
    0
  );
  const totalGradePoints = items.reduce(
    (sum, item) => sum + item.grade.gradePoints * item.subject.creditHours,
    0
  );
  const averageGrade = totalCreditHours ? +(totalGradePoints / totalCreditHours).toFixed(2) : 0;

  return { totalMarks, averageGrade };
};

// Mock Results
const mockResults: Result[] = [
  {
    id: "result-1",
    studentId: "student-1",
    semester: "1",
    examType: "Final",
    dateIssued: "2023-12-15",
    items: generateResultItems(mockSubjects.slice(0, 4)),
    totalMarks: 0, // Will be calculated
    averageGrade: 0, // Will be calculated
    verificationId: "RES-ABC123",
    isPublished: true,
  },
  {
    id: "result-2",
    studentId: "student-1",
    semester: "2",
    examType: "Mid-term",
    dateIssued: "2024-05-20",
    items: generateResultItems(mockSubjects.slice(2, 6)),
    totalMarks: 0, // Will be calculated
    averageGrade: 0, // Will be calculated
    verificationId: "RES-DEF456",
    isPublished: true,
  },
  {
    id: "result-3",
    studentId: "student-2",
    semester: "1",
    examType: "Final",
    dateIssued: "2023-12-15",
    items: generateResultItems(mockSubjects.slice(0, 4)),
    totalMarks: 0, // Will be calculated
    averageGrade: 0, // Will be calculated
    verificationId: "RES-GHI789",
    isPublished: false,
  },
];

// Calculate and update totals
mockResults.forEach(result => {
  const { totalMarks, averageGrade } = calculateResultSummary(result.items);
  result.totalMarks = totalMarks;
  result.averageGrade = averageGrade;
});

// Mock API functions with timeouts to simulate network requests
export const getStudents = (): Promise<Student[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockStudents);
    }, 500);
  });
};

export const getSubjects = (): Promise<Subject[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockSubjects);
    }, 500);
  });
};

export const getStudentResults = (studentId: string): Promise<Result[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const results = mockResults.filter(
        result => result.studentId === studentId && result.isPublished
      );
      resolve(results);
    }, 500);
  });
};

export const getAllResults = (): Promise<Result[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...mockResults]);
    }, 500);
  });
};

export const getFacultyResults = (facultyId: string): Promise<Result[]> => {
  // In a real app, results would be associated with faculty
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockResults.slice(0, 2));
    }, 500);
  });
};

export const publishResult = (resultId: string): Promise<Result> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const resultIndex = mockResults.findIndex(r => r.id === resultId);
      
      if (resultIndex === -1) {
        reject(new Error("Result not found"));
        return;
      }
      
      const updatedResult = { ...mockResults[resultIndex], isPublished: true };
      mockResults[resultIndex] = updatedResult;
      resolve(updatedResult);
    }, 800);
  });
};

export const searchByVerificationId = (
  verificationId: string
): { result: Result; student: Student } | null => {
  const result = mockResults.find(
    r => r.verificationId.toUpperCase() === verificationId.toUpperCase() && r.isPublished
  );
  
  if (!result) return null;
  
  const student = mockStudents.find(s => s.id === result.studentId);
  
  if (!student) return null;
  
  return { result, student };
};

export const searchByRollNumber = (
  rollNumber: string,
  dateOfBirth: string
): { result: Result; student: Student } | null => {
  const student = mockStudents.find(
    s => 
      s.rollNumber.toUpperCase() === rollNumber.toUpperCase() &&
      s.dateOfBirth === dateOfBirth
  );
  
  if (!student) return null;
  
  const result = mockResults.find(
    r => r.studentId === student.id && r.isPublished
  );
  
  if (!result) return null;
  
  return { result, student };
};
