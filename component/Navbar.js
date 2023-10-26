import Link from "next/link";
import styles from "../styles/Navbar.module.css"; // Import the CSS module

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar.ul}>
        <li className={styles.navbar.li}>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/create-college/college">Create College</Link>
        </li>
        <li>
          <Link href="/create-student/student">Create Student</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
