"use client";

import { useState } from "react";
import styles from "./register.module.css";
import { useRouter } from "next/navigation";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(false);
  const router = useRouter();

  const fetchRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    const response = await fetch("http://localhost:8080/v1/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.password !== password.confirmPassword) {
      setError(true);
      return;
    }

    await fetchRegister(name, email, password.password);

    await router.push("/login");
  };

  const handleChange = (value: string, name: string) => {
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword({ ...password, password: value });
    } else if (name === "confirmPassword") {
      setPassword({ ...password, confirmPassword: value });
    }
    setError(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.login_title}>Login</h2>
        <div className={styles.login_wrapper}>
          <label className={styles.login_label} htmlFor="name">
            Name
          </label>
          <input
            className={styles.login_input}
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              handleChange(e.target.value, "name");
            }}
            required
          />

          <label className={styles.login_label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.login_input}
            id="email"
            type="email"
            value={email}
            onChange={(e) => handleChange(e.target.value, "email")}
            required
          />

          <label className={styles.login_label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.login_input}
            id="password"
            type="password"
            value={password.password}
            onChange={(e) => handleChange(e.target.value, "password")}
            required
          />

          <label className={styles.login_label} htmlFor="password">
            Confirm your password
          </label>
          <input
            className={styles.login_input}
            id="confirmPassword"
            type="password"
            value={password.confirmPassword}
            onChange={(e) => handleChange(e.target.value, "confirmPassword")}
            required
          />
        </div>
        <button className={styles.login_button} type="submit">
          Login
        </button>
        {error && (
          <span className={styles.login_error_message}>
            Passwords do not match, please try again
          </span>
        )}
      </form>
    </div>
  );
};

export default Register;
