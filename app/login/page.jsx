"use client";

import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
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
      toast.success("Welcome back!");
      setTimeout(() => {
        router.push("/dashboard/leads");
      }, 1000);
    } catch {
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
      toast.success("Signed in with Google");
      setTimeout(() => {
        router.push("/dashboard/leads");
      }, 1000);
    } catch {
      toast.error("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-serif bg-gray-50 p-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/logo/Animation-2.gif"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto"
            priority
          />
          <h1 className="text-2xl font-bold text-[#1c4e75] mt-4">
            Welcome Back
          </h1>
          <p className="text-[#1c4e75] text-sm">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-[#1c4e75]"
            >
              Email Address
            </label>
            <div className="relative mt-1">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1c4e75]" />
              <input
                type="email"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1c4e75] focus:border-blue-500 text-gray-800"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#1c4e75]"
            >
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1c4e75]" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#1c4e75] focus:border-[#164366] text-gray-800"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1c4e75] hover:text-gray-700"
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

          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#1c4e75] text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-2 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
