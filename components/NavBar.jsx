import styles from './NavBar.module.css';
import { FaUserCircle } from 'react-icons/fa';
import { IoHome } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

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

  const navigate= useNavigate();

  return (
    <header className={styles.navbar}>
      <div className={styles.leftContainer} onClick={() => navigate(`/`)}>
        <IoHome size={20} style={{ color: 'white' }}/>
      <div className={styles.left}>
       <span className={styles.brand}>DentEase</span>
        
      </div>
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