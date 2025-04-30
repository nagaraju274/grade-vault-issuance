
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    setIsLoading(true);

    // In a real application, this would be an API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Mocking login logic - in a real app, this would check credentials with the backend
      const userTypeMap: Record<string, any> = {
        "admin@example.com": {
          id: "admin-1",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          department: "IT",
          position: "System Administrator",
        },
        "faculty@example.com": {
          id: "faculty-1",
          name: "Faculty User",
          email: "faculty@example.com",
          role: "faculty",
          department: "Computer Science",
          designation: "Associate Professor",
        },
        "student@example.com": {
          id: "student-1",
          name: "Student User",
          email: "student@example.com",
          role: "student",
          rollNumber: "CS-2023-001",
          program: "Computer Science",
          batch: "2023",
          dateOfBirth: "2000-05-15",
        },
      };

      const user = userTypeMap[values.email.toLowerCase()];

      if (user && values.password === "password123") {
        // Store the user in localStorage (in a real app, store a JWT token instead)
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(`Login successful as ${user.role}!`);
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login to GradeVault</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-edu-navy" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-gray-500 text-center w-full">
          <p>
            Demo accounts: 
            <br />
            admin@example.com / password123
            <br />
            faculty@example.com / password123
            <br />
            student@example.com / password123
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
