import Sidebar from '../pages/admin/components/Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="bg-[#F7EEDF] min-h-screen">
      {/* Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <main className="ml-80 pt-16 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}