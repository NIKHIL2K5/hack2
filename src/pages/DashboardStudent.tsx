import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import { StudentDashboardLayout } from "@/components/student/StudentDashboardLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardStudent = () => {
  const dashboardProps = useStudentDashboard();
  const navigate = useNavigate();

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