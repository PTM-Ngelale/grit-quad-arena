import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import BookingPageContent from "@/components/BookingPageContent";

export const metadata: Metadata = {
  title: "Book a Ride — GRIT Quad Biking Arena",
  description:
    "Reserve your slot at GRIT Quad Biking Arena, Port Harcourt. Solo rides from ₦6,000. Group deals available. Open Fridays & Saturdays, 10am–6pm.",
};

export default function BookingPage() {
  return (
    <main className="bg-grit-black min-h-screen">
      <ScrollRevealProvider />
      <Navbar />

      {/* Page header */}
      <section className="pt-40 pb-16 bg-grit-black border-b border-grit-grey">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-body text-grit-sand text-xs tracking-widest uppercase mb-4">
            Reserve Your Slot
          </p>
          <h1 className="font-display text-grit-white text-6xl md:text-8xl leading-none">
            Book a <span className="text-grit-orange">Ride</span>
          </h1>
        </div>
      </section>

      <Suspense>
        <BookingPageContent />
      </Suspense>

      <Footer />
    </main>
  );
}
