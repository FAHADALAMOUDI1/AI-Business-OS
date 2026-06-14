"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  MessageCircle,
  BarChart3,
  Shield,
  Zap,
  Users,
  Clock,
  ChevronLeft,
  Star,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  BrainCircuit
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    {
      name: "أحمد السبيعي",
      role: "صاحب مطعم",
      content: "من يوم استخدمت النظام، مبيعاتي زادت 40%. العملاء يتفاجئون من سرعة الرد!",
      rating: 5
    },
    {
      name: "سارة العتيبي",
      role: "مديرة صالون",
      content: "أفضل استثمار عملته. الـ AI يحجز المواعيد ويرسل التذكيرات تلقائياً.",
      rating: 5
    },
    {
      name: "خالد المطيري",
      role: "صاحب محل إلكترونيات",
      content: "الردود الذكية خلّتني أغلق البيع حتى وأنا نايم. نظام خرافي!",
      rating: 5
    }
  ];

  return (
    <main className="min-h-screen bg-white overflow-hidden" dir="rtl">
      {/* Floating Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-slate-200/50" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10">
              <Image src="/logo.svg" alt="AI Business OS" fill className="object-contain" />
            </div>
            <span className={`text-xl font-bold transition-colors ${isScrolled ? "text-slate-900" : "text-slate-900"}`}>
              AI Business OS
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {["المميزات", "كيف يعمل", "الأسعار", "الشهادات"].map((item) => (
              <Link
                key={item}
                href={`#${item}`}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  isScrolled ? "text-slate-600" : "text-slate-600"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden sm:flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 transition-all hover:shadow-lg hover:shadow-primary-500/25"
            >
              <Sparkles size={16} />
              جرب مجاناً
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles size={16} />
              نظام ذكي لإدارة الأعمال بالذكاء الاصطناعي
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight"
            >
              ذكاء اصطناعي يدير
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                  {" "}عملك بالكامل
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 2 100 2 150 6C200 10 250 10 298 2" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              رد تلقائي على واتساب، إدارة عملاء ذكية، تحليل مبيعات، وتسويق آلي — 
              كل ذلك في نظام واحد يتكيف مع أي نوع شركة
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/dashboard"
                className="group bg-primary-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-primary-700 transition-all hover:shadow-xl hover:shadow-primary-500/25 flex items-center justify-center gap-2"
              >
                ابدأ مجاناً لمدة 14 يوم
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </Link>
              <button className="group px-8 py-4 rounded-2xl text-lg font-semibold border-2 border-slate-200 text-slate-700 hover:border-primary-300 hover:text-primary-700 transition-all flex items-center justify-center gap-2">
                <PlayIcon />
                شاهد العرض التوضيحي
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-green-500" />
                لا يحتاج بطاقة ائتمان
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-green-500" />
                إلغاء فوري في أي وقت
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-green-500" />
                دعم فني 24/7
              </span>
            </motion.div>
          </motion.div>

          {/* Hero Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-blue-500 rounded-3xl blur opacity-20" />
              <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-slate-400 mr-2">AI Business OS Dashboard</span>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-500">العملاء النشطين</span>
                      <Users size={18} className="text-primary-500" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">1,247</p>
                    <p className="text-xs text-green-600 mt-1">+12% هذا الشهر</p>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-500">الردود التلقائية</span>
                      <Bot size={18} className="text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">8,932</p>
                    <p className="text-xs text-green-600 mt-1">+23% هذا الشهر</p>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-500">معدل التحويل</span>
                      <TrendingUp size={18} className="text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">34.2%</p>
                    <p className="text-xs text-green-600 mt-1">+5.3% هذا الشهر</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="المميزات" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">المميزات</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-4">
              كل ما تحتاجه في مكان واحد
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              نظام متكامل يجمع بين الذكاء الاصطناعي وإدارة الأعمال
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon={<MessageCircle className="h-8 w-8" />}
              title="رد واتساب ذكي"
              description="يرد على عملائك تلقائياً بالعربية واللهجات، ويبيع ويقنع بدون تدخل بشري"
              color="bg-green-50 text-green-600 border-green-200"
              delay={0}
            />
            <FeatureCard
              icon={<BrainCircuit className="h-8 w-8" />}
              title="CRM ذكي"
              description="يحفظ عملائك، يتابعهم، ويذكرك بالمتابعة في الوقت المناسب"
              color="bg-blue-50 text-blue-600 border-blue-200"
              delay={0.1}
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title="تحليل المبيعات"
              description="يفهم بياناتك ويخبرك: أي منتج يبيع، أي إعلان فاشل، وأين تكمن الفرص"
              color="bg-purple-50 text-purple-600 border-purple-200"
              delay={0.2}
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="تسويق آلي"
              description="يولد منشورات وحملات تسويقية مخصصة لشركتك تلقائياً"
              color="bg-amber-50 text-amber-600 border-amber-200"
              delay={0.3}
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="موظف افتراضي"
              description="مساعد داخلي يعرف كل بيانات شركتك ويجيب على أي سؤال"
              color="bg-rose-50 text-rose-600 border-rose-200"
              delay={0.4}
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="يعمل 24/7"
              description="لا يأخذ إجازة، لا يتأخر في الرد، ولا ينسى متابعة أي عميل"
              color="bg-cyan-50 text-cyan-600 border-cyan-200"
              delay={0.5}
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="كيف يعمل" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">كيف يعمل</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-4">
              ثلاث خطوات ونظامك جاهز
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "سجل شركتك",
                description: "اختر نوع نشاطك وأضف منتجاتك وخدماتك في دقائق",
                icon: <Users size={32} />
              },
              {
                step: "02",
                title: "اربط واتساب",
                description: "اربط رقم واتساب أعمالك بالنظام بخطوات بسيطة",
                icon: <MessageCircle size={32} />
              },
              {
                step: "03",
                title: "استرخِ واترك الباقي علينا",
                description: "الـ AI يبدأ بالرد على العملاء وإدارة المحادثات تلقائياً",
                icon: <Zap size={32} />
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary-600">
                    {item.icon}
                  </div>
                  <span className="text-5xl font-bold text-slate-100 absolute top-4 left-6">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -left-4 transform -translate-y-1/2">
                    <ChevronLeft size={24} className="text-slate-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="الأسعار" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">الأسعار</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-4">
              اختر الخطة المناسبة لك
            </h2>
            <p className="text-lg text-slate-500">ابدأ مجاناً ووسّع حسب احتياجك</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="البداية"
              price="199"
              description="للشركات الصغيرة"
              features={[
                "رد واتساب ذكي",
                "CRM بسيط",
                "100 عميل",
                "دعم فني"
              ]}
              highlighted={false}
            />
            <PricingCard
              name="النمو"
              price="499"
              description="للشركات المتوسطة"
              features={[
                "كل مميزات البداية",
                "تحليل المبيعات",
                "تسويق آلي",
                "500 عميل",
                "تقارير متقدمة"
              ]}
              highlighted={true}
            />
            <PricingCard
              name="الاحترافي"
              price="999"
              description="للشركات الكبيرة"
              features={[
                "كل مميزات النمو",
                "موظف افتراضي (RAG)",
                "تحليل المكالمات",
                "عملاء غير محدود",
                "API للمطورين"
              ]}
              highlighted={false}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="الشهادات" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">الشهادات</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-4">
              ماذا يقول عملاؤنا
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 text-center shadow-lg"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                  "{testimonials[activeTestimonial].content}"
                </p>
                <div>
                  <p className="font-bold text-slate-900">{testimonials[activeTestimonial].name}</p>
                  <p className="text-slate-500">{testimonials[activeTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial ? "bg-primary-600 w-8" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            جاهز لتطوير عملك؟
          </h2>
          <p className="text-primary-100 text-xl mb-10 max-w-2xl mx-auto">
            انضم لآلاف الشركات السعودية التي تستخدم AI Business OS
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-primary-50 transition-all hover:shadow-xl"
          >
            ابدأ الآن — مجاناً لمدة 14 يوم
            <ArrowLeft size={20} />
          </Link>
          <p className="text-primary-200 text-sm mt-6">لا يحتاج بطاقة ائتمان • إلغاء فوري</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-10 h-10">
                  <Image src="/logo.svg" alt="AI Business OS" fill className="object-contain" />
                </div>
                <span className="text-xl font-bold text-white">AI Business OS</span>
              </div>
              <p className="text-sm leading-relaxed">
                نظام ذكي لإدارة الأعمال بالذكاء الاصطناعي. نساعد الشركات السعودية على النمو والتطور.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">المنتج</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">المميزات</Link></li>
                <li><Link href="#" className="hover:text-white transition">الأسعار</Link></li>
                <li><Link href="#" className="hover:text-white transition">التحديثات</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">الشركة</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">من نحن</Link></li>
                <li><Link href="#" className="hover:text-white transition">المدونة</Link></li>
                <li><Link href="#" className="hover:text-white transition">تواصل معنا</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">الدعم</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">مركز المساعدة</Link></li>
                <li><Link href="#" className="hover:text-white transition">الأسئلة الشائعة</Link></li>
                <li><Link href="#" className="hover:text-white transition">الشروط والأحكام</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>© 2026 AI Business OS. جميع الحقوق محفوظة. 🇸🇦 صنع في السعودية</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description, color, delay }: any) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-xl hover:border-primary-200 transition-all group"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${color} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function PricingCard({ name, price, description, features, highlighted }: any) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`rounded-2xl p-8 ${
        highlighted
          ? "bg-primary-600 text-white shadow-2xl shadow-primary-500/25 scale-105 relative z-10"
          : "bg-white border border-slate-200"
      }`}
    >
      {highlighted && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 px-4 py-1 rounded-full text-sm font-bold">
          الأكثر شعبية
        </span>
      )}
      <h3 className={`text-xl font-bold mb-2 ${highlighted ? "text-white" : "text-slate-900"}`}>
        {name}
      </h3>
      <p className={`text-sm mb-6 ${highlighted ? "text-primary-100" : "text-slate-500"}`}>
        {description}
      </p>
      <div className="mb-6">
        <span className={`text-4xl font-bold ${highlighted ? "text-white" : "text-slate-900"}`}>
          {price}
        </span>
        <span className={`text-sm ${highlighted ? "text-primary-200" : "text-slate-400"}`}>
          {" "}ريال/شهر
        </span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <CheckCircle2 size={16} className={highlighted ? "text-primary-200" : "text-green-500"} />
            <span className={highlighted ? "text-primary-50" : "text-slate-600"}>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/dashboard"
        className={`block text-center py-3 rounded-xl font-semibold transition-all ${
          highlighted
            ? "bg-white text-primary-600 hover:bg-primary-50"
            : "bg-primary-600 text-white hover:bg-primary-700"
        }`}
      >
        ابدأ الآن
      </Link>
    </motion.div>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
    </svg>
  );
}
