export function connectNotificationSocket(token, { onOpen, onMessage, onClose, onError } = {}) {
  const ws = new WebSocket(`ws://localhost:8080/ws/notifications?token=${encodeURIComponent(token)}`);

  if (onOpen) ws.onopen = onOpen;
  ws.onmessage = (event) => {
    try {
      const parsed = JSON.parse(event.data);
      if (onMessage) onMessage(parsed);
    } catch (err) {
      console.error('error fetching notification', err)
    }
  };
  if (onClose) ws.onclose = onClose;
  if (onError) ws.onerror = onError;

  return ws;
} 