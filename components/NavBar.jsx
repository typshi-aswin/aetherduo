import styles from './Navbar.module.css';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const date = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        🦷 <span className={styles.brand}>DentEase</span>
      </div>

      <div className={styles.center}>
        <div className={styles.time}>{time}</div>
        <div className={styles.date}>{date}</div>
      </div>

      <div className={styles.right}>
        <FaUserCircle className={styles.profileIcon} size={28} />
      </div>
    </header>
  );
};

export default Navbar