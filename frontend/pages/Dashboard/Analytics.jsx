import { useEffect, useState } from 'react';
import apiService from '../../services/api';
import {  FaSadCry } from 'react-icons/fa';
import DashboardLayout from '../../src/components/DashboardLayout';

const Pie = ({ data }) => {
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1;
  let cumulative = 0;
  const colors = ['#6366F1', '#22C55E', '#F59E0B', '#EF4444', '#06B6D4', '#A78BFA'];
  const entries = Object.entries(data);

  const arcs = entries.map(([label, value], idx) => {
    const startAngle = (cumulative / total) * 2 * Math.PI;
    cumulative += value;
    const endAngle = (cumulative / total) * 2 * Math.PI;

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const radius = 80;
    const cx = 100, cy = 100;
    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);

    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return { d, color: colors[idx % colors.length], label, value };
  });

  return (
    <div className="flex items-center gap-6">
      <svg width="200" height="200" viewBox="0 0 200 200">
        {arcs.map((a, i) => (
          <path key={i} d={a.d} fill={a.color} />
        ))}
      </svg>
      <div className="space-y-2">
        {arcs.map((a, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: a.color }} />
            <span className="text-gray-700">{a.label}:</span>
            <span className="text-gray-900 font-medium">{a.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Analytics = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const { data } = await apiService.getAnalyticsOverview();
        setOverview(data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <div className="p-6 items-center justify-center h-screen w-screen flex flex-col">Loading...</div>;
  if (!overview) return <div className="p-6 items-center justify-center bg-gray-400 h-screen w-screen flex flex-col">No data. please connect to internet and try again! <FaSadCry className='text-9xl opacity-40'/></div>;

  return (
    <DashboardLayout>
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-6">
          <h3 className="font-semibold mb-2">Status Distribution</h3>
          <Pie data={overview.statusDistribution} />
        </div>
        <div className="bg-white rounded shadow p-6">
          <h3 className="font-semibold mb-2">Mood Distribution</h3>
          <Pie data={overview.moodDistribution} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded shadow p-6">
          <div className="text-gray-600">Total Videos</div>
          <div className="text-3xl font-bold">{overview.totalVideos}</div>
        </div>
        <div className="bg-white rounded shadow p-6">
          <div className="text-gray-600">Summarized Videos</div>
          <div className="text-3xl font-bold">{overview.summarizedVideos}</div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default Analytics; 