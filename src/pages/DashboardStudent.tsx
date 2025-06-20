
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import { StudentDashboardLayout } from "@/components/student/StudentDashboardLayout";

const DashboardStudent = () => {
  const dashboardProps = useStudentDashboard();

  return <StudentDashboardLayout {...dashboardProps} />;
};

export default DashboardStudent;
