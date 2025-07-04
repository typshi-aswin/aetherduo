import styles from './Notifications.module.css';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { FaExclamationTriangle } from 'react-icons/fa';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  function formatTimeAgo(timestamp) {
    const now = new Date();
    const then = timestamp?.toDate?.();
    if (!then) return '';

    const diff = Math.floor((now - then) / 1000); // in seconds

    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minute${diff < 120 ? '' : 's'} ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour${diff < 7200 ? '' : 's'} ago`;
    return `${Math.floor(diff / 86400)} day${diff < 172800 ? '' : 's'} ago`;
  }
  useEffect(() => {
    const q = query(
      collection(db, 'emergency_appointments'),
      orderBy('timestamp', 'desc') // Show newest first
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Live Notifications</h3>
      {notifications.length === 0 ? (
        <p className={styles.noData}>No notifications yet.</p>
      ) : (
        <div key={notifications[0].id} className={styles.card}>
          <div className={styles.icon}>
            <FaExclamationTriangle color="#ef4444" />
          </div>
          <div className={styles.messageBlock}>
            <div className={styles.message}>
              Emergency added: {notifications[0].emergency_type} ({notifications[0].patient_name})
            </div>
            <div className={styles.time}>
              {formatTimeAgo(notifications[0].timestamp)}
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.pill}>View</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
