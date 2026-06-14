"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Search,
  Bot,
  Send,
  Phone,
  MoreVertical,
  Paperclip,
  Smile,
  CheckCheck,
  User,
  Star,
  Flag,
  Mic,
  Image as ImageIcon,
  Clock,
  MessageCircle,
} from "lucide-react";

type ConversationStatus = "ai" | "pending" | "done" | "human";

type StatusFilterValue = ConversationStatus | "all";

interface Message {
  id: string;
  sender: "customer" | "ai" | "human";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
  type?: "text" | "image" | "voice";
}

interface Conversation {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  lastMessage: string;
  time: string;
  status: ConversationStatus;
  unread: boolean;
  messages: Message[];
  tags: string[];
}

const sampleConversations: Conversation[] = [
  {
    id: "1",
    name: "أحمد محمد",
    phone: "0501234567",
    avatar: "أ",
    lastMessage: "كم سعر الباقة الشهرية؟",
    time: "10:30",
    status: "ai",
    unread: true,
    tags: ["مهتم", "سعر"],
    messages: [
      { id: "1", sender: "customer", text: "السلام عليكم", time: "10:00", status: "read" },
      { id: "2", sender: "ai", text: "وعليكم السلام! حياك الله في مطعم الذوق الرفيع. كيف أقدر أساعدك اليوم؟", time: "10:00", status: "read" },
      { id: "3", sender: "customer", text: "كم سعر الباقة الشهرية؟", time: "10:02", status: "read" },
      { id: "4", sender: "ai", text: `الباقة الشهرية تشمل:
• 3 وجبات أسبوعياً
• توصيل مجاني
• خصم 15% على الطلبات الإضافية

السعر: 499 ريال/شهر

هل تريد الاشتراك؟`, time: "10:02", status: "read" },
    ]
  },
  {
    id: "2",
    name: "سارة العلي",
    phone: "0509876543",
    avatar: "س",
    lastMessage: "أريد حجز موعد غداً الساعة 5",
    time: "10:25",
    status: "pending",
    unread: true,
    tags: ["حجز", "موعد"],
    messages: [
      { id: "1", sender: "customer", text: "أريد حجز موعد غداً الساعة 5", time: "10:25", status: "read" },
    ]
  },
  {
    id: "3",
    name: "خالد السالم",
    phone: "0551122334",
    avatar: "خ",
    lastMessage: "شكراً جزيلاً على المساعدة",
    time: "10:15",
    status: "done",
    unread: false,
    tags: ["مكتمل"],
    messages: [
      { id: "1", sender: "customer", text: "شكراً جزيلاً على المساعدة", time: "10:15", status: "read" },
      { id: "2", sender: "ai", text: "العفو! نحن في خدمتك دائماً. بالتوفيق 🌟", time: "10:15", status: "read" },
    ]
  },
  {
    id: "4",
    name: "فاطمة الزهراء",
    phone: "0567788990",
    avatar: "ف",
    lastMessage: "المنتج غير متوفر؟",
    time: "10:10",
    status: "ai",
    unread: true,
    tags: ["استفسار"],
    messages: [
      { id: "1", sender: "customer", text: "المنتج غير متوفر؟", time: "10:10", status: "read" },
    ]
  },
  {
    id: "5",
    name: "عبدالله الرشيد",
    phone: "0533344556",
    avatar: "ع",
    lastMessage: "متى يوصل الطلب؟",
    time: "09:45",
    status: "pending",
    unread: false,
    tags: ["طلب", "توصيل"],
    messages: [
      { id: "1", sender: "customer", text: "متى يوصل الطلب؟", time: "09:45", status: "read" },
    ]
  },
];

const statusFilters: { value: StatusFilterValue; label: string; count: number }[] = [
  { value: "all", label: "الكل", count: 5 },
  { value: "ai", label: "AI", count: 2 },
  { value: "pending", label: "قيد الانتظار", count: 2 },
  { value: "human", label: "يحتاج بشري", count: 0 },
  { value: "done", label: "مكتمل", count: 1 },
];

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations);
  const [selectedId, setSelectedId] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedConversation = conversations.find(c => c.id === selectedId);

  const filteredConversations = conversations.filter(c => {
    const matchesSearch = c.name.includes(searchQuery) || c.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages, isTyping]);

  const handleSend = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "human",
      text: newMessage,
      time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      status: "sent"
    };

    setConversations(prev => prev.map(c => 
      c.id === selectedId 
        ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMessage }
        : c
    ));
    setNewMessage("");

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "حاضر، تم استلام رسالتك. سأتابع معك في أقرب وقت ممكن.",
        time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
        status: "read"
      };
      setConversations(prev => prev.map(c => 
        c.id === selectedId 
          ? { ...c, messages: [...c.messages, aiResponse], lastMessage: aiResponse.text }
          : c
      ));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-400 hover:text-slate-600">
              <ArrowRight size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">المحادثات</h1>
              <p className="text-sm text-slate-500">إدارة ومراقبة محادثات العملاء</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium flex items-center gap-1.5 border border-green-200">
              <Bot size={14} />
              AI نشط
            </span>
            <span className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium flex items-center gap-1.5 border border-orange-200">
              <Flag size={14} />
              3 تحتاج تدخل
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-180px)]">
          {/* Conversations Sidebar */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
            {/* Search & Filters */}
            <div className="p-4 border-b border-slate-100 space-y-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="البحث في المحادثات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all text-sm"
                />
              </div>
                          <div className="flex gap-1.5 overflow-x-auto pb-1">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setStatusFilter(filter.value)}
                    type="button"
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      statusFilter === filter.value
                        ? "bg-primary-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence>
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conv, index) => (
                    <motion.button
                      key={conv.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedId(conv.id)}
                      className={`w-full p-4 text-right border-b border-slate-50 hover:bg-slate-50 transition-all ${
                        selectedId === conv.id ? "bg-primary-50/50 border-r-4 border-r-primary-500" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                            selectedId === conv.id 
                              ? "bg-primary-100 text-primary-700" 
                              : "bg-slate-100 text-slate-600"
                          }`}>
                            {conv.avatar}
                          </div>
                          {conv.unread && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full border-2 border-white flex items-center justify-center">
                              <span className="w-1.5 h-1.5 bg-white rounded-full" />
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-slate-900 text-sm">{conv.name}</h3>
                            <span className="text-xs text-slate-400">{conv.time}</span>
                          </div>
                          <p className={`text-sm truncate ${conv.unread ? "text-slate-900 font-medium" : "text-slate-500"}`}>
                            {conv.lastMessage}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <StatusBadge status={conv.status} />
                            <div className="flex gap-1">
                              {conv.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-400">
                    <MessageCircle size={32} className="mx-auto mb-3 opacity-50" />
                    <p>لا توجد محادثات مطابقة</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-blue-100 rounded-xl flex items-center justify-center text-lg font-bold text-primary-700">
                      {selectedConversation.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{selectedConversation.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Phone size={12} />
                          {selectedConversation.phone}
                        </span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <StatusBadge status={selectedConversation.status} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-400 hover:text-slate-600">
                      <Phone size={18} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-400 hover:text-slate-600">
                      <Star size={18} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-400 hover:text-slate-600">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                  <AnimatePresence>
                    {selectedConversation.messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === "customer" ? "justify-start" : "justify-end"}`}
                      >
                        <div className={`max-w-[75%] ${msg.sender === "customer" ? "order-2" : "order-1"}`}>
                          <div
                            className={`px-4 py-3 rounded-2xl ${
                              msg.sender === "customer"
                                ? "bg-white text-slate-900 rounded-tr-none border border-slate-200 shadow-sm"
                                : msg.sender === "ai"
                                ? "bg-primary-600 text-white rounded-tl-none shadow-sm"
                                : "bg-green-600 text-white rounded-tl-none shadow-sm"
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                          </div>
                          <div className={`flex items-center gap-1 mt-1 ${msg.sender === "customer" ? "justify-start" : "justify-end"}`}>
                            <span className="text-xs text-slate-400">{msg.time}</span>
                            {msg.sender !== "customer" && msg.status && (
                              <CheckCheck size={12} className={msg.status === "read" ? "text-blue-400" : "text-slate-400"} />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* AI Typing Indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-end"
                      >
                        <div className="bg-primary-600 text-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                          <div className="flex gap-1">
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                              className="w-2 h-2 bg-white/60 rounded-full"
                            />
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                              className="w-2 h-2 bg-white/60 rounded-full"
                            />
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                              className="w-2 h-2 bg-white/60 rounded-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100">
                  <div className="flex items-end gap-2">
                    <div className="flex items-center gap-1">
                      <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition">
                        <Paperclip size={20} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition">
                        <ImageIcon size={20} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition">
                        <Mic size={20} />
                      </button>
                    </div>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="اكتب رسالتك..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all pr-10"
                      />
                      <button className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-amber-500 transition">
                        <Smile size={18} />
                      </button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!newMessage.trim()}
                      className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      <Send size={18} />
                    </motion.button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={32} className="text-slate-300" />
                  </div>
                  <p className="text-lg font-medium text-slate-500">اختر محادثة لعرضها</p>
                  <p className="text-sm text-slate-400 mt-1">ستظهر الرسائل هنا</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: ConversationStatus }) {
  const config: Record<ConversationStatus, { label: string; color: string; icon: ReactNode }> = {
    ai: { label: "AI", color: "bg-green-100 text-green-700 border-green-200", icon: <Bot size={10} /> },
    pending: { label: "قيد الانتظار", color: "bg-amber-100 text-amber-700 border-amber-200", icon: <Clock size={10} /> },
    done: { label: "مكتمل", color: "bg-slate-100 text-slate-600 border-slate-200", icon: <CheckCheck size={10} /> },
    human: { label: "بشري", color: "bg-blue-100 text-blue-700 border-blue-200", icon: <User size={10} /> },
  };

  const c = config[status];

  return (
    <span className={`px-2 py-0.5 rounded-lg text-xs font-medium border flex items-center gap-1 ${c.color}`}>
      {c.icon}
      {c.label}
    </span>
  );
}
