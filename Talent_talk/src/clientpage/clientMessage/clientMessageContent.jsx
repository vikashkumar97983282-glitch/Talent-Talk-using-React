import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

function ClientMessageContent() {
  const [messages, setMessages] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [form, setForm] = useState({
    companyId: "",
    subject: "",
    message: "",
  });

  const loadData = async () => {
    try {
      const [messageRes, recipientRes] = await Promise.all([
        axios.get("/client/messages", { withCredentials: true }),
        axios.get("/client/messages/recipients", { withCredentials: true }),
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
      const companyName = String(item?.companyId?.name || "").toLowerCase();
      const subject = String(item?.subject || "").toLowerCase();
      const messageText = String(item?.message || "").toLowerCase();
      return companyName.includes(query) || subject.includes(query) || messageText.includes(query);
    });
  }, [messages, search]);

  const getInitials = (name = "NA") =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");

  const formatDate = (value) => {
    if (!value) return "";
    return new Date(value).toLocaleString();
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!form.companyId || !form.subject.trim() || !form.message.trim()) {
      toast.error("Please fill all message fields.");
      return;
    }

    try {
      const res = await axios.post(
        "/client/messages/send",
        {
          companyId: form.companyId,
          subject: form.subject.trim(),
          message: form.message.trim(),
        },
        { withCredentials: true }
      );

      const newMessage = res.data?.data;
      if (newMessage) {
        setMessages((prev) => [newMessage, ...prev]);
      }

      setForm({ companyId: "", subject: "", message: "" });
      toast.success("Message sent successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Failed to send message.");
    }
  };

  const handleViewMessage = async (messageId) => {
    try {
      const res = await axios.get(`/client/messages/${messageId}`, { withCredentials: true });
      const viewedMessage = res.data?.data;
      if (viewedMessage) {
        setSelectedMessage(viewedMessage);
        setMessages((prev) =>
          prev.map((item) =>
            item._id === viewedMessage._id ? { ...viewedMessage, isReadByClient: true } : item
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
      await axios.delete(`/client/messages/${messageId}`, { withCredentials: true });
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
    <div className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900 md:px-10">
      <h1 className="mb-6 text-2xl font-semibold">Client Messages</h1>

      <form onSubmit={handleSend} className="mb-8 rounded-xl bg-white p-5 shadow-sm ring-1 ring-sky-100">
        <h2 className="mb-4 text-lg font-semibold">Send Message to Company</h2>

        <div className="grid gap-3 md:grid-cols-2">
          <select
            name="companyId"
            value={form.companyId}
            onChange={handleChange}
            className="rounded-lg border border-slate-200 p-2"
          >
            <option value="">Select company</option>
            {recipients.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="rounded-lg border border-slate-200 p-2"
          />
        </div>

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message"
          className="mt-3 min-h-24 w-full rounded-lg border border-slate-200 p-2"
        />

        <button type="submit" className="mt-3 rounded-lg bg-sky-700 px-4 py-2 text-white">
          Send
        </button>
      </form>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-semibold">Inbox</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by company, subject or message"
          className="w-full rounded-lg border border-slate-200 p-2 md:w-96"
        />
      </div>

      <div className="space-y-4">
        {isLoading && <p className="text-slate-500">Loading messages...</p>}

        {!isLoading && filteredMessages.length === 0 && (
          <p className="rounded-lg bg-white p-4 text-slate-500 ring-1 ring-slate-200">
            No messages found.
          </p>
        )}

        {!isLoading &&
          filteredMessages.map((item) => {
            const companyName = item?.companyId?.name || "Company";

            return (
              <div
                key={item._id}
                className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-sky-100 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-sky-700 font-bold text-white">
                    {getInitials(companyName)}
                  </div>

                  <div>
                    <h3 className="font-semibold">{companyName}</h3>
                    <p className="text-sm text-gray-600">{formatDate(item.createdAt)}</p>
                  </div>
                </div>

                <p className="max-w-lg text-gray-700">
                  <span className="font-medium">{item.subject}</span>
                  {": "}
                  {String(item.message || "").slice(0, 70)}
                </p>

                <div className="flex gap-4 text-lg">
                  <FaEye className="cursor-pointer text-sky-700" onClick={() => handleViewMessage(item._id)} />
                  <FaTrash className="cursor-pointer text-red-500" onClick={() => handleDelete(item._id)} />
                </div>
              </div>
            );
          })}
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white p-6">
            <h3 className="text-lg font-semibold">{selectedMessage.subject}</h3>
            <p className="mt-1 text-sm text-slate-500">
              From: {selectedMessage?.companyId?.name || "Company"} | {formatDate(selectedMessage.createdAt)}
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

export default ClientMessageContent;
