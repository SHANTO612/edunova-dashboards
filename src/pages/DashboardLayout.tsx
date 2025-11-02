import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import DashboardSidebar from '@/components/DashboardSidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
