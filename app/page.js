export const dynamic = 'force-dynamic'; // <--- Ye line lazmi add karein
import SectionRenderer from "@/components/SectionRenderer";

async function getAgencyData() {
  // Master Query: Tamam sections aur unki images/nested data ko fetch karne ke liye
  const query = new URLSearchParams({
    "populate[sections][on][sections.hero-section][populate]": "*",
    "populate[sections][on][sections.client-logos][populate][logos][populate]": "*",
    "populate[sections][on][sections.about-agency][populate]": "*",
    "populate[sections][on][sections.core-services][populate][service_items][populate]": "*",
    "populate[sections][on][sections.stats-counter][populate][stats][populate]": "*",
    "populate[sections][on][sections.video-intro][populate]": "*",
    "populate[sections][on][sections.portfolio-showcase][populate][projects][populate]": "*",
    "populate[sections][on][sections.work-process][populate][steps][populate]": "image",
    "populate[sections][on][sections.why-choose-us][populate][benefits][populate]": "*",
    "populate[sections][on][sections.team-members][populate][members][populate]": "*",
    "populate[sections][on][sections.testimonials][populate][reviews][populate]": "*",
    "populate[sections][on][sections.pricing-plans][populate][plans][populate]": "features",
    "populate[sections][on][sections.pricing-plans][populate][faq]": "*",
    "populate[sections][on][sections.pricing-plans][populate][payment][populate]": "*",
    "populate[sections][on][sections.faq][populate][faqs][populate]": "*",
    "populate[sections][on][sections.cta-banner-call-to-action][populate]": "*",
    "populate[sections][on][sections.newsletter-and-contact-info][populate][social_links][populate]": "*",
  });

  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const res = await fetch(`${baseUrl}/api/agency-page?${query.toString()}`, { 
  cache: 'no-store' 
});

    if (!res.ok) throw new Error("Failed to fetch data");
    
    const json = await res.json();
    console.log("Vercel received this data:", JSON.stringify(json.data?.sections)); // Ye log check karein
    // Strapi 5 format handle karne ke liye
   return json.data?.sections || [];
  } catch (error) {
    console.error("Strapi Fetch Error:", error);
    return [];
  }
}

export default async function Home() {
  const sections = await getAgencyData();

  if (!sections || sections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Website is under maintenance</h1>
          <p className="text-gray-400">Please check your Strapi connection or data entries.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="overflow-hidden">
      {sections.map((section, index) => (
        <SectionRenderer key={`${section.__component}-${index}`} section={section} />
      ))}
    </main>
  );
}
