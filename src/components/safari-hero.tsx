"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroContent {
  badge_text: string;
  headline: string;
  headline_highlight: string;
  description: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  background_image: string;
}

interface HeroStat {
  value: string;
  label: string;
}

interface HeroImage {
  image_url: string;
}

export default function SafariHero({ content, stats, images }: { content: HeroContent | null; stats: HeroStat[]; images: HeroImage[] }) {
  const [showVideo, setShowVideo] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const defaultContent: HeroContent = {
    badge_text: "East Africa's Premier Safari Operator",
    headline: "Discover the",
    headline_highlight: "Heart of Africa",
    description: "Embark on unforgettable journeys across Rwanda, Uganda, Kenya, Tanzania & Burundi.",
    cta_primary_text: "Explore Our Tours",
    cta_primary_link: "/tours",
    cta_secondary_text: "Watch Our Story",
    background_image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
  };

  const hero = content || defaultContent;
  const heroImages = images.length > 0 ? images : [{ image_url: hero.background_image }];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {heroImages.map((img, idx) => (
          <img
            key={idx}
            src={img.image_url}
            alt="African savannah"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[hsl(45,80%,55%)] animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              {hero.badge_text}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            {hero.headline}
            <span className="block text-[hsl(45,80%,55%)]">
              {hero.headline_highlight}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
            {hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href={hero.cta_primary_link}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[hsl(45,80%,55%)] text-[hsl(150,20%,10%)] rounded-lg hover:bg-[hsl(45,80%,48%)] transition-all text-base font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {hero.cta_primary_text}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setShowVideo(!showVideo)}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/20 transition-all text-base font-medium"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-4 h-4 fill-white text-white ml-0.5" />
              </div>
              {hero.cta_secondary_text}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-[hsl(45,80%,55%)]">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
        {heroImages.length > 1 && (
          <div className="flex gap-2">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImage ? "bg-white w-8" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
        <div className="flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs uppercase tracking-widest">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
