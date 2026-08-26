import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Eye, Trash, Mail, Search, Send } from "lucide-react";
import { toast } from "react-toastify";

function CompanyMessageContent() {
  const [messages, setMessages] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [form, setForm] = useState({
    clientId: "",
    subject: "",
    message: "",
  });

  const loadData = async () => {
    try {
      const [messageRes, recipientRes] = await Promise.all([
        axios.get("/company/messages", { withCredentials: true }),
        axios.get("/company/messages/recipients", { withCredentials: true }),
      ]);

      setMessages(Array.isArray(messageRes.data?.messages) ? messageRes.data.messages : []);
      setRecipients(Array.isArray(recipientRes.data?.recipients) ? recipientRes.data.recipients : []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load messages.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredMessages = useMemo(() => {
    const query = search.toLowerCase();
    return messages.filter((item) => {
      const firstName = String(item?.clientId?.firstname || "");
      const lastName = String(item?.clientId?.lastname || "");
      const fullName = `${firstName} ${lastName}`.toLowerCase();
      const subject = String(item?.subject || "").toLowerCase();
      const messageText = String(item?.message || "").toLowerCase();
      return fullName.includes(query) || subject.includes(query) || messageText.includes(query);
    });
  }, [messages, search]);

  const getClientName = (client) => {
    const fullName = `${client?.firstname || ""} ${client?.lastname || ""}`.trim();
    return fullName || "Client User";
  };

  const formatDate = (value) => {
    if (!value) return "";
    return new Date(value).toLocaleString();
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!form.clientId || !form.subject.trim() || !form.message.trim()) {
      toast.error("Please fill all message fields.");
      return;
    }

    try {
      const res = await axios.post(
        "/company/messages/send",
        {
          clientId: form.clientId,
          subject: form.subject.trim(),
          message: form.message.trim(),
        },
        { withCredentials: true }
      );

      const newMessage = res.data?.data;
      if (newMessage) {
        setMessages((prev) => [newMessage, ...prev]);
      }

      setForm({ clientId: "", subject: "", message: "" });
      toast.success("Message sent successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Failed to send message.");
    }
  };

  const handleViewMessage = async (messageId) => {
    try {
      const res = await axios.get(`/company/messages/${messageId}`, { withCredentials: true });
      const viewedMessage = res.data?.data;
      if (viewedMessage) {
        setSelectedMessage(viewedMessage);
        setMessages((prev) =>
          prev.map((item) =>
            item._id === viewedMessage._id ? { ...viewedMessage, isReadByCompany: true } : item
          )
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load message details.");
    }
  };

  const handleDelete = async (messageId) => {
    try {
      await axios.delete(`/company/messages/${messageId}`, { withCredentials: true });
      setMessages((prev) => prev.filter((item) => item._id !== messageId));
      if (selectedMessage?._id === messageId) {
        setSelectedMessage(null);
      }
      toast.success("Message deleted.");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete message.");
    }
  };

  return (
    <div className="company-content min-h-screen p-5 text-slate-900 sm:p-8">
      <div className="mb-7"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2d6b58]">Stay connected</p><h2 className="mt-2 text-3xl font-bold text-slate-900">Company Messages</h2><p className="mt-2 text-sm text-slate-500">Message clients directly and keep every conversation in one place.</p></div>

      <form onSubmit={handleSend} className="mb-8 rounded-2xl border border-[#dcebdd] bg-white/90 p-5 shadow-[0_14px_32px_rgba(31,58,47,0.08)] sm:p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold"><Send size={18} className="text-[#2d6b58]"/>Send Message to Client</h3>

        <div className="grid gap-3 md:grid-cols-2">
          <select
            name="clientId"
            value={form.clientId}
            onChange={handleChange}
          className="rounded-xl border border-[#dcebdd] bg-slate-50 p-3"
          >
            <option value="">Select client</option>
            {recipients.map((client) => (
              <option key={client._id} value={client._id}>
                {getClientName(client)}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="rounded-xl border border-[#dcebdd] bg-slate-50 p-3"
          />
        </div>

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message"
          className="mt-3 min-h-28 w-full rounded-xl border border-[#dcebdd] bg-slate-50 p-3"
        />

        <button type="submit" className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1f5a49] to-[#3c7a63] px-5 py-2.5 text-sm font-semibold text-white shadow-md">
          <Send size={15}/> Send message
        </button>
      </form>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="flex items-center gap-2 text-xl font-semibold"><Mail size={20} className="text-[#2d6b58]"/>Inbox <span className="text-sm font-normal text-slate-500">({filteredMessages.length})</span></h3>
        <label className="flex w-full items-center gap-2 rounded-xl bg-white px-3 ring-1 ring-[#dcebdd] md:w-96">
          <Search size={16} className="text-slate-400" />
          <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by client, subject or message"
          className="w-full bg-transparent p-2 text-sm outline-none"
        />
        </label>
      </div>

      <div className="space-y-4">
        {isLoading && <p className="text-slate-500">Loading messages...</p>}

        {!isLoading && filteredMessages.length === 0 && (
          <p className="rounded-lg bg-[#fffdf8] p-4 text-slate-500 ring-1 ring-[#e7dfcc]">
            No messages found.
          </p>
        )}

        {!isLoading &&
          filteredMessages.map((item) => (
            <div
              key={item._id}
              className="flex flex-col gap-3 rounded-2xl border border-[#dcebdd] bg-white/90 px-5 py-4 shadow-[0_12px_28px_rgba(31,58,47,0.07)] transition hover:-translate-y-0.5 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="font-semibold">{getClientName(item.clientId)}</h3>
                <p className="text-sm text-slate-500">{formatDate(item.createdAt)}</p>
              </div>

              <div className="max-w-lg text-slate-700">
                <span className="font-semibold">{item.subject}</span>
                {": "}
                {String(item.message || "").slice(0, 70)}
              </div>

              <div className="flex items-center gap-4 text-[#1f5a49]">
                <button type="button" aria-label="View message" className="rounded-lg p-2 text-[#2d6b58] hover:bg-emerald-50" onClick={() => handleViewMessage(item._id)}><Eye size={18}/></button>
                <button type="button" aria-label="Delete message" className="rounded-lg p-2 text-red-600 hover:bg-red-50" onClick={() => handleDelete(item._id)}><Trash size={18}/></button>
              </div>
            </div>
          ))}
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white p-6">
            <h3 className="text-lg font-semibold">{selectedMessage.subject}</h3>
            <p className="mt-1 text-sm text-slate-500">
              From: {getClientName(selectedMessage.clientId)} | {formatDate(selectedMessage.createdAt)}
            </p>
            <p className="mt-4 whitespace-pre-wrap text-slate-800">{selectedMessage.message}</p>
            <button
              type="button"
              onClick={() => setSelectedMessage(null)}
              className="mt-6 rounded-lg bg-slate-800 px-4 py-2 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyMessageContent;
