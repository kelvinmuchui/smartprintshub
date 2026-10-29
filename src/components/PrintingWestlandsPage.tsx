import { ArrowRight, Instagram, MapPin, Phone, Printer } from "lucide-react";
import { SMARTPRINTS_FAQS, SERVICES_LIST } from "../data";
import { BUSINESS } from "../seo";

export default function PrintingWestlandsPage() {
  const printingServices = SERVICES_LIST.filter((service) => service.category === "printing" || service.category === "branding");

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900">
      <header className="sticky top-0 z-40 w-full glassmorphism border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" aria-label="SmartPrints Hub home">
            <img src="/logo.svg" alt="SmartPrints Hub printing shop logo" className="h-11 w-auto object-contain" />
          </a>
          <a href="/#contact" className="flex items-center gap-2 px-4 py-2 bg-[#003B9C] text-white rounded-lg text-xs font-bold uppercase tracking-wider">
            Contact us <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
              <Printer className="w-4 h-4" /> Westlands, Nairobi
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-900 leading-tight">
              Printing Services in Westlands, Nairobi
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              SmartPrints Hub provides digital printing and corporate branding from Westlands Market, Shop A11. Order practical print materials for your business, event, office, or personal project and speak directly with our print team.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="/#services" className="px-5 py-3 rounded-xl bg-[#003B9C] text-white text-xs font-black uppercase tracking-widest">View printing services</a>
              <a href="tel:+254743603068" className="px-5 py-3 rounded-xl border border-slate-200 text-[#0A1B3D] text-xs font-black uppercase tracking-widest flex items-center gap-2"><Phone className="w-4 h-4" /> Call +254 743 603 068</a>
            </div>
          </div>
        </section>

        <section aria-labelledby="services-heading" className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-[10px] text-blue-600 font-mono font-bold uppercase tracking-widest">What we print</span>
            <h2 id="services-heading" className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight">Digital printing and branding</h2>
            <p className="text-slate-600 text-sm leading-relaxed">From everyday documents to finished campaign materials, our Westlands print shop handles a range of formats and finishing options.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {printingServices.map((service) => (
              <article key={service.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
                <p className="mt-4 text-xs font-bold text-blue-600 uppercase tracking-wider">Custom Quote on Request</p>
              </article>
            ))}
          </div>
          <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
            Customers can request business card printing, flyer and brochure printing, posters, roll-up banners, waterproof stickers and large-format prints. We also support corporate branding, stationery, packaging, canvas work, photocopying, and binding through the wider SmartPrints Hub service catalogue.
          </p>
        </section>

        <section aria-labelledby="location-heading" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="bg-[#0A1B3D] text-white rounded-3xl p-6 sm:p-8 space-y-4">
            <MapPin className="w-7 h-7 text-blue-400" />
            <h2 id="location-heading" className="text-2xl font-display font-black uppercase">Visit our Westlands print shop</h2>
            <p className="text-slate-300 text-sm leading-relaxed">Find SmartPrints Hub at {BUSINESS.address}. Call ahead for help with specifications, artwork, finishing, or turnaround times.</p>
            <p className="text-sm font-bold">Mon-Fri: 6:30 AM - 9:30 PM<br />Saturday: 7:00 AM - 9:30 PM<br />Sunday: 7:30 AM - 8:30 PM</p>
            <a href="/#contact" className="inline-flex items-center gap-2 text-blue-300 text-sm font-bold">Get directions and contact details <ArrowRight className="w-4 h-4" /></a>
          </div>
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-2xl font-display font-black uppercase">Why customers choose us</h2>
            <ul className="space-y-3 text-sm text-slate-600 leading-relaxed list-disc pl-5">
              <li>One local team for printing, finishing, and corporate branding.</li>
              <li>Support with print-ready files and suitable paper or material choices.</li>
              <li>Convenient access from Westlands with direct phone and WhatsApp contact.</li>
              <li>Same-day dispatch is available for eligible standard orders confirmed before the stated daily cut-off.</li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
          <h2 id="faq-heading" className="text-2xl font-display font-black uppercase mb-6">Printing questions</h2>
          <div className="space-y-5">
            {SMARTPRINTS_FAQS.map((faq) => (
              <div key={faq.q} className="border-b border-slate-100 pb-4 last:border-none last:pb-0">
                <h3 className="text-sm font-bold">{faq.q}</h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-400 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <span>{BUSINESS.name} - {BUSINESS.address}</span>
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/smartprinters_hub_westlands?dlrf=dDd5MnBjcXRrYTB0" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-pink-400 hover:text-pink-300 flex items-center gap-1.5 transition-colors font-semibold"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>@smartprinters_hub_westlands</span>
            </a>
            <a href="/" className="text-blue-400 hover:text-blue-300">Back to SmartPrints Hub home</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
