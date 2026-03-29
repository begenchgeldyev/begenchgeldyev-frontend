import { Link } from 'react-router-dom';
import styles from './header.module.sass';

export const Header = () => {
  return (
    <div className={styles.main}>
      <Link className={styles.menu_item} to="/">
        Geldyev Begench
      </Link>
      <div className={styles.menu}>
        <Link className={styles.menu_item} to="/blogs">
          Blogs
        </Link>
        <Link className={styles.menu_item} to="/projects">
          Projects
        </Link>
        <Link className={styles.menu_item} to="/cv">
          CV
        </Link>
      </div>
    </div>
  );
};
