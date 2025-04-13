import Link from "next/link";
import React from "react";

import styles from "./styles/navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_link_wrapper}>
        <Link className={styles.navbar_link} href="/register">
          Register
        </Link>
        <Link className={styles.navbar_link} href="/login">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
