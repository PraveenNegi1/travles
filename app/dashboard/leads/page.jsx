"use client";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
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
  Edit3,
  CheckCircle,
  XCircle,
  MoreVertical,
  Package,
  DollarSign,
  Clock,
  Check,
  AlertCircle,
} from "lucide-react";
import { db } from "@/lib/firebase";

// Modern color palette
const PRIMARY = "rgb(20, 184, 166)"; // Teal
const PRIMARY_DARK = "rgb(15, 118, 110)";
const ACCENT = "rgb(99, 102, 241)"; // Indigo accent
const BG_LIGHT = "bg-gray-50";
const BG_DARK = "bg-gray-900";
const CARD_LIGHT = "bg-white";
const CARD_DARK = "bg-gray-800";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const leadsPerPage = 10;

  // Fetch leads
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const contactsQuery = query(
          collection(db, "contacts"),
          orderBy("createdAt", "desc")
        );
        const travelQuery = query(
          collection(db, "travelInquiries"),
          orderBy("createdAt", "desc")
        );

        const [contactsSnap, travelSnap] = await Promise.all([
          getDocs(contactsQuery),
          getDocs(travelQuery),
        ]);

        const contactsData = contactsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          source: "contacts",
        }));
        const travelData = travelSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          source: "travelInquiries",
        }));

        const allLeads = [...contactsData, ...travelData].sort(
          (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        );

        setLeads(allLeads);
        setFilteredLeads(allLeads);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Search filter
  useEffect(() => {
    const filtered = leads.filter(
      (lead) =>
        lead.name?.toLowerCase().includes(search.toLowerCase()) ||
        lead.email?.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone?.toLowerCase().includes(search.toLowerCase()) ||
        lead.message?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredLeads(filtered);
    setCurrentPage(1);
  }, [search, leads]);

  // Actions
  const handleDelete = async (lead) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      await deleteDoc(doc(db, lead.source, lead.id));
      const updated = leads.filter(
        (l) => !(l.id === lead.id && l.source === lead.source)
      );
      setLeads(updated);
      setFilteredLeads(updated);
      setSelectedLead(null);
    } catch (error) {
      alert("Failed to delete lead.");
    }
  };

  const handleEdit = (lead) => {
    setEditForm({
      id: lead.id,
      source: lead.source,
      name: lead.name || "",
      email: lead.email || "",
      phone: lead.phone || "",
      message: lead.message || "",
      packageTitle: lead.packageTitle || "",
      price: lead.price || "",
    });
    setIsEditing(true);
    setDropdownOpen(null);
  };

  const handleSaveEdit = async () => {
    try {
      const { id, source, ...updates } = editForm;
      Object.keys(updates).forEach(
        (key) => updates[key] === "" && delete updates[key]
      );

      await updateDoc(doc(db, source, id), updates);
      const updatedLeads = leads.map((l) =>
        l.id === id && l.source === source ? { ...l, ...updates } : l
      );
      setLeads(updatedLeads);
      setFilteredLeads(updatedLeads);
      setSelectedLead({ ...selectedLead, ...updates });
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update lead.");
    }
  };

  const handleConfirmStatus = async (status) => {
    try {
      await updateDoc(doc(db, selectedLead.source, selectedLead.id), {
        confirmed: status,
      });
      const updated = leads.map((l) =>
        l.id === selectedLead.id && l.source === selectedLead.source
          ? { ...l, confirmed: status }
          : l
      );
      setLeads(updated);
      setFilteredLeads(updated);
      setSelectedLead({ ...selectedLead, confirmed: status });
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const currentLeads = filteredLeads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  if (loading) {
    return (
      <div
        className={`min-h-screen ${BG_LIGHT} dark:${BG_DARK} flex items-center justify-center`}
      >
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-teal-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading leads...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`min-h-screen ${BG_LIGHT} dark:${BG_DARK}   px-4  sm:px-6 lg:px-8`}
      >
        <div className="max-w-7xl ml-60">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  Leads Dashboard
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Manage and track all your incoming leads
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Leads
                  </p>
                  <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                    {leads.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone or message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Lead
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Inquiry
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Package
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Date
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentLeads.map((lead) => (
                    <tr
                      key={`${lead.source}-${lead.id}`}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
                    >
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {lead.name || "N/A"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {lead.source}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <p className="text-sm flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {lead.email || "-"}
                            </span>
                          </p>
                          <p className="text-sm flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {lead.phone || "-"}
                            </span>
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 max-w-xs">
                          {lead.message || "No message"}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        {lead.packageTitle ? (
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {lead.packageTitle}
                            </p>
                            {lead.price && (
                              <p className="text-sm text-teal-600 dark:text-teal-400 font-semibold">
                                {lead.price}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        {lead.confirmed === true ? (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            <Check className="w-3 h-3" /> Confirmed
                          </span>
                        ) : lead.confirmed === false ? (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                            <XCircle className="w-3 h-3" /> Not Confirmed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                            <AlertCircle className="w-3 h-3" /> Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400">
                        {lead.createdAt
                          ? format(lead.createdAt.toDate(), "MMM d, yyyy")
                          : "N/A"}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="relative inline-block">
                          <button
                            onClick={() =>
                              setDropdownOpen(
                                dropdownOpen === lead.id ? null : lead.id
                              )
                            }
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                          >
                            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          </button>
                          {dropdownOpen === lead.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                              <button
                                onClick={() => {
                                  setSelectedLead(lead);
                                  setDropdownOpen(null);
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 text-gray-700 dark:text-gray-300"
                              >
                                <Users className="w-4 h-4" /> View Details
                              </button>
                              <button
                                onClick={() => handleEdit(lead)}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 text-blue-600"
                              >
                                <Edit3 className="w-4 h-4" /> Edit Lead
                              </button>
                              <button
                                onClick={() => handleDelete(lead)}
                                className="w-full px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/50 flex items-center gap-3 text-red-600"
                              >
                                <Trash2 className="w-4 h-4" /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:hidden space-y-4">
            {currentLeads.map((lead) => (
              <div
                key={`${lead.source}-${lead.id}`}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-5"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {lead.name || "Unnamed Lead"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {lead.source}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === lead.id ? null : lead.id)
                    }
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span>{lead.email || "No email"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span>{lead.phone || "No phone"}</span>
                  </div>
                  {lead.packageTitle && (
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-teal-600" />
                      <span className="font-medium">{lead.packageTitle}</span>
                    </div>
                  )}
                  <div className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {lead.message || "No message provided"}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    {lead.confirmed === true ? (
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                        Confirmed
                      </span>
                    ) : lead.confirmed === false ? (
                      <span className="text-xs font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">
                        Not Confirmed
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                        Pending
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="text-teal-600 font-medium text-sm hover:underline"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-3 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" /> Previous
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page <strong>{currentPage}</strong> of{" "}
                <strong>{totalPages}</strong>
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all flex items-center gap-2"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedLead && !isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Lead Details
                </h2>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-xl">
                        <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Name
                        </p>
                        <p className="font-semibold text-lg">
                          {selectedLead.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Email
                        </p>
                        <p className="font-semibold">{selectedLead.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                        <Phone className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Phone
                        </p>
                        <p className="font-semibold">{selectedLead.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedLead.packageTitle && (
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                          <Package className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Package
                          </p>
                          <p className="font-semibold text-lg">
                            {selectedLead.packageTitle}
                          </p>
                          {selectedLead.price && (
                            <p className="text-teal-600 font-bold">
                              {selectedLead.price}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-xl">
                        <Calendar className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Received
                        </p>
                        <p className="font-semibold">
                          {selectedLead.createdAt
                            ? format(
                                selectedLead.createdAt.toDate(),
                                "MMMM d, yyyy 'at' h:mm a"
                              )
                            : "Unknown"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Message
                  </p>
                  <p className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-gray-800 dark:text-gray-200">
                    {selectedLead.message || "No message provided."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={() => handleEdit(selectedLead)}
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <Edit3 className="w-5 h-5" /> Edit Lead
                  </button>
                  <button
                    onClick={() => handleConfirmStatus(true)}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" /> Confirm
                  </button>
                  <button
                    onClick={() => handleConfirmStatus(false)}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <XCircle className="w-5 h-5" /> Not Confirmed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Edit Lead
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-5">
                {[
                  "name",
                  "email",
                  "phone",
                  "message",
                  "packageTitle",
                  "price",
                ].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                      {field.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    {field === "message" ? (
                      <textarea
                        rows={4}
                        value={editForm[field] || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, [field]: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                      />
                    ) : (
                      <input
                        type="text"
                        value={editForm[field] || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, [field]: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                      />
                    )}
                  </div>
                ))}

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-4 border border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
