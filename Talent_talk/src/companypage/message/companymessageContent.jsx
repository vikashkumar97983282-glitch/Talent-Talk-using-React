import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Eye, Trash } from "lucide-react";
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
    <div className="min-h-screen bg-[#f7f4ea] p-6 text-slate-900">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Company Messages</h2>

      <form onSubmit={handleSend} className="mb-8 rounded-2xl bg-[#fffdf8] p-5 shadow-sm ring-1 ring-[#e7dfcc]">
        <h3 className="mb-4 text-lg font-semibold">Send Message to Client</h3>

        <div className="grid gap-3 md:grid-cols-2">
          <select
            name="clientId"
            value={form.clientId}
            onChange={handleChange}
            className="rounded-lg border border-[#e7dfcc] bg-white p-2"
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
            className="rounded-lg border border-[#e7dfcc] bg-white p-2"
          />
        </div>

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message"
          className="mt-3 min-h-24 w-full rounded-lg border border-[#e7dfcc] bg-white p-2"
        />

        <button type="submit" className="mt-3 rounded-lg bg-[#1f5a49] px-4 py-2 text-white">
          Send
        </button>
      </form>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="text-xl font-semibold">Inbox</h3>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by client, subject or message"
          className="w-full rounded-lg border border-[#e7dfcc] bg-white p-2 md:w-96"
        />
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
              className="flex flex-col gap-3 rounded-2xl bg-[#fffdf8] px-6 py-4 shadow-sm ring-1 ring-[#e7dfcc] md:flex-row md:items-center md:justify-between"
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
                <Eye className="cursor-pointer text-[#2d6b58]" onClick={() => handleViewMessage(item._id)} />
                <Trash className="cursor-pointer text-red-600" onClick={() => handleDelete(item._id)} />
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
