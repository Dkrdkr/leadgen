import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { TrustBar } from "@/components/TrustBar";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "@/components/Testimonials";
import { CityLinks } from "@/components/CityLinks";
import {
  HeroSection,
  ProblemSection,
  TransparencySection,
  WhyDifferentSection,
  HowItWorksSection,
  WhatYouGetSection,
} from "@/components/Sections";
import { LeadFunnel } from "@/components/LeadFunnel";
import { defaultSEO, getSchemaOrgData, getFAQSchema } from "@/lib/seo";
import { getCopy } from "@/lib/copy";
import { getVariant, trackPageView, trackABVariantView } from "@/lib/tracking";

export function Landing() {
  const variant = getVariant();
  const copy = getCopy(variant);

  useEffect(() => {
    trackPageView();
    trackABVariantView(variant);
  }, [variant]);

  return (
    <>
      <Helmet>
        <title>{defaultSEO.title}</title>
        <meta name="description" content={defaultSEO.description} />
        <link rel="canonical" href={defaultSEO.canonical} />
        <meta property="og:title" content={defaultSEO.ogTitle} />
        <meta property="og:description" content={defaultSEO.ogDescription} />
        <meta property="og:type" content={defaultSEO.ogType} />
        <meta property="og:locale" content={defaultSEO.ogLocale} />
        <script type="application/ld+json">
          {JSON.stringify(getSchemaOrgData())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(getFAQSchema(copy.faq.items))}
        </script>
      </Helmet>

      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        <ProblemSection />
        <TransparencySection />
        <WhyDifferentSection />
        <Testimonials />
        <HowItWorksSection />
        <WhatYouGetSection />
        <CityLinks />
        <LeadFunnel />
        <FAQ />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
