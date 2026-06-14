"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Star,
  Filter
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  status: string;
  total_orders: number;
  total_spent: number;
  last_contact: string;
}

const sampleCustomers: Customer[] = [
  { id: "1", name: "أحمد محمد", phone: "0501234567", status: "customer", total_orders: 12, total_spent: 2340, last_contact: "2026-06-05" },
  { id: "2", name: "سارة العلي", phone: "0509876543", status: "vip", total_orders: 28, total_spent: 8900, last_contact: "2026-06-04" },
  { id: "3", name: "خالد السالم", phone: "0551122334", status: "interested", total_orders: 2, total_spent: 450, last_contact: "2026-06-03" },
  { id: "4", name: "فاطمة الزهراء", phone: "0567788990", status: "lead", total_orders: 0, total_spent: 0, last_contact: "2026-06-01" },
  { id: "5", name: "عبدالله الرشيد", phone: "0533344556", status: "customer", total_orders: 8, total_spent: 1800, last_contact: "2026-05-28" },
];

export default function CustomersPage() {
  const [customers] = useState<Customer[]>(sampleCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.includes(searchQuery) || c.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusLabel = (status: string) => {
    const labels: Record<string, { label: string; color: string }> = {
      lead: { label: "محتمل", color: "bg-slate-100 text-slate-700" },
      interested: { label: "مهتم", color: "bg-blue-100 text-blue-700" },
      customer: { label: "عميل", color: "bg-green-100 text-green-700" },
      vip: { label: "VIP", color: "bg-amber-100 text-amber-700" },
      churned: { label: "غير نشط", color: "bg-red-100 text-red-700" },
    };
    return labels[status] || labels.lead;
  };

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-400 hover:text-slate-600">
              <ArrowRight size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">العملاء</h1>
              <p className="text-sm text-slate-500">إدارة ومراقبة عملائك</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {["all", "lead", "interested", "customer", "vip"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`p-4 rounded-xl border transition ${
                statusFilter === status
                  ? "border-primary-500 bg-primary-50"
                  : "border-slate-200 bg-white hover:border-primary-300"
              }`}
            >
              <p className="text-2xl font-bold text-slate-900">
                {status === "all" ? customers.length : customers.filter(c => c.status === status).length}
              </p>
              <p className="text-sm text-slate-500">
                {status === "all" ? "الكل" : getStatusLabel(status).label}
              </p>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="البحث بالاسم أو الرقم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">العميل</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">الحالة</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">الطلبات</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">إجمالي الإنفاق</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">آخر تواصل</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map((customer) => {
                  const status = getStatusLabel(customer.status);
                  return (
                    <tr key={customer.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-700 font-bold">{customer.name[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{customer.name}</p>
                            <p className="text-sm text-slate-500 flex items-center gap-1">
                              <Phone size={12} />
                              {customer.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-900">{customer.total_orders}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-900">{customer.total_spent} ريال</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <Calendar size={14} />
                          {customer.last_contact}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition">
                          <MessageSquare size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
