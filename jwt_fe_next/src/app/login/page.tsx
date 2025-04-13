"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const fetchLogin = async (email: string, password: string) => {
    const response = await fetch("http://localhost:8080/v1/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    setError(!response.ok);

    if (!response.ok) {
      throw new Error("Failed to login user");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetchLogin(email, password);
      localStorage.setItem("email", email);
      await router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.login_title}>Login</h2>
        <div className={styles.login_wrapper}>
          <label className={styles.login_label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.login_input}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        </div>
        <button className={styles.login_button} type="submit">
          Login
        </button>
        {error && (
          <span className={styles.login_error_message}>
            Something went wrong. Please try again.
          </span>
        )}
      </form>
    </div>
  );
};

export default Login;
