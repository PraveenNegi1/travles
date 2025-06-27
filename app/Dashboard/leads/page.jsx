"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import {
  Loader2,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

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
        lead.name.toLowerCase().includes(value) ||
        lead.email.toLowerCase().includes(value) ||
        lead.phone.toLowerCase().includes(value)
    );
    setFilteredLeads(filtered);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (!confirm) return;

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
    <motion.div
      className="min-h-screen p-4 font-serif sm:p-6 bg-gradient-to-br from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold text-center text-blue-800 dark:text-yellow-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🧾 Leads Dashboard
        </motion.h1>

        {/* Search */}
        <div className="flex justify-end">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name, email or phone..."
              className="w-full p-3 pr-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <Search className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-blue-600">Loading leads...</span>
          </div>
        ) : paginatedLeads.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
            No leads found.
          </p>
        ) : (
          <div className="overflow-auto rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <table className="min-w-full table-auto">
              <thead className="bg-sky-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 sticky top-0 z-10">
                <tr>
                  {["Name", "Email", "Phone", "Message", "Date", "Action"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-4 py-3 text-left text-[18px] font-semibold whitespace-nowrap"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedLeads.map((lead, i) => (
                  <motion.tr
                    key={lead.id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-sky-50 dark:hover:bg-gray-700 transition-all text-[16px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">{lead.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {lead.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {lead.phone}
                    </td>
                    <td className="px-4 py-3">{lead.message}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                      {lead.createdAt?.toDate
                        ? format(
                            lead.createdAt.toDate(),
                            "dd MMM yyyy, hh:mm a"
                          )
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredLeads.length > ITEMS_PER_PAGE && (
          <div className="flex justify-between items-center mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="flex items-center gap-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium hover:bg-sky-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            <p className="text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </p>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="flex items-center gap-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium hover:bg-sky-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
