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
  AreaChart,
  Area,
} from "recharts";
import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Users,
  Calendar,
  Target,
  Activity,
  Zap,
  BarChart3,
  ArrowUpRight,
  Star,
  Database,
  Flame,
  PieChart as PieChartIcon,
} from "lucide-react";

export default function LeadsAnalytics() {
  const [data, setData] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [latestDate, setLatestDate] = useState("");
  const [peakDay, setPeakDay] = useState("");
  const [leadSources, setLeadSources] = useState([]);
  const [avgLeads, setAvgLeads] = useState(0);
  const [weekdayData, setWeekdayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        const snapshot = await getDocs(collection(db, "contacts"));
        const raw = snapshot.docs.map((doc) => doc.data());
        if (!raw.length) {
          setIsLoading(false);
          return;
        }

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
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const statCards = [
    {
      label: "Total Leads",
      value: totalLeads,
      icon: Users,
      gradient: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-50 dark:bg-violet-900/20",
      textColor: "text-violet-600 dark:text-violet-400",
    },
    {
      label: "Latest Submission",
      value: latestDate || "—",
      icon: Calendar,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Peak Day",
      value: peakDay || "—",
      icon: TrendingUp,
      gradient: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      textColor: "text-pink-600 dark:text-pink-400",
    },
    {
      label: "Avg Leads / Day",
      value: avgLeads || "—",
      icon: Target,
      gradient: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      textColor: "text-amber-600 dark:text-amber-400",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <Flame className="absolute inset-0 w-6 h-6 text-purple-600 m-auto animate-pulse" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.div
        className="relative p-4 sm:p-6 font-serif md:p-10 md:ml-60"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 blur-xl animate-pulse opacity-75"></div>
                <div className="relative bg-gradient-to-r from-violet-500 to-purple-600 p-3 rounded-2xl shadow-2xl">
                  <Sparkles className="text-white w-8 h-8" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 dark:from-white dark:via-purple-100 dark:to-violet-100 bg-clip-text text-transparent">
                  Analytics Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                  Visualize lead trends, sources, and engagement with real-time
                  data
                </p>
              </div>
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Firebase Data</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span>Real-time Analytics</span>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statCards.map((item, i) => (
              <motion.div
                key={i}
                className="group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className={`absolute inset-0 ${item.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
                ></div>

                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${item.gradient} shadow-lg`}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {item.label}
                    </p>
                    <p className={`text-2xl font-bold ${item.textColor}`}>
                      {item.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
            <ChartCard
              title="📊 Leads Per Day"
              icon={BarChart3}
              gradient="from-blue-500 to-purple-600"
            >
              <BarChartComponent data={data} />
            </ChartCard>

            <ChartCard
              title="📈 Trend Overview"
              icon={Activity}
              gradient="from-emerald-500 to-teal-600"
            >
              <LineChartComponent data={data} />
            </ChartCard>
          </div>

          {/* Lead Sources & Weekday */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ChartCard
              title="🧭 Lead Sources"
              icon={PieChartIcon}
              gradient="from-pink-500 to-rose-600"
            >
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
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: 12,
                      border: "1px solid #e5e7eb",
                      color: "#1f2937",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard
              title="📅 Leads by Weekday"
              icon={Zap}
              gradient="from-amber-500 to-orange-600"
            >
              <BarChartComponent data={weekdayData} xKey="day" />
            </ChartCard>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ChartCard({ title, children, icon: Icon, gradient }) {
  return (
    <motion.div
      className="group relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
        style={{ background: `linear-gradient(to right, #8b5cf6, #ec4899)` }}
      ></div>

      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`p-2 rounded-lg bg-gradient-to-r ${gradient} shadow-lg`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <Star className="w-4 h-4 text-yellow-500" />
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

function BarChartComponent({ data, xKey = "date" }) {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <Database className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
        <XAxis dataKey={xKey} stroke="#6b7280" fontSize={12} />
        <YAxis allowDecimals={false} stroke="#6b7280" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            color: "#1f2937",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
            backdropFilter: "blur(10px)",
          }}
        />
        <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function LineChartComponent({ data }) {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
        <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
        <YAxis allowDecimals={false} stroke="#6b7280" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            color: "#1f2937",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
            backdropFilter: "blur(10px)",
          }}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#10b981"
          strokeWidth={3}
          fill="url(#colorGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
