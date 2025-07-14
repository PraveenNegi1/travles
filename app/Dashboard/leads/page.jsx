"use client";

import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Loader2,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  Users,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Sparkles,
} from "lucide-react";
import { db } from "@/lib/firebase";

const ITEMS_PER_PAGE = 10;

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const q = query(
          collection(db, "contacts"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const formatted = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLeads(formatted);
        setFilteredLeads(formatted);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = leads.filter(
      (lead) =>
        lead.name?.toLowerCase().includes(value) ||
        lead.email?.toLowerCase().includes(value) ||
        lead.phone?.toLowerCase().includes(value)
    );
    setFilteredLeads(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "contacts", id));
      const updated = leads.filter((lead) => lead.id !== id);
      setLeads(updated);
      setFilteredLeads(updated);
    } catch (error) {
      console.error("Error deleting lead:", error);
      alert("Failed to delete lead.");
    }
  };

  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLeads = filteredLeads.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 font-serif md:ml-60 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Heading */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3 flex-wrap">
            <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Leads Dashboard
            </h1>
            <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
          </div>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium">
            Manage and track your valuable leads
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Users className="w-6 h-6 text-white" />,
              label: "Total Leads",
              value: leads.length,
              bg: "from-blue-500 to-cyan-500",
            },
            {
              icon: <Search className="w-6 h-6 text-white" />,
              label: "Filtered Results",
              value: filteredLeads.length,
              bg: "from-emerald-500 to-teal-500",
            },
            {
              icon: <Calendar className="w-6 h-6 text-white" />,
              label: "Current Page",
              value: `${currentPage} / ${totalPages}`,
              bg: "from-orange-500 to-red-500",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50 transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-gradient-to-r ${item.bg} rounded-xl`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex justify-center w-full">
          <div className="relative w-full max-w-lg px-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name, email or phone..."
              className="w-full p-4 pr-12 rounded-2xl border-2 border-purple-200 dark:border-purple-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-800 dark:text-slate-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-300"
            />
            <div className="absolute right-4 top-4 p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Search className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Loader or Table */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <span className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                Loading leads...
              </span>
            </div>
          </div>
        ) : paginatedLeads.length === 0 ? (
          <div className="text-center py-16">
            <div className="p-4 bg-gradient-to-r from-gray-500 to-slate-500 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
              No leads found matching your criteria
            </p>
          </div>
        ) : (
          <div className="overflow-auto rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <table className="min-w-[800px] table-auto w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white sticky top-0 z-10">
                <tr>
                  {[
                    { label: "Name", icon: Users },
                    { label: "Email", icon: Mail },
                    { label: "Phone", icon: Phone },
                    { label: "Message", icon: MessageSquare },
                    { label: "Date", icon: Calendar },
                    { label: "Action", icon: Trash2 },
                  ].map(({ label, icon: Icon }) => (
                    <th
                      key={label}
                      className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {label}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t border-slate-200 dark:border-slate-700 hover:bg-purple-50 dark:hover:bg-slate-700/50 transition-all duration-300 text-sm"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {lead.name?.[0]?.toUpperCase() || "?"}
                        </div>
                        <span className="font-medium text-slate-800 dark:text-slate-100">
                          {lead.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{lead.email}</td>
                    <td className="px-6 py-4">{lead.phone}</td>
                    <td className="px-6 py-4 max-w-xs truncate line-clamp-2">
                      {lead.message}
                    </td>
                    <td className="px-6 py-4">
                      {lead.createdAt?.toDate
                        ? format(
                            lead.createdAt.toDate(),
                            "dd MMM yyyy, hh:mm a"
                          )
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl text-white hover:scale-105 transition duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredLeads.length > ITEMS_PER_PAGE && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="w-full sm:w-auto flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-50 dark:hover:bg-slate-700/50 disabled:opacity-50 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex items-center gap-4">
              <div className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl text-white font-medium shadow-lg">
                Page {currentPage} of {totalPages}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 hidden sm:block">
                Showing {startIndex + 1}-
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredLeads.length)} of{" "}
                {filteredLeads.length}
              </div>
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="w-full sm:w-auto flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-50 dark:hover:bg-slate-700/50 disabled:opacity-50 transition-all duration-300"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
