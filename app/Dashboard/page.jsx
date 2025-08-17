"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function dashboardHome() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/Dashboard/leads");
      } else {
        router.replace("/(frontend)/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return null;
}