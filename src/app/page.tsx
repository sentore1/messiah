import SafariNavbar from "@/components/safari-navbar";
import SafariHero from "@/components/safari-hero";
import CountryNavigator from "@/components/country-navigator";
import FeaturedTours from "@/components/featured-tours";
import ExperienceCategories from "@/components/experience-categories";
import TrustIndicators from "@/components/trust-indicators";
import InquiryForm from "@/components/inquiry-form";
import SafariFooter from "@/components/safari-footer";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const [
    { data: heroContent },
    { data: heroStats },
    { data: heroImages },
    { data: tours },
    { data: testimonials },
    { data: trustStats },
    { data: partners },
  ] = await Promise.all([
    supabase.from("hero_content").select("*").eq("active", true).single(),
    supabase.from("hero_stats").select("*").eq("active", true).order("display_order"),
    supabase.from("hero_images").select("*").eq("active", true).order("display_order"),
    supabase.from("tours").select("*").eq("active", true).order("created_at", { ascending: false }),
    supabase.from("testimonials").select("*").eq("active", true).order("display_order"),
    supabase.from("trust_stats").select("*").eq("active", true).order("display_order"),
    supabase.from("partners").select("*").eq("active", true).order("display_order"),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <SafariNavbar />
      <SafariHero content={heroContent} stats={heroStats || []} images={heroImages || []} />
      <CountryNavigator />
      <FeaturedTours tours={tours || []} />
      <ExperienceCategories />
      <TrustIndicators 
        testimonials={testimonials || []} 
        stats={trustStats || []} 
        partners={partners || []} 
      />
      <InquiryForm />
      <SafariFooter />
    </div>
  );
}
