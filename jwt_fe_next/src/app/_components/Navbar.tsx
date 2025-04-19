"use client";

import Link from "next/link";
import React from "react";

import styles from "./styles/navbar.module.css";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_link_wrapper}>
        <Link className={styles.navbar_link} href="/register">
          Register
        </Link>
        <Link className={styles.navbar_link} href="/login">
          Login
        </Link>
        <button className={styles.navbar_link} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
