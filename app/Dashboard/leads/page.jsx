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
import { Loader2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <motion.div
      className="min-h-screen p-4 sm:p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-center text-blue-800 dark:text-yellow-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🧾 Leads Dashboard
        </motion.h1>

        {/* Search Bar */}
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name, email or phone..."
            className="w-full sm:w-80 p-2 rounded-xl border border-gray-300 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-blue-600">Loading leads...</span>
          </div>
        ) : filteredLeads.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
            No leads found.
          </p>
        ) : (
          <motion.div
            className="overflow-auto rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <table className="min-w-full table-auto">
              <thead className="bg-blue-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 sticky top-0 z-10">
                <tr>
                  {["Name", "Email", "Phone", "Message", "Date", "Action"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-4 py-3 text-left text-sm font-semibold"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, i) => (
                  <motion.tr
                    key={lead.id}
                    className="border-t text-sm hover:bg-sky-50 dark:hover:bg-gray-700 transition"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.04 }}
                  >
                    <td className="px-4 py-2 whitespace-nowrap">{lead.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {lead.email}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {lead.phone}
                    </td>
                    <td className="px-4 py-2">{lead.message}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-500 dark:text-gray-300">
                      {lead.createdAt?.toDate
                        ? format(
                            lead.createdAt.toDate(),
                            "dd MMM yyyy, hh:mm a"
                          )
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
