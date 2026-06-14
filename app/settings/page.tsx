"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Save,
  Building2,
  Palette,
  MessageSquare,
  Clock,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Globe,
  Moon,
  Sun,
  Bell,
  Shield,
  CreditCard,
  ChevronLeft
} from "lucide-react";

const tabs = [
  { id: "general", label: "معلومات عامة", icon: Building2 },
  { id: "ai", label: "شخصية الـ AI", icon: Bot },
  { id: "style", label: "أسلوب التواصل", icon: Palette },
  { id: "whatsapp", label: "واتساب", icon: MessageSquare },
  { id: "hours", label: "ساعات العمل", icon: Clock },
  { id: "notifications", label: "الإشعارات", icon: Bell },
];

const businessTypes = [
  { value: "restaurant", label: "مطعم/كافيه", emoji: "🍽️" },
  { value: "retail", label: "محل تجاري", emoji: "🛍️" },
  { value: "service", label: "خدمات", emoji: "🔧" },
  { value: "clinic", label: "عيادة/صيدلية", emoji: "🏥" },
  { value: "salon", label: "صالون/سبا", emoji: "💇" },
  { value: "gym", label: "نادي رياضي", emoji: "💪" },
  { value: "other", label: "أخرى", emoji: "🏢" },
];

const toneOptions = [
  { value: "friendly", label: "ودي", desc: "أسلوب حماسي وعائلي" },
  { value: "professional", label: "محترف", desc: "أسلوب رسمي ومهني" },
  { value: "sales", label: "مبيعاتي", desc: "أسلوب مقنع ومحفز" },
  { value: "formal", label: "رسمي", desc: "أسلوب رسمي جداً" },
];

const languageOptions = [
  { value: "fusha", label: "عربي فصيح" },
  { value: "dialect", label: "لهجة سعودية" },
  { value: "mixed", label: "مزيج" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: "مطعم الذوق الرفيع",
    businessType: "restaurant",
    phone: "0501234567",
    email: "info@alzouq.com",
    address: "شارع الملك فهد، الرياض",
    aiPersona: `نحن مطعم عائلي متخصص في المأكولات السعودية التقليدية.
نفتخر بجودة مكوناتنا الطازجة وخدمتنا الممتازة.
أوقات العمل: من الساعة 12 ظهراً حتى 12 منتصف الليل.
نقدم خدمة التوصيل داخل الرياض.
عروضنا الأسبوعية: برياني الجمعة، كبسة السبت.`,
    tone: "friendly",
    language: "fusha",
    autoReply: true,
    humanHandoff: true,
    welcomeMessage: true,
    whatsappNumber: "966501234567",
    welcomeText: "حياك الله! أنا مساعدك الذكي في مطعم الذوق الرفيع. كيف أقدر أساعدك اليوم؟",
    awayText: "شكراً لتواصلك معنا! نحن خارج أوقات العمل حالياً. سنتواصل معك في أقرب وقت ممكن.",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-400 hover:text-slate-600">
              <ArrowRight size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">إعدادات الشركة</h1>
              <p className="text-sm text-slate-500">خصص نظامك حسب احتياجك</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="bg-primary-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-700 transition shadow-sm"
          >
            <Save size={18} />
            حفظ التغييرات
          </motion.button>
        </div>
      </header>

      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-6xl mx-auto mt-4 px-6"
          >
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2 shadow-sm">
              <CheckCircle2 size={18} />
              <span className="font-medium">تم حفظ التغييرات بنجاح!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm sticky top-24">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-right transition-all ${
                    activeTab === tab.id
                      ? "bg-primary-50 text-primary-700 font-semibold border-r-3 border-r-primary-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <tab.icon size={18} />
                  <span className="flex-1">{tab.label}</span>
                  {activeTab === tab.id && <ChevronLeft size={16} className="text-primary-500" />}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "general" && <GeneralSettings formData={formData} onChange={handleChange} />}
                {activeTab === "ai" && <AISettings formData={formData} onChange={handleChange} />}
                {activeTab === "style" && <StyleSettings formData={formData} onChange={handleChange} />}
                {activeTab === "whatsapp" && <WhatsAppSettings formData={formData} onChange={handleChange} />}
                {activeTab === "hours" && <HoursSettings />}
                {activeTab === "notifications" && <NotificationSettings />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

function GeneralSettings({ formData, onChange }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
            <Building2 className="text-primary-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">معلومات الشركة</h2>
            <p className="text-sm text-slate-500">المعلومات الأساسية عن نشاطك التجاري</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="اسم الشركة" icon={<Building2 size={16} />}>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
            />
          </FormField>

          <FormField label="نوع النشاط">
            <div className="grid grid-cols-2 gap-2">
              {businessTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => onChange("businessType", type.value)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-all ${
                    formData.businessType === type.value
                      ? "border-primary-500 bg-primary-50 text-primary-700 font-medium"
                      : "border-slate-200 hover:border-primary-300 text-slate-600"
                  }`}
                >
                  <span>{type.emoji}</span>
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </FormField>

          <FormField label="رقم الهاتف" icon={<Phone size={16} />}>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
            />
          </FormField>

          <FormField label="البريد الإلكتروني" icon={<Mail size={16} />}>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onChange("email", e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
            />
          </FormField>

          <FormField label="العنوان" icon={<MapPin size={16} />} className="md:col-span-2">
            <textarea
              rows={3}
              value={formData.address}
              onChange={(e) => onChange("address", e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all resize-none"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}

function AISettings({ formData, onChange }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
            <Sparkles className="text-purple-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">شخصية الـ AI</h2>
            <p className="text-sm text-slate-500">حدد كيف يتصرف المساعد الذكي مع عملائك</p>
          </div>
        </div>

        <FormField label="وصف شخصية المساعد الذكي" helper="اكتب وصفاً تفصيلياً عن شركتك: المنتجات، الخدمات، السياسات، العروض">
          <textarea
            rows={8}
            value={formData.aiPersona}
            onChange={(e) => onChange("aiPersona", e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all font-mono text-sm leading-relaxed"
          />
        </FormField>

        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800 flex items-start gap-2">
            <Sparkles size={16} className="mt-0.5 flex-shrink-0" />
            <span>كلما كان الوصف أدق، كان الردود أفضل. اذكر: المنتجات، الأسعار، السياسات، العروض، وأوقات العمل.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function StyleSettings({ formData, onChange }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
            <Palette className="text-pink-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">أسلوب التواصل</h2>
            <p className="text-sm text-slate-500">حدد نبرة ولغة الردود</p>
          </div>
        </div>

        <FormField label="نبرة الرد">
          <div className="grid grid-cols-2 gap-3">
            {toneOptions.map((tone) => (
              <button
                key={tone.value}
                onClick={() => onChange("tone", tone.value)}
                className={`p-4 rounded-xl border text-right transition-all ${
                  formData.tone === tone.value
                    ? "border-primary-500 bg-primary-50 shadow-sm"
                    : "border-slate-200 hover:border-primary-300 hover:bg-slate-50"
                }`}
              >
                <div className={`font-semibold mb-1 ${formData.tone === tone.value ? "text-primary-700" : "text-slate-900"}`}>
                  {tone.label}
                </div>
                <div className="text-sm text-slate-500">{tone.desc}</div>
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="اللغة المفضلة" className="mt-5">
          <div className="flex gap-3">
            {languageOptions.map((lang) => (
              <button
                key={lang.value}
                onClick={() => onChange("language", lang.value)}
                className={`flex-1 px-4 py-3 rounded-xl border text-center transition-all ${
                  formData.language === lang.value
                    ? "border-primary-500 bg-primary-50 text-primary-700 font-medium"
                    : "border-slate-200 hover:border-primary-300 text-slate-600"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </FormField>

        <div className="mt-6 space-y-4">
          <ToggleSwitch
            label="الرد التلقائي مفعل"
            description="يرد الـ AI على الرسائل تلقائياً"
            checked={formData.autoReply}
            onChange={(v: boolean) => onChange("autoReply", v)}
          />
          <ToggleSwitch
            label="التحويل للبشري عند الطلب"
            description="يحول العميل لموظف بشري عند طلب 'موظف' أو 'إنسان'"
            checked={formData.humanHandoff}
            onChange={(v: boolean) => onChange("humanHandoff", v)}
          />
          <ToggleSwitch
            label="رسالة ترحيبية تلقائية"
            description="يرسل رسالة ترحيب عند أول تواصل"
            checked={formData.welcomeMessage}
            onChange={(v: boolean) => onChange("welcomeMessage", v)}
          />
        </div>
      </div>
    </div>
  );
}

function WhatsAppSettings({ formData, onChange }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
            <MessageSquare className="text-green-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">إعدادات واتساب</h2>
            <p className="text-sm text-slate-500">ربط وإدارة حساب واتساب أعمال</p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 mb-6">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-700 font-medium">متصل — WhatsApp Business API</span>
          <span className="text-green-600 text-sm mr-auto">مفعل</span>
        </div>

        <div className="space-y-5">
          <FormField label="رقم الواتساب" icon={<Phone size={16} />}>
            <input
              type="text"
              value={formData.whatsappNumber}
              disabled
              className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500"
            />
          </FormField>

          <FormField label="رسالة الترحيب" helper="تُرسل عند أول تواصل من العميل">
            <textarea
              rows={3}
              value={formData.welcomeText}
              onChange={(e) => onChange("welcomeText", e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
            />
          </FormField>

          <FormField label="رسالة خارج أوقات العمل" helper="تُرسل عندما يتواصل العميل خارج أوقات العمل">
            <textarea
              rows={3}
              value={formData.awayText}
              onChange={(e) => onChange("awayText", e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}

function HoursSettings() {
  const days = [
    { name: "السبت", start: "09:00", end: "21:00", open: true },
    { name: "الأحد", start: "09:00", end: "21:00", open: true },
    { name: "الإثنين", start: "09:00", end: "21:00", open: true },
    { name: "الثلاثاء", start: "09:00", end: "21:00", open: true },
    { name: "الأربعاء", start: "09:00", end: "21:00", open: true },
    { name: "الخميس", start: "09:00", end: "23:00", open: true },
    { name: "الجمعة", start: "16:00", end: "23:00", open: true },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
            <Clock className="text-orange-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">ساعات العمل</h2>
            <p className="text-sm text-slate-500">حدد أوقات تواجدك وعمل الـ AI</p>
          </div>
        </div>

        <div className="space-y-3">
          {days.map((day) => (
            <div key={day.name} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked={day.open} className="w-5 h-5 text-primary-600 rounded-lg" />
                <span className="font-medium text-slate-700 w-20">{day.name}</span>
              </label>
              <input
                type="time"
                defaultValue={day.start}
                className="px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500"
              />
              <span className="text-slate-400">إلى</span>
              <input
                type="time"
                defaultValue={day.end}
                className="px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Bell className="text-blue-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">إعدادات الإشعارات</h2>
            <p className="text-sm text-slate-500">حدد الإشعارات التي تريد تلقيها</p>
          </div>
        </div>

        <div className="space-y-4">
          <ToggleSwitch label="عميل جديد" description="إشعار عند تواصل عميل جديد" checked={true} />
          <ToggleSwitch label="طلب جديد" description="إشعار عند إتمام طلب" checked={true} />
          <ToggleSwitch label="شكوى أو مشكلة" description="إشعار عند شكوى عميل أو طلب تحدث مع إنسان" checked={true} />
          <ToggleSwitch label="تقرير يومي" description="إرسال ملخص يومي على البريد" checked={false} />
          <ToggleSwitch label="تجاوز حد الرد" description="إشعار عندما يتجاوز عدد الردود اليومية الحد المسموح" checked={true} />
        </div>
      </div>
    </div>
  );
}

// Reusable Components
function FormField({ label, icon, helper, children, className = "" }: any) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
        {icon}
        {label}
      </label>
      {children}
      {helper && <p className="text-xs text-slate-400 mt-1.5">{helper}</p>}
    </div>
  );
}

function ToggleSwitch({ label, description, checked, onChange }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
      <div>
        <p className="font-medium text-slate-900">{label}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <button
        onClick={() => onChange && onChange(!checked)}
        className={`relative w-12 h-7 rounded-full transition-colors ${
          checked ? "bg-primary-600" : "bg-slate-300"
        }`}
      >
        <motion.div
          animate={{ x: checked ? 20 : 2 }}
          className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
        />
      </button>
    </div>
  );
}
