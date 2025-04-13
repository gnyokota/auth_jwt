"use client";

import { useState } from "react";
import styles from "./register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("name:", name);
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.login_title}>Login</h2>
        <div className={styles.login_wrapper}>
          <label className={styles.login_label} htmlFor="username">
            Name
          </label>
          <input
            className={styles.login_input}
            id="name"
            type="text"
            value={username}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className={styles.login_label} htmlFor="username">
            Username
          </label>
          <input
            className={styles.login_input}
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className={styles.login_label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.login_input}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className={styles.login_label} htmlFor="password">
            Confirm your password
          </label>
          <input
            className={styles.login_input}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={styles.login_button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
