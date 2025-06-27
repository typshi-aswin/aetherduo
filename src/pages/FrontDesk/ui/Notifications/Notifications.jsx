import styles from './Notifications.module.css';
import { FaClock, FaExclamationTriangle } from 'react-icons/fa';

const notifications = [
  {
    icon: <FaClock color="#f59e0b" />,
    message: 'Arya Krishnan is 10 mins late',
    time: '2 mins ago',
    type: 'late'
  },
  {
    icon: <FaExclamationTriangle color="#ef4444" />, 
    message: 'Emergency added: Knocked-Out Tooth',
    time: '5 mins ago',
    type: 'emergency'
  }
];

const Notifications = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Live Notifications</h3>
      {notifications.map((note, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.icon}>
            {note.icon}
          </div>
          <div className={styles.messageBlock}>
            <div className={styles.message}>{note.message}</div>
            <div className={styles.time}>{note.time}</div>
          </div>
          <div className={styles.actions}>
            <button className={styles.pill}>View</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;