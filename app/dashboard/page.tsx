"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Package,
  Settings,
  BarChart3,
  Bell,
  Search,
  Menu,
  X,
  Bot,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronLeft,
  Sparkles,
  Phone,
  Calendar,
  Star,
  Zap
} from "lucide-react";

// Mock data for real-time feel
const mockStats = {
  activeCustomers: 1247,
  aiResponses: 8932,
  conversionRate: 34.2,
  needsHuman: 3,
  todayRevenue: 3450,
  pendingOrders: 12
};

const mockConversations = [
  { id: "1", name: "أحمد محمد", phone: "0501234567", message: "كم سعر الباقة الشهرية؟", time: "منذ 2 دقيقة", status: "ai", unread: true, avatar: "أ" },
  { id: "2", name: "سارة العلي", phone: "0509876543", message: "أريد حجز موعد غداً الساعة 5", time: "منذ 5 دقائق", status: "pending", unread: true, avatar: "س" },
  { id: "3", name: "خالد السالم", phone: "0551122334", message: "شكراً جزيلاً على المساعدة", time: "منذ 15 دقيقة", status: "done", unread: false, avatar: "خ" },
  { id: "4", name: "فاطمة الزهراء", phone: "0567788990", message: "المنتج غير متوفر؟", time: "منذ 30 دقيقة", status: "ai", unread: true, avatar: "ف" },
  { id: "5", name: "عبدالله الرشيد", phone: "0533344556", message: "متى يوصل الطلب؟", time: "منذ ساعة", status: "pending", unread: false, avatar: "ع" },
];

const mockNotifications = [
  { id: "1", type: "warning", title: "عميل غاضب", description: "عميل طلب التحدث مع إنسان", time: "منذ 5 دقائق" },
  { id: "2", type: "success", title: "طلب جديد", description: "أحمد محمد أكمل طلب بقيمة 350 ريال", time: "منذ 12 دقيقة" },
  { id: "3", type: "info", title: "متابعة تلقائية", description: "تم إرسال تذكير لـ 5 عملاء غير نشطين", time: "منذ ساعة" },
  { id: "4", type: "success", title: "إنجاز يومي", description: "+23% زيادة في الردود مقارنة بالأمس", time: "منذ ساعتين" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(mockStats);
  const [showNotifications, setShowNotifications] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        aiResponses: prev.aiResponses + Math.floor(Math.random() * 3),
        activeCustomers: prev.activeCustomers + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "overview", label: "الرئيسية", icon: LayoutDashboard, href: "/dashboard" },
    { id: "conversations", label: "المحادثات", icon: MessageSquare, href: "/conversations", badge: 3 },
    { id: "customers", label: "العملاء", icon: Users, href: "/customers" },
    { id: "products", label: "المنتجات", icon: Package, href: "/products" },
    { id: "analytics", label: "التقارير", icon: BarChart3, href: "#" },
    { id: "settings", label: "الإعدادات", icon: Settings, href: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Sidebar overlay (covers content when open) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-72 bg-white border-l border-slate-200 z-50 shadow-xl"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 relative">
                <img src="/logo.svg" alt="AI Business OS" className="w-full h-full" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900 block leading-tight">AI Business</span>
                <span className="text-xs text-slate-400">OS</span>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg">
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? "bg-primary-50 text-primary-700 font-semibold shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon size={20} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-bold">م</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">مطعم الذوق الرفيع</p>
                  <p className="text-xs text-slate-500">الباقة الاحترافية</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <Menu size={24} />
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">لوحة التحكم</h1>
                <p className="text-sm text-slate-500">مرحباً بك مجدداً! إليك ملخص اليوم</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="بحث..."
                  className="pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all w-64"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2.5 hover:bg-slate-100 rounded-xl transition"
                >
                  <Bell size={20} className="text-slate-600" />
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 top-full mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">الإشعارات</h3>
                        <span className="text-xs text-primary-600 cursor-pointer hover:underline">تحديد الكل مقروء</span>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {mockNotifications.map((notif) => (
                          <div key={notif.id} className="p-4 hover:bg-slate-50 transition border-b border-slate-50 last:border-0">
                            <div className="flex gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                notif.type === "warning" ? "bg-orange-500" :
                                notif.type === "success" ? "bg-green-500" : "bg-blue-500"
                              }`} />
                              <div>
                                <p className="font-medium text-slate-900 text-sm">{notif.title}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{notif.description}</p>
                                <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 flex-1">
          {/* Page Navigation Menu */}
          <div className="mb-6">
            <nav className="flex gap-2 overflow-auto">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveTab(item.id)}
                  className={`whitespace-nowrap px-3 py-2 rounded-lg transition-all text-sm font-medium border ${
                    activeTab === item.id
                      ? "bg-primary-600 text-white border-transparent"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            <StatCard
              title="العملاء النشطين"
              value={stats.activeCustomers.toLocaleString()}
              trend="+12%"
              trendUp
              icon={<Users size={20} />}
              color="blue"
            />
            <StatCard
              title="الردود التلقائية"
              value={stats.aiResponses.toLocaleString()}
              trend="+23%"
              trendUp
              icon={<Bot size={20} />}
              color="green"
            />
            <StatCard
              title="معدل التحويل"
              value={`${stats.conversionRate}%`}
              trend="+5.3%"
              trendUp
              icon={<TrendingUp size={20} />}
              color="purple"
            />
            <StatCard
              title="يحتاج تدخل"
              value={stats.needsHuman}
              trend="-2"
              trendUp={false}
              icon={<AlertCircle size={20} />}
              color="orange"
              alert
            />
            <StatCard
              title="إيرادات اليوم"
              value={`${stats.todayRevenue.toLocaleString()} ريال`}
              trend="+8%"
              trendUp
              icon={<BarChart3 size={20} />}
              color="primary"
            />
            <StatCard
              title="طلبات قيد الانتظار"
              value={stats.pendingOrders}
              trend="+3"
              trendUp={true}
              icon={<Clock size={20} />}
              color="cyan"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Conversations */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">المحادثات النشطة</h2>
                  <p className="text-sm text-slate-500">آخر المحادثات مع العملاء</p>
                </div>
                {/* FIXED: Changed href from "#" to "/conversations" */}
                <Link 
                  href="/conversations" 
                  className="text-primary-600 text-sm font-medium hover:underline flex items-center gap-1"
                >
                  عرض الكل
                  <ChevronLeft size={16} />
                </Link>
              </div>
              <div className="divide-y divide-slate-50">
                {mockConversations.map((conv, index) => (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 flex items-center gap-4 hover:bg-slate-50 transition cursor-pointer group ${
                      conv.unread ? "bg-primary-50/30" : ""
                    }`}
                  >
                    <div className="relative">
                      <div className={`w-12 h-12 bg-gradient-to-br from-primary-100 to-blue-100 rounded-xl flex items-center justify-center text-lg font-bold text-primary-700`}>
                        {conv.avatar}
                      </div>
                      {conv.unread && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary-500 rounded-full border-2 border-white"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900">{conv.name}</h3>
                        <span className="text-xs text-slate-400">{conv.phone}</span>
                      </div>
                      <p className="text-sm text-slate-500 truncate">{conv.message}</p>
                    </div>
                    <div className="text-left flex flex-col items-end gap-2">
                      <StatusBadge status={conv.status} />
                      <span className="text-xs text-slate-400">{conv.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Stats */}
            <div className="space-y-6">
              {/* AI Status */}
              <div className="bg-gradient-to-br from-primary-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-primary-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Bot size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">الـ AI نشط</h3>
                    <p className="text-primary-100 text-sm">يرد على العملاء تلقائياً</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-100">الردود اليوم</span>
                  <span className="font-bold text-xl">{stats.aiResponses.toLocaleString()}</span>
                </div>
                <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">إجراءات سريعة</h3>
                <div className="space-y-2">
                  <QuickActionButton icon={<MessageSquare size={18} />} label="محادثة جديدة" href="/conversations" />
                  <QuickActionButton icon={<Users size={18} />} label="إضافة عميل" href="/customers" />
                  <QuickActionButton icon={<Package size={18} />} label="إضافة منتج" href="/products" />
                  <QuickActionButton icon={<BarChart3 size={18} />} label="تصدير التقرير" href="/dashboard" />
                </div>
              </div>

              {/* Today's Highlights */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">إنجازات اليوم</h3>
                <div className="space-y-3">
                  <HighlightItem icon={<CheckCircle2 size={16} />} text="15 رد ناجح" color="text-green-500" />
                  <HighlightItem icon={<Star size={16} />} text="3 عملاء جدد" color="text-amber-500" />
                  <HighlightItem icon={<TrendingUp size={16} />} text="+23% معدل التفاعل" color="text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, icon, color, alert }: any) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    primary: "bg-primary-50 text-primary-600 border-primary-100",
    cyan: "bg-cyan-50 text-cyan-600 border-cyan-100",
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`bg-white rounded-xl border p-5 ${alert ? "border-orange-200" : "border-slate-200"} shadow-sm`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${colors[color] || colors.primary}`}>
          {icon}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          trendUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {trend}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-0.5">{value}</h3>
      <p className="text-slate-500 text-sm">{title}</p>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; color: string }> = {
    ai: { label: "AI", color: "bg-green-100 text-green-700 border-green-200" },
    pending: { label: "قيد الانتظار", color: "bg-amber-100 text-amber-700 border-amber-200" },
    done: { label: "مكتمل", color: "bg-slate-100 text-slate-600 border-slate-200" },
  };

  const c = config[status] || config.ai;

  return (
    <span className={`px-2 py-0.5 rounded-lg text-xs font-medium border ${c.color}`}>
      {c.label}
    </span>
  );
}

// FIXED: Added href prop and Link wrapper for QuickActionButton
function QuickActionButton({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link 
      href={href}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition text-right text-slate-700 hover:text-primary-600 group"
    >
      <span className="text-slate-400 group-hover:text-primary-500 transition">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

function HighlightItem({ icon, text, color }: { icon: React.ReactNode; text: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={color}>{icon}</span>
      <span className="text-sm text-slate-600">{text}</span>
    </div>
  );
}
