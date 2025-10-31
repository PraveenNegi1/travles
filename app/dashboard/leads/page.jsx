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
  Edit,
  CheckCircle,
  XCircle,
  ChevronDown,
} from "lucide-react";
import { db } from "@/lib/firebase";

const MAIN_COLOR = "#1c4e75";

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
          (a, b) => b.createdAt?.seconds - a.createdAt?.seconds
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
        lead.phone?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredLeads(filtered);
    setCurrentPage(1);
  }, [search, leads]);

  // Delete lead
  const handleDelete = async (lead) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (!confirmDelete) return;

    try {
      const leadRef = doc(db, lead.source, lead.id);
      await deleteDoc(leadRef);

      const updated = leads.filter(
        (l) => !(l.id === lead.id && l.source === lead.source)
      );
      setLeads(updated);
      setFilteredLeads(updated);
      setSelectedLead(null);
      setDropdownOpen(null);
    } catch (error) {
      console.error("Error deleting lead:", error);
      alert("Failed to delete lead.");
    }
  };

  // Edit lead
  const handleEdit = (lead) => {
    setIsEditing(true);
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
    setSelectedLead(lead);
    setDropdownOpen(null);
  };

  // Save edited lead
  const handleSaveEdit = async () => {
    try {
      const { id, source, ...updates } = editForm;
      if (!updates.packageTitle) delete updates.packageTitle;
      if (!updates.price) delete updates.price;

      const leadRef = doc(db, source, id);
      await updateDoc(leadRef, updates);

      const updated = leads.map((l) =>
        l.id === id && l.source === source ? { ...l, ...updates } : l
      );
      setLeads(updated);
      setFilteredLeads(updated);
      setSelectedLead({ ...selectedLead, ...updates });
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
        l.id === selectedLead.id && l.source === selectedLead.source
          ? { ...l, confirmed: status }
          : l
      );
      setLeads(updated);
      setFilteredLeads(updated);
      setSelectedLead({ ...selectedLead, confirmed: status });
      setDropdownOpen(null);
    } catch (error) {
      console.error("Error updating confirmation:", error);
      alert("Failed to update confirmation.");
    }
  };

  // Pagination
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-[#1c4e75]" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto md:ml-64 font-serif">
    <div className="flex justify-between ">
        <h1 className="text-3xl font-bold mb-6 text-[#1c4e75] dark:text-white text-center md:text-left">
        Leads Dashboard
      </h1>
    <div className="flex justify-end">
        <p className="mb-6 text-gray-600 dark:text-white text-2xl">
        Total Leads: <span className="font-semibold">{leads.length}</span>
      </p>
    </div>

    </div>
      <div className="relative mb-6 max-w-md mx-auto md:mx-0">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 w-full p-2 rounded-xl border dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-[#1c4e75]"
        />
      </div>

      <div className=" bg-white overflow-y-auto dark:bg-gray-900 shadow-xl rounded-2xl  h-[75vh]">
        <table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className=" dark:bg-[#1c4e75] bg-[#1c4e75]   dark:text-gray-300 text-white sticky top-0 z-50">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Message</th>
              <th className="px-4 py-3 text-left">Package</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Source</th>
              <th className="px-4 py-3 text-left">Confirmed</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentLeads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                <td className="px-4 py-3 font-medium">{lead.name}</td>
                <td className="px-4 py-3">{lead.email}</td>
                <td className="px-4 py-3">{lead.phone}</td>
                <td className="px-4 py-3">{lead.message}</td>
                <td className="px-4 py-3">{lead.packageTitle}</td>
                <td className="px-4 py-3">{lead.price}</td>
                <td className="px-4 py-3 capitalize">{lead.source}</td>
                <td className="px-4 py-3">
                  {lead.confirmed ? (
                    <span className="text-green-600 flex items-center gap-1 font-medium">
                      <CheckCircle size={16} /> Yes
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1 font-medium">
                      <XCircle size={16} /> No
                    </span>
                  )}
                </td>

                {/* Actions Dropdown */}
                <td className="px-4 py-3 relative">
                  <button
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === lead.id ? null : lead.id)
                    }
                    className="px-3 py-1 rounded-lg border shadow-sm bg-white text-[#1c4e75] flex items-center justify-between w-full hover:bg-gray-50"
                  >
                    Actions
                    <ChevronDown size={16} />
                  </button>

                  {dropdownOpen === lead.id && (
                    <div className="absolute right-0 mt-1 w-36 bg-white border rounded-lg shadow-lg z-20 ">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="w-full px-4 py-2 text-left text-[#1c4e75] hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Users size={16} /> View
                      </button>
                      <button
                        onClick={() => handleEdit(lead)}
                        className="w-full px-4 py-2 text-left text-yellow-600 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(lead)}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 flex-wrap gap-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 flex items-center gap-1 rounded-xl border shadow-sm disabled:opacity-50"
        >
          <ChevronLeft size={18} /> Prev
        </button>
        <button
          onClick={() =>
            setCurrentPage((p) =>
              indexOfLastLead < filteredLeads.length ? p + 1 : p
            )
          }
          disabled={indexOfLastLead >= filteredLeads.length}
          className="px-4 py-2 flex items-center gap-1 rounded-xl border shadow-sm disabled:opacity-50"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && !isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-[#1c4e75]">
              Lead Details
            </h2>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Users size={18} /> {selectedLead.name}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={18} /> {selectedLead.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={18} /> {selectedLead.phone}
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare size={18} /> {selectedLead.message}
              </p>
              {selectedLead.packageTitle && (
                <p className="flex items-center gap-2">
                  🎁 Package: {selectedLead.packageTitle}
                </p>
              )}
              {selectedLead.price && (
                <p className="flex items-center gap-2">
                  💰 Price: {selectedLead.price}
                </p>
              )}
              <p className="flex items-center gap-2">
                <Calendar size={18} />{" "}
                {selectedLead.createdAt
                  ? format(selectedLead.createdAt.toDate(), "PPP p")
                  : "N/A"}
              </p>
              <p>
                Status:{" "}
                {selectedLead.confirmed ? (
                  <span className="text-green-600 font-medium">Confirmed</span>
                ) : (
                  <span className="text-red-600 font-medium">
                    Not Confirmed
                  </span>
                )}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => handleEdit(selectedLead)}
                className="px-4 py-2 rounded-lg text-white bg-[#1c4e75] hover:bg-[#163d5b] shadow"
              >
                Edit
              </button>
              <button
                onClick={() => handleConfirmStatus(true)}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow"
              >
                Confirm
              </button>
              <button
                onClick={() => handleConfirmStatus(false)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow"
              >
                Not Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X />
            </button>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1c4e75]">Edit Lead</h2>

              <input
                className="w-full p-2 rounded-lg border dark:bg-gray-800 focus:ring-2 focus:ring-[#1c4e75]"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                placeholder="Name"
              />

              <input
                className="w-full p-2 rounded-lg border dark:bg-gray-800 focus:ring-2 focus:ring-[#1c4e75]"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                placeholder="Email"
              />

              <input
                className="w-full p-2 rounded-lg border dark:bg-gray-800 focus:ring-2 focus:ring-[#1c4e75]"
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
                placeholder="Phone"
              />

              <textarea
                className="w-full p-2 rounded-lg border dark:bg-gray-800 focus:ring-2 focus:ring-[#1c4e75]"
                value={editForm.message}
                onChange={(e) =>
                  setEditForm({ ...editForm, message: e.target.value })
                }
                placeholder="Message"
              />

              <input
                className="w-full p-2 rounded-lg border dark:bg-gray-800 focus:ring-2 focus:ring-[#1c4e75]"
                value={editForm.packageTitle}
                onChange={(e) =>
                  setEditForm({ ...editForm, packageTitle: e.target.value })
                }
                placeholder="Package Title"
              />

              <input
                className="w-full p-2 rounded-lg border dark:bg-gray-800 focus:ring-2 focus:ring-[#1c4e75]"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: e.target.value })
                }
                placeholder="Price"
              />

              <div className="flex gap-3 pt-2 flex-wrap">
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 rounded-lg text-white bg-[#1c4e75] hover:bg-[#163d5b] shadow"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg border shadow-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
