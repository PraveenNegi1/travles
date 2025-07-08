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
    <div className="min-h-screen p-4 font-serif md:ml-60 sm:p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 dark:from-violet-600 dark:to-purple-600 rounded-2xl shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Leads Dashboard
            </h1>
            <Sparkles className="w-6 h-6 text-purple-500 dark:text-purple-400 animate-pulse" />
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
            Manage and track your valuable leads
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Leads
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {leads.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Filtered Results
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {filteredLeads.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Current Page
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {currentPage} / {totalPages}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name, email or phone..."
              className="w-full p-4 pr-12 rounded-2xl border-2 border-purple-200 dark:border-purple-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-800 dark:text-slate-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-300"
            />
            <div className="absolute right-4 top-4 p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Search className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

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
          <div className="overflow-hidden rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white sticky top-0 z-10">
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
                  {paginatedLeads.map((lead, i) => (
                    <tr
                      key={lead.id}
                      className="border-t border-slate-200 dark:border-slate-700 hover:bg-purple-50 dark:hover:bg-slate-700/50 transition-all duration-300 text-sm group"
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
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300">
                            {lead.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-green-100 dark:bg-green-900 rounded-lg">
                            <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300">
                            {lead.phone}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="flex items-start gap-2">
                          <div className="p-1 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                            <MessageSquare className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300 line-clamp-2 truncate">
                            {lead.message}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-purple-100 dark:bg-purple-900 rounded-lg">
                            <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="text-slate-600 dark:text-slate-400 text-sm">
                            {lead.createdAt?.toDate
                              ? format(
                                  lead.createdAt.toDate(),
                                  "dd MMM yyyy, hh:mm a"
                                )
                              : "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-xl text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredLeads.length > ITEMS_PER_PAGE && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-50 dark:hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
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
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-50 dark:hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
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
