import DashboardLayout from "../../src/components/DashboardLayout";
import Footer from "../../src/components/Footer";

const Support = () => {
  return (
    <DashboardLayout>
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Support</h2>
      <div className="bg-white rounded shadow p-6 text-gray-700">
        Contact support at support@example.com
      </div>
      <Footer/>
    </div>

    </DashboardLayout> 
  );
};

export default Support; 