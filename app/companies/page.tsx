"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Link from "next/link";
import {
  ArrowRight,
  Plus,
  Building2,
  Phone,
  Mail,
  MapPin,
  Bot,
  Settings,
  Trash2,
  Edit3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const BUSINESS_TYPES = [
  { value: "restaurant", label: "مطعم/كافيه" },
  { value: "retail", label: "محل تجاري" },
  { value: "service", label: "خدمات" },
  { value: "clinic", label: "عيادة/صيدلية" },
  { value: "salon", label: "صالون/سبا" },
  { value: "gym", label: "نادي رياضي" },
  { value: "other", label: "أخرى" },
];

export default function CompaniesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: companies, isLoading } = useQuery<any[], Error>({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await api.getCompanies();
      return res.data as any[];
    },
  });

  const createMutation = useMutation({
    mutationFn: (companyData: any) => api.createCompany(companyData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (companyId: string) => api.deleteCompany(companyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      business_type: formData.get("business_type"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: formData.get("address"),
      ai_persona: formData.get("ai_persona"),
      settings: {
        language: "ar",
        tone: formData.get("tone") || "friendly",
        auto_reply: true,
        human_handoff: true,
      },
    };
    createMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-500 hover:text-slate-700">
              <ArrowRight size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">إدارة الشركات</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition"
          >
            <Plus size={18} />
            شركة جديدة
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Add Company Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4">إضافة شركة جديدة</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">اسم الشركة *</label>
                <input
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="مثال: مطعم الذواقة"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">نوع النشاط *</label>
                <select
                  name="business_type"
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500"
                >
                  <option value="">اختر نوع النشاط</option>
                  {BUSINESS_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">رقم الهاتف</label>
                <input
                  name="phone"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="05xxxxxxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني</label>
                <input
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="example@company.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">العنوان</label>
                <input
                  name="address"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="المدينة، الحي، الشارع"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">وصف شخصية AI</label>
                <textarea
                  name="ai_persona"
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="مثال: نحن مطعم عائلي نقدم أكل بيتي طازج..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">نبرة الرد</label>
                <select
                  name="tone"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500"
                >
                  <option value="friendly">ودي</option>
                  <option value="professional">محترف</option>
                  <option value="formal">رسمي</option>
                  <option value="sales">مبيعاتي</option>
                </select>
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                >
                  {createMutation.isPending ? "جاري الإضافة..." : "إضافة الشركة"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border border-slate-300 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-50 transition"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Companies List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-slate-500 mt-4">جاري التحميل...</p>
          </div>
        ) : companies?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <Building2 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">لا توجد شركات</h3>
            <p className="text-slate-500">أضف أول شركة لبدء استخدام النظام</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies?.map((company: any) => (
              <CompanyCard
                key={company.id}
                company={company}
                onDelete={() => deleteMutation.mutate(company.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function CompanyCard({ company, onDelete }: { company: any; onDelete: () => void }) {
  const typeLabels: Record<string, string> = {
    restaurant: "مطعم/كافيه",
    retail: "محل تجاري",
    service: "خدمات",
    clinic: "عيادة/صيدلية",
    salon: "صالون/سبا",
    gym: "نادي رياضي",
    other: "أخرى",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
          <Building2 className="h-6 w-6 text-primary-600" />
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary-600 transition">
            <Edit3 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-1">{company.name}</h3>
      <span className="inline-block bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full mb-3">
        {typeLabels[company.business_type] || company.business_type}
      </span>

      <div className="space-y-2 text-sm text-slate-500">
        {company.phone && (
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span>{company.phone}</span>
          </div>
        )}
        {company.email && (
          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span>{company.email}</span>
          </div>
        )}
        {company.address && (
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span className="truncate">{company.address}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {company.whatsapp_connected ? (
            <>
              <CheckCircle2 size={16} className="text-green-500" />
              <span className="text-sm text-green-600">واتساب متصل</span>
            </>
          ) : (
            <>
              <XCircle size={16} className="text-slate-400" />
              <span className="text-sm text-slate-400">واتساب غير متصل</span>
            </>
          )}
        </div>
        <Link
          href={`/companies/${company.id}`}
          className="text-primary-600 text-sm hover:underline flex items-center gap-1"
        >
          <Settings size={14} />
          الإعدادات
        </Link>
      </div>
    </div>
  );
}
