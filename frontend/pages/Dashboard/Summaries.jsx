import { useEffect, useState } from 'react';
import apiService from '../../services/api';
import DashboardLayout from '../../src/components/DashboardLayout';

const Summaries = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const { data } = await apiService.getVideos();
        setItems((data || []).filter((v) => v.summary && v.summary.length > 0));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <>
   
    <DashboardLayout>
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Summaries</h2>
      <div className="space-y-4">
        {items.map((v) => (
          <div key={v._id} className="bg-white rounded shadow p-4">
            <div className="text-sm text-gray-500 mb-2">{new Date(v.createdAt).toLocaleString()}</div>
            <div className="whitespace-pre-wrap">{v.summary}</div>
          </div>
        ))}
        {items.length === 0 && <div className="text-gray-600">No summaries yet.</div>}
      </div>
    </div>
    </DashboardLayout>
    </>
  );
};

export default Summaries; 