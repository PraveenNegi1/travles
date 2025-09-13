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
  Package,
  IndianRupee,
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

  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    packageTitle: "",
    price: "",
  });

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // ✅ Fetch contacts
        const contactsQ = query(
          collection(db, "contacts"),
          orderBy("createdAt", "desc")
        );
        const contactsSnap = await getDocs(contactsQ);
        const contacts = contactsSnap.docs.map((d) => ({
          id: d.id,
          source: "contacts",
          ...d.data(),
        }));

        // ✅ Fetch travelInquiries
        const travelQ = query(
          collection(db, "travelInquiries"),
          orderBy("createdAt", "desc")
        );
        const travelSnap = await getDocs(travelQ);
        const travel = travelSnap.docs.map((d) => ({
          id: d.id,
          source: "travelInquiries",
          ...d.data(),
        }));

        // ✅ Merge and sort
        const all = [...contacts, ...travel].sort((a, b) => {
          const dateA = a.createdAt?.toDate
            ? a.createdAt.toDate()
            : new Date(0);
          const dateB = b.createdAt?.toDate
            ? b.createdAt.toDate()
            : new Date(0);
          return dateB - dateA;
        });

        setLeads(all);
        setFilteredLeads(all);
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
        lead.phone?.toLowerCase().includes(value) ||
        lead.message?.toLowerCase().includes(value) || // Fixed typo here
        lead.packageTitle?.toLowerCase().includes(value) ||
        lead.price?.toLowerCase().includes(value)
    );
    setFilteredLeads(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async (lead) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, lead.source, lead.id));
      const updated = leads.filter((l) => l.id !== lead.id);
      setLeads(updated);
      setFilteredLeads(updated);
    } catch (error) {
      console.error("Error deleting lead:", error);
      alert("Failed to delete lead.");
    }
  };

  // Edit
  const handleEdit = (lead) => {
    setIsEditing(true);
    setEditForm({
      name: lead.name || "",
      email: lead.email || "",
      phone: lead.phone || "",
      message: lead.message || "",
      packageTitle: lead.packageTitle || "",
      price: lead.price || "",
    });
  };

  const handleSaveEdit = async () => {
    try {
      const leadRef = doc(db, selectedLead.source, selectedLead.id);
      await updateDoc(leadRef, { ...editForm });
      const updated = leads.map((l) =>
        l.id === selectedLead.id ? { ...l, ...editForm } : l
      );
      setLeads(updated);
      setFilteredLeads(updated);
      setSelectedLead({ ...selectedLead, ...editForm });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating lead:", error);
      alert("Failed to update lead.");
    }
  };

  // Confirm / Not Confirm
  const handleConfirmStatus = async (status) => {
    try {
      const leadRef = doc(db, selectedLead.source, selectedLead.id);
      await updateDoc(leadRef, { confirmed: status });
      const updated = leads.map((l) =>
        l.id === selectedLead.id ? { ...l, confirmed: status } : l
      );
      setLeads(updated);
      setFilteredLeads(updated);
      setSelectedLead(null);
    } catch (error) {
      console.error("Error updating confirmation:", error);
      alert("Failed to update confirmation.");
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
      <h1 className="text-3xl font-bold mb-2 text-[#1c4e75] dark:text-white" >
        Leads
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Total Leads: <span className="font-semibold">{leads.length}</span>
      </p>

      {/* Search */}
      <div className="flex items-center mb-4">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, email, phone, package, or price"
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800"
        />
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg ">
          <table className="w-full border-collapse bg-white dark:bg-gray-800  shadow">
            <thead
              style={{ backgroundColor: MAIN_COLOR }}
              className="text-white"
            >
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                                <th className="px-4 py-3 text-left">Message</th>

                <th className="px-4 py-3 text-left">Package</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLeads.map((lead) => (
                <tr
                  key={`${lead.source}-${lead.id}`}
                  className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-4 py-3">{lead.name}</td>
                  <td className="px-4 py-3">{lead.email}</td>
                  <td className="px-4 py-3">{lead.phone}</td>
                  <td className="px-4 py-3">{lead.message}</td>
                  <td className="px-4 py-3">{lead.packageTitle || "-"}</td>
                  <td className="px-4 py-3">{lead.price || "-"}</td>
                  <td className="px-4 py-3">
                    {lead.confirmed === true ? (
                      <span className="text-green-600 font-medium">
                        Confirmed
                      </span>
                    ) : lead.confirmed === false ? (
                      <span className="text-red-600 font-medium">
                        Not Confirmed
                      </span>
                    ) : (
                      <span className="text-gray-500">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(lead);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedLeads.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-3 py-2 border rounded disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-3 py-2 border rounded disabled:opacity-50"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Popup Modal */}
      {selectedLead && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => {
                setSelectedLead(null);
                setIsEditing(false);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lead Details */}
            {!isEditing ? (
              <div className="space-y-4">
                <h2
                  className="text-2xl font-bold"
                  style={{ color: MAIN_COLOR }}
                >
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
                {selectedLead.packageTitle && (
                  <div className="flex items-center gap-3">
                    <Package
                      className="w-5 h-5"
                      style={{ color: MAIN_COLOR }}
                    />
                    <span>{selectedLead.packageTitle}</span>
                  </div>
                )}
                {selectedLead.price && (
                  <div className="flex items-center gap-3">
                    <IndianRupee
                      className="w-5 h-5"
                      style={{ color: MAIN_COLOR }}
                    />
                    <span>{selectedLead.price}</span>
                  </div>
                )}
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
                <div className="flex items-center gap-3">
                  <span className="font-medium">Status:</span>
                  {selectedLead.confirmed === true ? (
                    <span className="text-green-600 font-semibold">
                      Confirmed
                    </span>
                  ) : selectedLead.confirmed === false ? (
                    <span className="text-red-600 font-semibold">
                      Not Confirmed
                    </span>
                  ) : (
                    <span className="text-gray-500">Pending</span>
                  )}
                </div>

                <div className="flex gap-3 mt-4 flex-wrap">
                  <button
                    onClick={() => handleEdit(selectedLead)}
                    className="flex items-center gap-2 px-4 py-2 rounded-md text-white"
                    style={{ backgroundColor: MAIN_COLOR }}
                  >
                    <Edit3 className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleConfirmStatus(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-md text-white bg-green-600"
                  >
                    <CheckCircle className="w-4 h-4" /> Confirm
                  </button>
                  <button
                    onClick={() => handleConfirmStatus(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-md text-white bg-red-600"
                  >
                    <XCircle className="w-4 h-4" /> Not Confirmed
                  </button>
                </div>
              </div>
            ) : (
              // Edit Form
              <div className="space-y-4">
                <h2
                  className="text-2xl font-bold"
                  style={{ color: MAIN_COLOR }}
                >
                  Edit Lead
                </h2>
                <input
                  className="w-full p-2 rounded border dark:bg-gray-800"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="Name"
                />
                <input
                  className="w-full p-2 rounded border dark:bg-gray-800"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  placeholder="Email"
                />
                <input
                  className="w-full p-2 rounded border dark:bg-gray-800"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  placeholder="Phone"
                />
                <textarea
                  className="w-full p-2 rounded border dark:bg-gray-800"
                  value={editForm.message}
                  onChange={(e) =>
                    setEditForm({ ...editForm, message: e.target.value })
                  }
                  placeholder="Message"
                />
                <input
                  className="w-full p-2 rounded border dark:bg-gray-800"
                  value={editForm.packageTitle}
                  onChange={(e) =>
                    setEditForm({ ...editForm, packageTitle: e.target.value })
                  }
                  placeholder="Package Title"
                />
                <input
                  className="w-full p-2 rounded border dark:bg-gray-800"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  placeholder="Price"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 rounded-md text-white"
                    style={{ backgroundColor: MAIN_COLOR }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-md border"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
