"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { createClient } from "../../supabase/client";

const destinations = [
  { name: "Rwanda", href: "/destinations/rwanda" },
  { name: "Uganda", href: "/destinations/uganda" },
  { name: "Kenya", href: "/destinations/kenya" },
  { name: "Tanzania", href: "/destinations/tanzania" },
  { name: "Burundi", href: "/destinations/burundi" },
];

const experiences = [
  { name: "Gorilla Trekking", href: "/tours" },
  { name: "Big Five Safaris", href: "/tours" },
  { name: "Primate Tracking", href: "/tours" },
  { name: "Cultural Immersion", href: "/tours" },
  { name: "Beach Extensions", href: "/tours" },
];

export default function SafariNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("site_settings").select("*").single();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[hsl(152,45%,20%)] text-white/90 text-xs sm:text-sm py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${settings?.phone || '+250123456789'}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {settings?.phone || '+250 123 456 789'}
            </a>
            <a
              href={`mailto:${settings?.email || 'info@messiahsafari.com'}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              {settings?.email || 'info@messiahsafari.com'}
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {settings?.address || 'Kigali, Rwanda | Kampala, Uganda | Nairobi, Kenya'}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[hsl(40,15%,88%)] shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              {settings?.logo_url ? (
                <img src={settings.logo_url} alt="Logo" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[hsl(152,45%,25%)] flex items-center justify-center">
                  <span className="text-[hsl(45,80%,55%)] font-bold text-lg md:text-xl">
                    {settings?.logo_letter || 'M'}
                  </span>
                </div>
              )}
              <div className="hidden sm:block">
                <div className="text-[hsl(152,45%,25%)] font-bold text-lg leading-tight tracking-tight">
                  {settings?.company_name || 'Messiah Safari'}
                </div>
                <div className="text-[hsl(45,80%,50%)] text-[10px] uppercase tracking-[0.2em] font-medium">
                  {settings?.company_tagline || '& Tours'}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-[hsl(150,20%,10%)] hover:text-[hsl(152,45%,25%)] transition-colors"
              >
                Home
              </Link>

              {/* Destinations Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setDestOpen(true)}
                onMouseLeave={() => setDestOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[hsl(150,20%,10%)] hover:text-[hsl(152,45%,25%)] transition-colors">
                  Destinations
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className={`absolute top-full left-0 bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[180px] transition-opacity ${destOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  {destinations.map((d) => (
                    <Link
                      key={d.name}
                      href={d.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[hsl(40,20%,96%)] hover:text-[hsl(152,45%,25%)] transition-colors"
                    >
                      {d.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Experiences Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setExpOpen(true)}
                onMouseLeave={() => setExpOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[hsl(150,20%,10%)] hover:text-[hsl(152,45%,25%)] transition-colors">
                  Experiences
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className={`absolute top-full left-0 bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[200px] transition-opacity ${expOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  {experiences.map((e) => (
                    <Link
                      key={e.name}
                      href={e.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[hsl(40,20%,96%)] hover:text-[hsl(152,45%,25%)] transition-colors"
                    >
                      {e.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/tours"
                className="px-4 py-2 text-sm font-medium text-[hsl(150,20%,10%)] hover:text-[hsl(152,45%,25%)] transition-colors"
              >
                Tours
              </Link>

              <Link
                href="/about"
                className="px-4 py-2 text-sm font-medium text-[hsl(150,20%,10%)] hover:text-[hsl(152,45%,25%)] transition-colors"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-medium text-[hsl(150,20%,10%)] hover:text-[hsl(152,45%,25%)] transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center px-5 py-2.5 bg-[hsl(45,80%,55%)] text-[hsl(150,20%,10%)] rounded-lg hover:bg-[hsl(45,80%,48%)] transition-colors text-sm font-semibold shadow-sm"
              >
                Plan Your Safari
              </Link>
              <button
                className="lg:hidden p-2 text-[hsl(150,20%,10%)]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-1">
              <Link
                href="/"
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[hsl(40,20%,96%)] rounded-lg"
              >
                Home
              </Link>
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Destinations
              </div>
              {destinations.map((d) => (
                <Link
                  key={d.name}
                  href={d.href}
                  className="block px-6 py-2.5 text-sm text-gray-600 hover:bg-[hsl(40,20%,96%)] rounded-lg"
                >
                  {d.name}
                </Link>
              ))}
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Experiences
              </div>
              {experiences.map((e) => (
                <Link
                  key={e.name}
                  href={e.href}
                  className="block px-6 py-2.5 text-sm text-gray-600 hover:bg-[hsl(40,20%,96%)] rounded-lg"
                >
                  {e.name}
                </Link>
              ))}
              <Link
                href="/tours"
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[hsl(40,20%,96%)] rounded-lg"
              >
                Tours
              </Link>
              <Link
                href="/about"
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[hsl(40,20%,96%)] rounded-lg"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[hsl(40,20%,96%)] rounded-lg"
              >
                Contact
              </Link>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="block w-full text-center px-5 py-3 bg-[hsl(45,80%,55%)] text-[hsl(150,20%,10%)] rounded-lg hover:bg-[hsl(45,80%,48%)] transition-colors text-sm font-semibold"
                >
                  Plan Your Safari
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
