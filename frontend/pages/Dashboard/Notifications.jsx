import { useEffect, useState, useRef } from 'react';
import apiService from '../../services/api';
import { connectNotificationSocket } from '../../services/notifications';
import DashboardLayout from '../../src/components/DashboardLayout';


const Notifications = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const wsRef = useRef(null);

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await apiService.getNotifications(50);
      setItems(data.data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const onMarkAll = async () => {
    try { await apiService.markAllNotificationsRead(); await load(); } catch (e) { console.error(e); }
  };

  const onMark = async (id) => {
    try { await apiService.markNotificationRead(id); await load(); } catch (e) { console.error(e); }
  };

  useEffect(() => {
    load();
    const token = localStorage.getItem('token');
    if (!token) return;
    wsRef.current = connectNotificationSocket(token, {
      onMessage: (evt) => {
        if (evt?.type === 'notification') {
          setItems((prev) => [{
            _id: evt.payload.id,
            type: evt.payload.type,
            title: evt.payload.title,
            message: evt.payload.message,
            data: evt.payload.data,
            createdAt: evt.payload.createdAt,
            read: false
          }, ...prev]);
        }
      }
    });
    return () => { try { wsRef.current?.close(); } catch (error) {
      console.error("error", error)
    } };
  }, []);

  return (
    <>
    <DashboardLayout>
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Notifications</h2>
        <button className="btn-secondary cursor-pointer" onClick={onMarkAll}>Mark all as read</button>
      </div>
      <div className="bg-white rounded shadow divide-y">
        {loading && <div className="p-4">Loading...</div>}
        {!loading && items.length === 0 && <div className="p-4 text-gray-600">No notifications</div>}
        {items.map((n) => (
          <div key={n._id} className="p-4 flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-500">{new Date(n.createdAt).toLocaleString()}</div>
              <div className="font-medium text-gray-900">{n.title}</div>
              <div className="text-gray-700">{n.message}</div>
            </div>
            {!n.read && <button className="btn-secondary" onClick={() => onMark(n._id)}>Mark read</button>}
          </div>
        ))}
      </div>
    </div>
    </DashboardLayout>
    </>
  );
};

export default Notifications; 