import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../../services/api";

const VideoSummary = () => {
  const { id } = useParams();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);
      const { data } = await apiService.summarizeVideo(id);
      setSummary(data?.summary || "");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optionally auto-generate on mount
    generate();
  }, [id]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Video Summary</h2>
        <button className="btn-secondary" onClick={generate} disabled={loading}>
          {loading ? 'Generating...' : 'Regenerate'}
        </button>
      </div>
      <div className="bg-white rounded shadow p-4 whitespace-pre-wrap">
        {summary || 'No summary yet.'}
      </div>
    </div>
  );
};

export default VideoSummary; 