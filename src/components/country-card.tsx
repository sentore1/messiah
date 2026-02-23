"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default function CountryCard({ country, index }: { country: any; index: number }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 ${
        isActive ? "lg:col-span-2 md:col-span-2" : "lg:col-span-1"
      }`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => setIsActive(!isActive)}
    >
      <div
        className={`relative ${
          isActive ? "h-[400px] md:h-[450px]" : "h-[280px] md:h-[450px]"
        } transition-all duration-500`}
      >
        <img
          src={country.image}
          alt={country.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${country.color} opacity-60 group-hover:opacity-50 transition-opacity`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 text-white/80 mb-2">
            {country.icon}
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-xs uppercase tracking-wider">East Africa</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
            {country.name}
          </h3>
          <p className="text-white/70 text-sm mb-4">{country.tagline}</p>

          <div
            className={`transition-all duration-500 overflow-hidden ${
              isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {country.attractions.map((attr: string) => (
                <span
                  key={attr}
                  className="px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-white text-xs"
                >
                  {attr}
                </span>
              ))}
            </div>
            <Link
              href={`/destinations/${country.name.toLowerCase()}`}
              className="inline-flex items-center gap-2 text-[hsl(45,80%,55%)] text-sm font-semibold hover:gap-3 transition-all"
            >
              Explore {country.name}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
