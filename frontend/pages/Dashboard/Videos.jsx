import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadVideos = async () => {
    try {
      setLoading(true);
      const { data } = await apiService.getVideos();
      setVideos(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleSummarize = async (id) => {
    try {
      await apiService.summarizeVideo(id);
      navigate(`/dashboard/videos/${id}/summary`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteVideo(id);
      await loadVideos();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Videos</h2>
      <div className="grid gap-4">
        {videos.map((v) => (
          <div key={v._id} className="p-4 bg-white rounded shadow flex items-center justify-between">
            <div>
              <div className="font-medium">{v.originalUrl || v.storagePath}</div>
              <div className="text-sm text-gray-500">{new Date(v.createdAt).toLocaleString()}</div>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary" onClick={() => handleSummarize(v._id)}>Summarize</button>
              <button className="btn-secondary" onClick={() => navigate(`/dashboard/videos/${v._id}/summary`)}>View</button>
              <button className="btn-secondary" onClick={() => handleDelete(v._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos; 