"use client";

import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  Shield,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUsername("");
    setPassword("");
    setShowPassword(false);
    setError("");
    setMounted(true);
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
      toast.success("🎉 Welcome back! Redirecting...");
      setTimeout(() => {
        router.push("/Dashboard/leads");
      }, 1000);
    } catch (err) {
      toast.error("❌ Invalid email or password");
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
      toast.success("🚀 Google sign-in successful!");
      setTimeout(() => {
        router.push("/Dashboard/leads");
      }, 1000);
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        toast("✋ Popup closed before login", { icon: "ℹ️" });
      } else {
        toast.error("❌ Google sign-in failed");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-serif flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float delay-0"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-float delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-float delay-3000"></div>

        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl",
          style: {
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "16px",
            padding: "16px 20px",
            fontSize: "14px",
            fontWeight: "500",
          },
        }}
      />

      <div
        className={`relative w-full max-w-md transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Main login card */}
        <div className="bg-white/10 backdrop-blur-2xl shadow-2xl rounded-3xl p-8 border border-white/20 relative overflow-hidden">
          {/* Animated Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-sm animate-pulse-border"></div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-80 animate-bounce-slow"></div>
          <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full opacity-80 animate-bounce-slow delay-1000"></div>
          <div className="absolute top-1/2 -right-4 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full opacity-60 animate-bounce-slow delay-2000"></div>

          {/* Logo Section */}
          <div className="text-center mb-8 relative">
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                <Image
                  src="/logo/Animation-2.gif"
                  alt="Car Animation"
                  width={100}
                  height={80}
                  className="mx-auto rounded-xl"
                  priority
                />
              </div>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-pulse"></div>
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-2 mt-6">
              Welcome Back
            </h1>
            <p className="text-white/70 text-sm flex items-center justify-center gap-2 font-medium">
              <Shield className="w-4 h-4" />
              Secure Dashboard Access
              <Sparkles className="w-4 h-4" />
            </p>
          </div>

          <div className="space-y-6">
            {/* Email Input */}
            <div className="space-y-3">
              <label
                htmlFor="username"
                className="block text-[18px] font-semibold text-white/90"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail
                    className={`w-5 h-5 transition-all duration-300 ${
                      isEmailFocused
                        ? "text-blue-400 scale-110"
                        : "text-white/50"
                    }`}
                  />
                </div>
                <input
                  type="email"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-white/40 text-white text-sm hover:bg-white/10 group-hover:shadow-lg"
                  placeholder="Enter your email address"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-3">
              <label
                htmlFor="password"
                className="block text-[18px] font-semibold text-white/90"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock
                    className={`w-5 h-5 transition-all duration-300 ${
                      isPasswordFocused
                        ? "text-blue-400 scale-110"
                        : "text-white/50"
                    }`}
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  required
                  autoComplete="current-password"
                  className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-white/40 text-white text-sm hover:bg-white/10 group-hover:shadow-lg"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white transition-all duration-300 hover:scale-110"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4 text-red-200 text-sm font-medium animate-shake-enhanced">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  {error}
                </div>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className={`w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 hover:scale-105 group relative overflow-hidden ${
                loading
                  ? "opacity-70 cursor-not-allowed transform-none scale-100"
                  : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span className="relative z-10">
                {loading ? "Signing in..." : "Sign In"}
              </span>
              {!loading && (
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              )}
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-6 bg-white/10 backdrop-blur-xl text-white/70 font-medium rounded-full border border-white/20">
                  or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className={`w-full flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 py-4 rounded-2xl font-medium text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white/20 transform hover:-translate-y-1 hover:scale-105 group relative overflow-hidden ${
                loading
                  ? "opacity-50 cursor-not-allowed transform-none scale-100"
                  : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <FcGoogle size={24} className="relative z-10" />
              <span className="relative z-10">Continue with Google</span>
            </button>
          </div>
        </div>

        {/* Enhanced Bottom Shadow */}
        <div className="absolute inset-x-0 -bottom-4 h-8 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
        <div className="absolute inset-x-0 -bottom-2 h-4 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30 rounded-3xl blur-lg"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulse-border {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes shake-enhanced {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-pulse-border {
          animation: pulse-border 3s ease-in-out infinite;
        }
        .animate-shake-enhanced {
          animation: shake-enhanced 0.6s ease-in-out;
        }
        .bg-grid-pattern {
          background-image: radial-gradient(
            circle at 1px 1px,
            rgba(255, 255, 255, 0.15) 1px,
            transparent 0
          );
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}
