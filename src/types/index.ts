
export type Role = "admin" | "faculty" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Student extends User {
  role: "student";
  rollNumber: string;
  program: string;
  batch: string;
  dateOfBirth: string;
}

export interface Faculty extends User {
  role: "faculty";
  department: string;
  designation: string;
}

export interface Admin extends User {
  role: "admin";
  department: string;
  position: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  creditHours: number;
}

export interface Grade {
  letterGrade: string;
  gradePoints: number;
}

export interface ResultItem {
  subject: Subject;
  marks: number;
  grade: Grade;
}

export interface Result {
  id: string;
  studentId: string;
  student?: Student;
  semester: string;
  examType: string;
  dateIssued: string;
  items: ResultItem[];
  totalMarks: number;
  averageGrade: number;
  verificationId: string;
  isPublished: boolean;
}
