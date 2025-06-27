import styles from './GlanceBox.module.css';

const GlanceBox = () => {
  const stats = [
    { label: 'Total', value: 15, color: '#2563eb' }, // blue
    { label: 'Completed', value: 8, color: '#10b981' },            // green
    { label: 'No-Shows', value: 2, color: '#ef4444' },             // red
    { label: 'Idle Chairs', value: 2, color: '#f59e0b' }       // amber
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Today at a Glance</h3>
      <div className={styles.grid}>
        {stats.map((item, index) => (
          <div key={index} className={styles.card}>
            <div
              className={styles.value}
              style={{ color: item.color }}
            >
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