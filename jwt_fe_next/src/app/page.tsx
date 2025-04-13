"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
};

export default function Home() {
  const [loadPage, setLoadPage] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);
  const router = useRouter();

  const fetchUser = async (email: string) => {
    const response = await fetch("http://localhost:8080/v1/api/user", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to get user");
    }
    return response.json();
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      setLoadPage(false);
      return;
    }

    (async () => {
      const response = await fetchUser(email);

      setUser(response);
      setLoadPage(true);
    })();
  }, []);

  if (!loadPage) {
    router.push("/login");
  }

  return (
    <div>
      <h1>Hello, {user?.name}</h1>
    </div>
  );
}
