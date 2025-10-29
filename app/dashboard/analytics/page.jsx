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
  const [collectionSources, setCollectionSources] = useState([]);
  const [confirmationStatus, setConfirmationStatus] = useState([]);

  const MAIN_COLOR = "#1c4e75";
  const PIE_COLORS = ["#1c4e75", "#06402B", "#FF0000"];

  const isDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

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
    { label: "Total Leads", value: totalLeads, icon: Users },
    { label: "Latest Submission", value: latestDate || "—", icon: Calendar },
    { label: "Peak Day", value: peakDay || "—", icon: TrendingUp },
    { label: "Avg Leads / Day", value: avgLeads || "—", icon: Target },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#1c4e75] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <motion.div
        className="relative p-4 sm:p-6 font-serif md:p-10 md:ml-60"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-[#1c4e75]">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  Analytics Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-base">
                  Visualize lead trends, sources, and engagement
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statCards.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                           rounded-xl p-6 shadow-md hover:shadow-lg hover:shadow-[#1c4e75]/30 
                           transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-full bg-[#1c4e75]">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
                  {item.label}
                </p>
                <p className="text-2xl font-bold text-[#1c4e75] dark:text-white">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
            <ChartCard
              title="Leads Per Day"
              icon={BarChart3}
              color={MAIN_COLOR}
            >
              <BarChartComponent
                data={data}
                color={MAIN_COLOR}
                isDark={isDark}
              />
            </ChartCard>

            <ChartCard
              title="Trend Overview"
              icon={Activity}
              color={MAIN_COLOR}
            >
              <LineChartComponent
                data={data}
                color={MAIN_COLOR}
                isDark={isDark}
              />
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ChartCard
              title="Lead Sources"
              icon={PieChartIcon}
              color={MAIN_COLOR}
            >
              <PieChartComponent
                data={leadSources}
                colors={PIE_COLORS}
                color={MAIN_COLOR}
              />
            </ChartCard>

            <ChartCard title="Leads by Weekday" icon={Zap} color={MAIN_COLOR}>
              <HeartbeatChartComponent
                data={weekdayData}
                color={MAIN_COLOR}
                isDark={isDark}
              />
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
            <ChartCard
              title="Leads by Collection"
              icon={PieChartIcon}
              color={MAIN_COLOR}
            >
              <PieChartComponent
                data={collectionSources}
                colors={PIE_COLORS}
                color={MAIN_COLOR}
              />
            </ChartCard>

            <ChartCard
              title="Confirmation Status"
              icon={PieChartIcon}
              color={MAIN_COLOR}
            >
              <PieChartComponent
                data={confirmationStatus}
                colors={PIE_COLORS}
                color={MAIN_COLOR}
              />
            </ChartCard>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ChartCard({ title, children, icon: Icon, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                 rounded-xl p-6 shadow-md hover:shadow-lg hover:shadow-[#1c4e75]/30 transition-all"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full" style={{ backgroundColor: color }}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  );
}

function BarChartComponent({ data, xKey = "date", color, isDark }) {
  if (!data.length) return <NoData icon={Database} />;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.9} />
            <stop offset="100%" stopColor={color} stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDark ? "#374151" : "#e5e7eb"}
        />
        <XAxis
          dataKey={xKey}
          stroke={isDark ? "#d1d5db" : "#6b7280"}
          fontSize={12}
        />
        <YAxis stroke={isDark ? "#d1d5db" : "#6b7280"} fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#111827" : "#1c4e75",
            color: "white",
            borderRadius: "8px",
            border: "none",
          }}
        />
        <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
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
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDark ? "#374151" : "#e5e7eb"}
        />
        <XAxis
          dataKey="date"
          stroke={isDark ? "#d1d5db" : "#6b7280"}
          fontSize={12}
        />
        <YAxis stroke={isDark ? "#d1d5db" : "#6b7280"} fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#111827" : "#1c4e75",
            color: "white",
            borderRadius: "8px",
            border: "none",
          }}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke={color}
          strokeWidth={2}
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
            <stop offset="0%" stopColor={color} stopOpacity={0.8} />
            <stop offset="100%" stopColor={color} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDark ? "#374151" : "#e5e7eb"}
        />
        <XAxis
          dataKey="day"
          stroke={isDark ? "#d1d5db" : "#6b7280"}
          fontSize={12}
        />
        <YAxis stroke={isDark ? "#d1d5db" : "#6b7280"} fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#111827" : color,
            color: "white",
            borderRadius: "8px",
            border: "none",
          }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke={color}
          strokeWidth={3}
          dot={{
            r: 5,
            stroke: "white",
            strokeWidth: 2,
            fill: color,
          }}
          activeDot={{
            r: 8,
            stroke: "white",
            strokeWidth: 2,
            fill: color,
            className: "animate-ping",
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

function PieChartComponent({ data, colors, color }) {
  if (!data.length) return <NoData icon={PieChartIcon} />;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}`}
          outerRadius={110}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: color,
            color: "white",
            borderRadius: "8px",
            border: "none",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

function NoData({ icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center h-[300px] text-gray-500 dark:text-gray-300">
      <Icon className="w-10 h-10 opacity-40 mb-2" />
      <p>No data available</p>
    </div>
  );
}
