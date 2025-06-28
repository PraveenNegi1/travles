"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { format, getDay } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LeadsAnalytics() {
  const [data, setData] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [latestDate, setLatestDate] = useState("");
  const [peakDay, setPeakDay] = useState("");
  const [leadSources, setLeadSources] = useState([]);
  const [avgLeads, setAvgLeads] = useState(0);
  const [weekdayData, setWeekdayData] = useState([]);

  const COLORS = ["#93c5fd", "#6ee7b7", "#fcd34d", "#fca5a5", "#a5b4fc"];

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

      const formatted = Object.entries(grouped)
        .map(([date, count]) => ({
          date,
          count,
          sortDate: new Date(`${date} 2024`),
        }))
        .sort((a, b) => a.sortDate - b.sortDate)
        .map(({ date, count }) => ({ date, count }));

      const sourceGroup = raw.reduce((acc, item) => {
        const src = item.source || "Unknown";
        acc[src] = (acc[src] || 0) + 1;
        return acc;
      }, {});
      const sourceFormatted = Object.entries(sourceGroup).map(
        ([source, count]) => ({
          name: source,
          value: count,
        })
      );

      const sortedByDate = raw
        .map((item) => item.createdAt.toDate())
        .sort((a, b) => b - a);

      const max = formatted.reduce((prev, curr) =>
        curr.count > prev.count ? curr : prev
      );

      const uniqueDays = new Set(formatted.map((d) => d.date));
      const avgLeads = Math.round(raw.length / uniqueDays.size);

      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const weekdayGroup = raw.reduce((acc, item) => {
        const weekday = weekdays[getDay(item.createdAt.toDate())];
        acc[weekday] = (acc[weekday] || 0) + 1;
        return acc;
      }, {});
      const weekdayFormatted = weekdays.map((day) => ({
        day,
        count: weekdayGroup[day] || 0,
      }));

      setData(formatted);
      setLeadSources(sourceFormatted);
      setTotalLeads(raw.length);
      setLatestDate(format(sortedByDate[0], "dd MMM yyyy"));
      setPeakDay(`${max.date} (${max.count})`);
      setAvgLeads(avgLeads);
      setWeekdayData(weekdayFormatted);
    };

    fetchLeads();
  }, []);

  return (
    <motion.div
      className="p-4 sm:p-6 font-serif md:p-10 md:ml-60 min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-700 dark:text-white flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-purple-300 blur-2xl animate-pulse dark:bg-blue-800" />
              <Sparkles className="relative text-indigo-600 dark:text-yellow-400 w-6 h-6 z-10" />
            </div>
            Analytics Dashboard
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Visualize lead trends, sources, and engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-10">
          {[
            { label: "Total Leads", value: totalLeads },
            { label: "Latest Submission", value: latestDate || "—" },
            { label: "Peak Day", value: peakDay || "—" },
            { label: "Avg Leads / Day", value: avgLeads || "—" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#f9fafb] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.label}
              </p>
              <p className="text-2xl font-bold text-slate-700 dark:text-yellow-400">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          <ChartCard title="📊 Leads Per Day">
            <BarChartComponent data={data} />
          </ChartCard>

          <ChartCard title="📈 Trend Overview">
            <LineChartComponent data={data} />
          </ChartCard>
        </div>

        {/* Lead Sources & Weekday */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ChartCard title="🧭 Lead Sources">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadSources}
                  cx="50%"  
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {leadSources.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="📅 Leads by Weekday">
            <BarChartComponent data={weekdayData} xKey="day" />
          </ChartCard>
        </div>
      </div>
    </motion.div>
  );
}

// Chart wrapper with consistent styles
function ChartCard({ title, children }) {
  return (
    <div className="bg-[#f9fafb] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-slate-700 dark:text-yellow-300 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

// Reusable Bar Chart
function BarChartComponent({ data, xKey = "date" }) {
  if (!data.length) {
    return (
      <p className="text-gray-600 dark:text-gray-400">No data available.</p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} stroke="#94a3b8" />
        <YAxis allowDecimals={false} stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#ffffff",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            color: "#1f2937",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          }}
        />
        <Bar dataKey="count" fill="#93c5fd" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Reusable Line Chart
function LineChartComponent({ data }) {
  if (!data.length) {
    return (
      <p className="text-gray-600 dark:text-gray-400">No data available.</p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="#94a3b8" />
        <YAxis allowDecimals={false} stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#ffffff",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            color: "#1f2937",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#34d399"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
