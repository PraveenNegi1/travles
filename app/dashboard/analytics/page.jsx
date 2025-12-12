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
  Database,
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
  const [collectionSources, setCollectionSources] = useState([]);
  const [confirmationStatus, setConfirmationStatus] = useState([]);

  const COLORS = {
    light: {
      primary: "#3B82F6",
      secondary: "#8B5CF6",
      accent: "#EC4899",
      success: "#10B981",
      warning: "#F59E0B",
      danger: "#EF4444",
      gradient: ["#3B82F6", "#8B5CF6", "#EC4899", "#10B981"],
      cardBg: "#FFFFFF",
      border: "#E5E7EB",
      text: "#1F2937",
      textSecondary: "#6B7280",
      chartGrid: "#F3F4F6",
    },
    dark: {
      primary: "#60A5FA",
      secondary: "#A78BFA",
      accent: "#F472B6",
      success: "#34D399",
      warning: "#FBBF24",
      danger: "#F87171",
      gradient: ["#60A5FA", "#A78BFA", "#F472B6", "#34D399"],
      cardBg: "#1F2937",
      border: "#374151",
      text: "#F9FAFB",
      textSecondary: "#D1D5DB",
      chartGrid: "#374151",
    },
  };

  const isDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const theme = isDark ? COLORS.dark : COLORS.light;

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);

        const contactsSnapshot = await getDocs(collection(db, "contacts"));
        const contactsRaw = contactsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          collection: "contacts",
        }));

        const travelSnapshot = await getDocs(collection(db, "travelInquiries"));
        const travelRaw = travelSnapshot.docs.map((doc) => ({
          ...doc.data(),
          collection: "travelInquiries",
        }));

        const raw = [...contactsRaw, ...travelRaw];
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

        const collectionGroup = raw.reduce((acc, item) => {
          const col = item.collection;
          acc[col] = (acc[col] || 0) + 1;
          return acc;
        }, {});
        const collectionFormatted = Object.entries(collectionGroup).map(
          ([collection, count]) => ({
            name: collection,
            value: count,
          })
        );

        const statusGroup = raw.reduce((acc, item) => {
          const status = item.confirmed ? "Yes" : "No";
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});
        const statusFormatted = Object.entries(statusGroup).map(
          ([status, count]) => ({
            name: status,
            value: count,
          })
        );

        setData(formatted);
        setLeadSources(sourceFormatted);
        setTotalLeads(raw.length);
        setLatestDate(format(sortedByDate[0], "dd MMM yyyy"));
        setPeakDay(`${max.date} (${max.count})`);
        setAvgLeads(avgLeads);
        setWeekdayData(weekdayFormatted);
        setCollectionSources(collectionFormatted);
        setConfirmationStatus(statusFormatted);
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
      color: theme.primary,
      bgGradient: isDark ? "from-blue-500/20 to-blue-600/20" : "from-blue-50 to-blue-100"
    },
    { 
      label: "Latest Submission", 
      value: latestDate || "—", 
      icon: Calendar,
      color: theme.secondary,
      bgGradient: isDark ? "from-purple-500/20 to-purple-600/20" : "from-purple-50 to-purple-100"
    },
    { 
      label: "Peak Day", 
      value: peakDay || "—", 
      icon: TrendingUp,
      color: theme.accent,
      bgGradient: isDark ? "from-pink-500/20 to-pink-600/20" : "from-pink-50 to-pink-100"
    },
    { 
      label: "Avg Leads / Day", 
      value: avgLeads || "—", 
      icon: Target,
      color: theme.success,
      bgGradient: isDark ? "from-green-500/20 to-green-600/20" : "from-green-50 to-green-100"
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-700 dark:text-gray-200 font-semibold text-lg"
          >
            Loading analytics...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <motion.div
        className="relative p-4 sm:p-6 md:p-8 lg:p-10 md:ml-60"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <motion.div 
                className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Sparkles className="text-white w-7 h-7 sm:w-8 sm:h-8" />
              </motion.div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Analytics Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base lg:text-lg">
                  Visualize lead trends, sources, and engagement metrics
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {statCards.map((item, i) => (
              <motion.div
                key={i}
                className={`relative overflow-hidden bg-gradient-to-br ${item.bgGradient} backdrop-blur-sm
                           rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl 
                           transition-all duration-300 border border-white/20 dark:border-gray-700/50`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -mr-12 -mt-12" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      className="p-2.5 sm:p-3 rounded-xl shadow-lg"
                      style={{ backgroundColor: item.color }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </motion.div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">
                    {item.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold" style={{ color: item.color }}>
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-8 lg:mb-10">
            <ChartCard
              title="Leads Per Day"
              icon={BarChart3}
              color={theme.primary}
              gradient="from-blue-500 to-cyan-500"
            >
              <BarChartComponent
                data={data}
                color={theme.primary}
                isDark={isDark}
              />
            </ChartCard>

            <ChartCard
              title="Trend Overview"
              icon={Activity}
              color={theme.secondary}
              gradient="from-purple-500 to-pink-500"
            >
              <LineChartComponent
                data={data}
                color={theme.secondary}
                isDark={isDark}
              />
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-8 lg:mb-10">
            <ChartCard
              title="Lead Sources"
              icon={Database}
              color={theme.accent}
              gradient="from-pink-500 to-rose-500"
            >
              <PieChartComponent
                data={leadSources}
                colors={theme.gradient}
                theme={theme}
              />
            </ChartCard>

            <ChartCard 
              title="Leads by Weekday" 
              icon={Zap} 
              color={theme.success}
              gradient="from-green-500 to-emerald-500"
            >
              <HeartbeatChartComponent
                data={weekdayData}
                color={theme.success}
                isDark={isDark}
              />
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            <ChartCard
              title="Leads by Collection"
              icon={Database}
              color={theme.warning}
              gradient="from-orange-500 to-amber-500"
            >
              <PieChartComponent
                data={collectionSources}
                colors={theme.gradient}
                theme={theme}
              />
            </ChartCard>

            <ChartCard
              title="Confirmation Status"
              icon={Target}
              color={theme.danger}
              gradient="from-red-500 to-pink-500"
            >
              <PieChartComponent
                data={confirmationStatus}
                colors={[theme.success, theme.danger]}
                theme={theme}
              />
            </ChartCard>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ChartCard({ title, children, icon: Icon, color, gradient }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 
                 rounded-2xl p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-full -mr-16 -mt-16`} />
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <motion.div 
            className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

function BarChartComponent({ data, color, isDark }) {
  if (!data.length) return <NoData icon={Database} />;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.9} />
            <stop offset="100%" stopColor={color} stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDark ? "#374151" : "#E5E7EB"}
          opacity={0.5}
        />
        <XAxis
          dataKey="date"
          stroke={isDark ? "#9CA3AF" : "#6B7280"}
          fontSize={12}
          fontWeight={500}
        />
        <YAxis 
          stroke={isDark ? "#9CA3AF" : "#6B7280"} 
          fontSize={12}
          fontWeight={500}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
            color: isDark ? "#F9FAFB" : "#1F2937",
            borderRadius: "12px",
            border: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            padding: "12px",
          }}
          cursor={{ fill: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
        />
        <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function LineChartComponent({ data, color, isDark }) {
  if (!data.length) return <NoData icon={Activity} />;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.5} />
            <stop offset="100%" stopColor={color} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDark ? "#374151" : "#E5E7EB"}
          opacity={0.5}
        />
        <XAxis
          dataKey="date"
          stroke={isDark ? "#9CA3AF" : "#6B7280"}
          fontSize={12}
          fontWeight={500}
        />
        <YAxis 
          stroke={isDark ? "#9CA3AF" : "#6B7280"} 
          fontSize={12}
          fontWeight={500}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
            color: isDark ? "#F9FAFB" : "#1F2937",
            borderRadius: "12px",
            border: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            padding: "12px",
          }}
          cursor={{ stroke: color, strokeWidth: 2, strokeDasharray: "5 5" }}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke={color}
          strokeWidth={3}
          fill="url(#lineGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function HeartbeatChartComponent({ data, color, isDark }) {
  if (!data.length) return <NoData icon={Zap} />;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <defs>
          <linearGradient id="pulseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.6} />
            <stop offset="100%" stopColor={color} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDark ? "#374151" : "#E5E7EB"}
          opacity={0.5}
        />
        <XAxis
          dataKey="day"
          stroke={isDark ? "#9CA3AF" : "#6B7280"}
          fontSize={12}
          fontWeight={500}
        />
        <YAxis 
          stroke={isDark ? "#9CA3AF" : "#6B7280"} 
          fontSize={12}
          fontWeight={500}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
            color: isDark ? "#F9FAFB" : "#1F2937",
            borderRadius: "12px",
            border: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            padding: "12px",
          }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke={color}
          strokeWidth={3}
          dot={{
            r: 6,
            stroke: "white",
            strokeWidth: 3,
            fill: color,
          }}
          activeDot={{
            r: 9,
            stroke: "white",
            strokeWidth: 3,
            fill: color,
          }}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke="none"
          fill="url(#pulseGradient)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function NoData({ icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center h-[300px] text-gray-400 dark:text-gray-500">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-12 h-12 opacity-30 mb-3" />
        <p className="text-sm font-medium">No data available</p>
      </motion.div>
    </div>
  );
}

function PieChartComponent({ data, colors, theme }) {
  if (!data.length) return <NoData icon={Database} />;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
          outerRadius={100}
          dataKey="value"
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell 
              key={i} 
              fill={colors[i % colors.length]}
              style={{
                filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
              }}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: theme.cardBg,
            color: theme.text,
            borderRadius: "12px",
            border: `1px solid ${theme.border}`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            padding: "12px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}