"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Plus,
  Search,
  Edit3,
  Trash2,
  Package,
  Tag,
  MoreVertical
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  is_available: boolean;
}

const sampleProducts: Product[] = [
  { id: "1", name: "برياني دجاج", category: "أطباق رئيسية", price: 45, description: "برياني دجاج تقليدي مع الأرز البسمتي والبهارات", is_available: true },
  { id: "2", name: "كبسة لحم", category: "أطباق رئيسية", price: 55, description: "كبسة لحم بالبهارات السعودية الأصيلة", is_available: true },
  { id: "3", name: "سلطة فتوش", category: "مقبلات", price: 18, description: "سلطة فتوش بالخضار الطازج", is_available: true },
  { id: "4", name: "عصير ليمون نعناع", category: "مشروبات", price: 12, description: "عصير طازج", is_available: false },
  { id: "5", name: "كنافة ناعمة", category: "حلويات", price: 25, description: "كنافة بالجبن والقطر", is_available: true },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProducts = products.filter(p =>
    p.name.includes(searchQuery) || p.category.includes(searchQuery)
  );

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
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
              <h1 className="text-xl font-bold text-slate-900">المنتجات والخدمات</h1>
              <p className="text-sm text-slate-500">إدارة منتجاتك وخدماتك المتاحة</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition"
          >
            <Plus size={18} />
            إضافة منتج
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary-50 rounded-lg">
                <Package className="text-primary-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{products.length}</p>
                <p className="text-sm text-slate-500">إجمالي المنتجات</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{products.filter(p => p.is_available).length}</p>
                <p className="text-sm text-slate-500">متاح حالياً</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Tag className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {new Set(products.map(p => p.category)).size}
                </p>
                <p className="text-sm text-slate-500">فئات</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="البحث في المنتجات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">المنتج</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">الفئة</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">السعر</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">الحالة</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{product.name}</p>
                        <p className="text-sm text-slate-500">{product.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-900">{product.price} ريال</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        product.is_available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {product.is_available ? "متاح" : "غير متاح"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition">
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">إضافة منتج جديد</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">اسم المنتج</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">الفئة</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500">
                  <option>أطباق رئيسية</option>
                  <option>مقبلات</option>
                  <option>مشروبات</option>
                  <option>حلويات</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">السعر (ريال)</label>
                <input type="number" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">الوصف</label>
                <textarea rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
              >
                إلغاء
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CheckCircle({ size, className }: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
