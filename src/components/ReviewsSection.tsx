import React from "react";
import { Star, CheckCircle2, Quote, ArrowRight } from "lucide-react";

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      id: "rev-1",
      name: "Wanjiku Mwangi",
      role: "Brand Director, TechBridge Westlands",
      rating: 5,
      date: "2 weeks ago",
      text: "The print fidelity on our roll-up banners and event backdrops was breathtaking. Sharp CMYK color calibration and delivered to our office hours ahead of schedule. Truly top-class work in Westlands.",
      avatar: "WM",
      verified: true,
      serviceUsed: "Luxury Teardrop Roll-up Banners"
    },
    {
      id: "rev-2",
      name: "Brian Ochieng",
      role: "Corporate Advocate, Westlands Legal Partners",
      rating: 5,
      date: "1 month ago",
      text: "Printed 500 executive business cards on 300gsm premium board with soft-touch velvet lamination. The paper weight and tactile feel is leagues ahead of standard commercial print shops in Nairobi.",
      avatar: "BO",
      verified: true,
      serviceUsed: "Executive Business Cards (Soft-Touch)"
    },
    {
      id: "rev-3",
      name: "Kevin Njoroge",
      role: "Operations Head, Rift Fleet Logistics",
      rating: 5,
      date: "3 weeks ago",
      text: "Our branded high-visibility reflector jackets and embroidered corporate polos turned out vibrant and rugged. Fast turn-around and transparent pricing via WhatsApp.",
      avatar: "KN",
      verified: true,
      serviceUsed: "Branded Reflectors & Workwear"
    },
    {
      id: "rev-4",
      name: "Amina Hassan",
      role: "Senior Consultant, GreenPath Advisory",
      rating: 5,
      date: "5 days ago",
      text: "Same-day express printing saved our regional tender submission. Submitted our final 80-page proposal PDF at 9:15 AM, and had 5 wire-bound corporate copies in Westlands by 1:00 PM.",
      avatar: "AH",
      verified: true,
      serviceUsed: "Same-Day Company Proposals"
    }
  ];

  return (
    <div className="w-full text-left space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex text-[#FFD400]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              5.0 / 5.0 Google Rating
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Client Voices Across Kenya
          </h3>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 font-sans max-w-sm">
          Verified experiences from corporate organizations, creative directors, and fast-moving Westlands businesses.
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-[#FFD400]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-slate-400">{rev.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed mb-6 italic">
                "{rev.text}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold font-mono text-xs flex items-center justify-center">
                  {rev.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{rev.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <span className="text-[10px] text-slate-400 block">{rev.role}</span>
                </div>
              </div>

              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 hidden sm:block">
                {rev.serviceUsed}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
