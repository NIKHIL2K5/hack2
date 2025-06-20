
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { isValidOfficialEmail, getOrganizationByEmail } from "@/services/officialAuth";

interface FormData {
  name: string;
  startup: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useStartupAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    startup: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that email ends with "org.in"
    if (!formData.email.toLowerCase().endsWith('org.in')) {
      toast.error("Only official organization emails ending with 'org.in' are allowed!");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    // Check if email is from an allowed organization
    if (!isValidOfficialEmail(formData.email)) {
      toast.error("This email is not registered as an official organization partner. Please contact support if you believe this is an error.");
      return;
    }

    // Get organization details
    const organization = getOrganizationByEmail(formData.email);
    if (!organization) {
      toast.error("Unable to find organization details for this email.");
      return;
    }

    // Create official user object and store it
    const officialUser = {
      email: formData.email,
      name: formData.name || `${organization.name} User`,
      organization: organization,
      department: "HR/Recruitment",
      employeeId: `EMP_${Date.now()}`,
      registeredAt: new Date().toISOString()
    };

    // Store in localStorage
    localStorage.setItem('officialUser', JSON.stringify(officialUser));

    // Simulate authentication
    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
    setTimeout(() => {
      navigate("/dashboard/startup");
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return {
    isLogin,
    setIsLogin,
    showPassword,
    setShowPassword,
    formData,
    handleSubmit,
    handleInputChange
  };
};
