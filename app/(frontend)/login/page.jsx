"use client";

import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";


export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUsername("");
    setPassword("");
    setShowPassword(false);
    setError("");
    const passwordInput = document.getElementById("password");
    if (passwordInput) passwordInput.value = "";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const token = await userCredential.user.getIdToken();
      document.cookie = `token=${token}; path=/;`;
      toast.success("Login successful!");
      setTimeout(() => {
        router.push("/Dashboard/leads");
      }, 1000);
    } catch (err) {
      toast.error("Invalid email or password");
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      document.cookie = `token=${token}; path=/;`;
      toast.success("Logged in with Google!");
      setTimeout(() => {
        router.push("/Dashboard/leads");
      }, 1000);
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        toast("Popup closed before login", { icon: "✋" });
      } else {
        toast.error("Google sign-in failed");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <Toaster position="top-center" />
      {/* Lottie Animation (GIF) */}

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <Image
          src="/logo/Animation.gif"
          alt="Car Animation"
          width={150}
          height={125}
          className="mb-6 flex mx-auto"
          priority
        />

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Dashboard
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
                tabIndex={-1}
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-[#1c4e75] text-white py-2 rounded-md font-semibold transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#1c4e75cc]"
            }`}
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="relative my-4 text-center">
          <span className="text-gray-500 text-sm">OR</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md font-medium text-gray-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
        <FcGoogle size={24} />
        Login with Google
        </button>
      </div>
    </div>
  );
}
