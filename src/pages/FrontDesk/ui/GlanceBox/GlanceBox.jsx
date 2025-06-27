import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase';
import styles from './GlanceBox.module.css';

const GlanceBox = () => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    noShow: 0,
    idleChairs: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'appointments'));

        const todayObj = new Date();
        const today = todayObj.getFullYear() + '-' +
          String(todayObj.getMonth() + 1).padStart(2, '0') + '-' +
          String(todayObj.getDate()).padStart(2, '0'); // YYYY-MM-DD

        const todayAppointments = querySnapshot.docs
          .map(doc => {
            const data = doc.data();
            const start = data.starttime?.toDate?.();
            const dateStr = start?.toISOString()?.split('T')[0];
            return {
              id: doc.id,
              ...data,
              _dateString: dateStr
            };
          })
          .filter(appt => appt._dateString === today);

        const total = todayAppointments.length;
        const completed = todayAppointments.filter(a => a.checkin_status?.toLowerCase() === 'checkedin').length;
        const noShow = total - completed;
        const maxChairs = 5;
        const idleChairs = Math.max(0, maxChairs - completed);

        setStats({
          total,
          completed,
          noShow,
          idleChairs
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statList = [
    { label: 'Total', value: stats.total, color: '#2563eb' },
    { label: 'Completed', value: stats.completed, color: '#10b981' },
    { label: 'No-Shows', value: stats.noShow, color: '#ef4444' },
    { label: 'Idle Chairs', value: stats.idleChairs, color: '#f59e0b' }
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Today at a Glance</h3>
      <div className={styles.grid}>
        {statList.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.value} style={{ color: item.color }}>
              {item.value}
            </div>
            <div className={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlanceBox;