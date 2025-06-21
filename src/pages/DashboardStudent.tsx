import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import { StudentDashboardLayout } from "@/components/student/StudentDashboardLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { authService } from "@/services/authService";

const DashboardStudent = () => {
  const dashboardProps = useStudentDashboard();
  const navigate = useNavigate();

  // Check if user is logged in and has the correct role
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login/student');
      return;
    }
    
    if (currentUser.role !== 'student') {
      navigate(`/dashboard/${currentUser.role}`);
    }
  }, [navigate]);

  // Ensure navigation works correctly
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <StudentDashboardLayout 
      {...dashboardProps} 
      onNavigate={handleNavigation}
    />
  );
};

export default DashboardStudent;