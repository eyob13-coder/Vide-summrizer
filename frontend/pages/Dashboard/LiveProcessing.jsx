import { useState } from 'react';
import apiService from '../../services/api';

const LiveProcessing = () => {
  const [streamUrl, setStreamUrl] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = async () => {
    try {
      setLoading(true);
      const { data } = await apiService.startLive(streamUrl);
      setSessionId(data.sessionId);
      poll(data.sessionId);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const poll = async (sid) => {
    try {
      const { data } = await apiService.getLiveHighlights(sid);
      setHighlights(data.highlights || []);
      setTimeout(() => poll(sid), 5000);
    } catch (e) {
      console.error(e);
    }
  };

  const end = async () => {
    try {
      await apiService.endLive(sessionId);
      setSessionId('');
      setHighlights([]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Live Processing</h2>
      <div className="bg-white rounded shadow p-4 space-y-4">
        <input
          type="text"
          value={streamUrl}
          onChange={(e) => setStreamUrl(e.target.value)}
          placeholder="Enter stream URL (e.g., RTMP, HLS)"
          className="w-full px-3 py-2 border rounded"
        />
        <div className="flex gap-2">
          <button className="btn-primary" onClick={start} disabled={loading || !streamUrl}>Start</button>
          <button className="btn-secondary" onClick={end} disabled={!sessionId}>End</button>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Highlights</h3>
          <div className="space-y-2">
            {highlights.map((h, i) => (
              <div key={i} className="bg-gray-50 rounded p-3">
                <div className="text-sm text-gray-500">{new Date(h.timestamp).toLocaleTimeString()}</div>
                <div className="text-gray-800">{h.transcript}</div>
                <div className="text-xs text-gray-500">Scene: {h.scene} | Score: {h.highlightScore?.toFixed(2)}</div>
              </div>
            ))}
            {highlights.length === 0 && <div className="text-gray-600">No highlights yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveProcessing; 