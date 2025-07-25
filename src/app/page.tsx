"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "../components/SplashScreen";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");

    if (hasSeenSplash) {
      router.replace("/welcome");
    } else {
      const timeout: NodeJS.Timeout = setTimeout(() => {
        localStorage.setItem("hasSeenSplash", "true");
        router.replace("/welcome");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [router]);

  return <SplashScreen />;
}
