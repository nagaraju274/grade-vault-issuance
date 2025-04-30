
import { Grade, ResultItem } from "@/types";

export const calculateGrade = (marks: number): Grade => {
  if (marks >= 90) {
    return { letterGrade: "A+", gradePoints: 4.0 };
  } else if (marks >= 85) {
    return { letterGrade: "A", gradePoints: 4.0 };
  } else if (marks >= 80) {
    return { letterGrade: "A-", gradePoints: 3.7 };
  } else if (marks >= 75) {
    return { letterGrade: "B+", gradePoints: 3.3 };
  } else if (marks >= 70) {
    return { letterGrade: "B", gradePoints: 3.0 };
  } else if (marks >= 65) {
    return { letterGrade: "B-", gradePoints: 2.7 };
  } else if (marks >= 60) {
    return { letterGrade: "C+", gradePoints: 2.3 };
  } else if (marks >= 55) {
    return { letterGrade: "C", gradePoints: 2.0 };
  } else if (marks >= 50) {
    return { letterGrade: "C-", gradePoints: 1.7 };
  } else if (marks >= 45) {
    return { letterGrade: "D+", gradePoints: 1.3 };
  } else if (marks >= 40) {
    return { letterGrade: "D", gradePoints: 1.0 };
  } else {
    return { letterGrade: "F", gradePoints: 0.0 };
  }
};

export const calculateGPA = (results: ResultItem[]): number => {
  if (!results.length) return 0;
  
  const totalCreditHours = results.reduce(
    (sum, item) => sum + item.subject.creditHours,
    0
  );
  
  const totalGradePoints = results.reduce(
    (sum, item) => sum + item.grade.gradePoints * item.subject.creditHours,
    0
  );
  
  return totalCreditHours ? +(totalGradePoints / totalCreditHours).toFixed(2) : 0;
};

export const generateVerificationId = (): string => {
  return `RES-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};
