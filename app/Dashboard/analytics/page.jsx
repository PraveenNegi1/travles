"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LeadsAnalytics() {
  const [data, setData] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [latestDate, setLatestDate] = useState("");
  const [peakDay, setPeakDay] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      const snapshot = await getDocs(collection(db, "contacts"));
      const raw = snapshot.docs.map((doc) => doc.data());

      if (!raw.length) return;

      const grouped = raw.reduce((acc, item) => {
        const date = format(item.createdAt.toDate(), "dd MMM");
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const formatted = Object.entries(grouped).map(([date, count]) => ({
        date,
        count,
      }));

      setData(formatted);
      setTotalLeads(raw.length);

      const sortedByDate = raw
        .map((item) => item.createdAt.toDate())
        .sort((a, b) => b - a);

      setLatestDate(format(sortedByDate[0], "dd MMM yyyy"));

      const max = formatted.reduce((prev, curr) =>
        curr.count > prev.count ? curr : prev
      );
      setPeakDay(`${max.date} (${max.count})`);
    };

    fetchLeads();
  }, []);

  return (
    <motion.div
      className="p-4 sm:p-6 md:p-10 min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 relative">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-800 dark:text-white flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-purple-400 blur-2xl animate-pulse dark:bg-blue-800" />
              <Sparkles className="relative text-indigo-600 dark:text-yellow-400 w-6 h-6 z-10" />
            </div>
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Monitor lead activity and trends visually.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { label: "Total Leads", value: totalLeads },
            { label: "Latest Submission", value: latestDate || "—" },
            { label: "Peak Day", value: peakDay || "—" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/90 dark:bg-gray-800 backdrop-blur shadow-xl border border-indigo-100 dark:border-gray-700 rounded-xl p-6 text-center hover:shadow-2xl transition"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.label}
              </p>
              <p className="text-2xl font-bold text-indigo-700 dark:text-yellow-400">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-indigo-700 dark:text-yellow-300 mb-4 flex items-center gap-2">
            📊 Leads Per Day
          </h2>
          {data.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No data available yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis allowDecimals={false} stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderRadius: 8,
                    border: "none",
                    color: "white",
                  }}
                />
                <Legend />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#a5b4fc" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <Bar
                  dataKey="count"
                  fill="url(#colorUv)"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </motion.div>
  );
}
