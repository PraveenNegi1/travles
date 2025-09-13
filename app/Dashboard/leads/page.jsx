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
  X,
} from "lucide-react";
import { db } from "@/lib/firebase";

const ITEMS_PER_PAGE = 10;
const MAIN_COLOR = "#1c4e75";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);

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
    <div className="min-h-screen px-4 py-6 sm:px-6 font-serif md:ml-60 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Leads Dashboard
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
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
            },
            {
              icon: <Search className="w-6 h-6 text-white" />,
              label: "Filtered Results",
              value: filteredLeads.length,
            },
            {
              icon: <Calendar className="w-6 h-6 text-white" />,
              label: "Current Page",
              value: `${currentPage} / ${totalPages}`,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: MAIN_COLOR }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex justify-center w-full">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name, email or phone..."
              className="w-full p-4 pr-12 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2"
              style={{ focusRingColor: MAIN_COLOR }}
            />
            <div
              className="absolute right-4 top-4 p-1 rounded-md"
              style={{ backgroundColor: MAIN_COLOR }}
            >
              <Search className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Loader or Table */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2
              className="h-8 w-8 animate-spin mx-auto mb-4"
              style={{ color: MAIN_COLOR }}
            />
            <span className="text-lg font-medium" style={{ color: MAIN_COLOR }}>
              Loading leads...
            </span>
          </div>
        ) : paginatedLeads.length === 0 ? (
          <div className="text-center py-16">
            <div
              className="p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: MAIN_COLOR }}
            >
              <Users className="w-8 h-8 text-white" />
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
              No leads found matching your criteria
            </p>
          </div>
        ) : (
          <div className="overflow-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <table className="min-w-[800px] table-auto w-full">
              <thead
                style={{ backgroundColor: MAIN_COLOR }}
                className="text-white"
              >
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
                    onClick={() => setSelectedLead(lead)}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 text-sm cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                          style={{ backgroundColor: MAIN_COLOR }}
                        >
                          {lead.name?.[0]?.toUpperCase() || "?"}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(lead.id);
                        }}
                        className="p-2 rounded-md text-white hover:scale-105 transition"
                        style={{ backgroundColor: "#b91c1c" }} // red delete button
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
              className="w-full sm:w-auto flex items-center gap-2 px-6 py-3 rounded-md border text-sm font-medium disabled:opacity-50"
              style={{
                borderColor: MAIN_COLOR,
                color: MAIN_COLOR,
              }}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex items-center gap-4">
              <div
                className="px-6 py-3 rounded-md text-white font-medium"
                style={{ backgroundColor: MAIN_COLOR }}
              >
                Page {currentPage} of {totalPages}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                Showing {startIndex + 1}-
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredLeads.length)} of{" "}
                {filteredLeads.length}
              </div>
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="w-full sm:w-auto flex items-center gap-2 px-6 py-3 rounded-md border text-sm font-medium disabled:opacity-50"
              style={{
                borderColor: MAIN_COLOR,
                color: MAIN_COLOR,
              }}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {selectedLead && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold" style={{ color: MAIN_COLOR }}>
                Lead Details
              </h2>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" style={{ color: MAIN_COLOR }} />
                <span className="font-medium">{selectedLead.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" style={{ color: MAIN_COLOR }} />
                <span>{selectedLead.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" style={{ color: MAIN_COLOR }} />
                <span>{selectedLead.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare
                  className="w-5 h-5 mt-1"
                  style={{ color: MAIN_COLOR }}
                />
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedLead.message || "No message provided"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5" style={{ color: MAIN_COLOR }} />
                <span>
                  {selectedLead.createdAt?.toDate
                    ? format(
                        selectedLead.createdAt.toDate(),
                        "dd MMM yyyy, hh:mm a"
                      )
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
