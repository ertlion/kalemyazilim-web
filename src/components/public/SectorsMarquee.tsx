"use client";

import { useLocale } from "next-intl";
import {
  ShoppingCart,
  Shirt,
  Pill,
  UtensilsCrossed,
  Cpu,
  Sofa,
  Fuel,
  Plane,
  Coffee,
  Building2,
  Warehouse,
  Wrench,
} from "lucide-react";

const SECTORS = [
  { icon: ShoppingCart, tr: "Market", en: "Grocery" },
  { icon: Shirt, tr: "Tekstil", en: "Textile" },
  { icon: Pill, tr: "Eczane", en: "Pharmacy" },
  { icon: UtensilsCrossed, tr: "Restoran", en: "Restaurant" },
  { icon: Cpu, tr: "Elektronik", en: "Electronics" },
  { icon: Sofa, tr: "Mobilya", en: "Furniture" },
  { icon: Fuel, tr: "Akaryakıt", en: "Fuel Station" },
  { icon: Plane, tr: "Duty Free", en: "Duty Free" },
  { icon: Coffee, tr: "Kafe", en: "Cafe" },
  { icon: Building2, tr: "AVM", en: "Shopping Mall" },
  { icon: Warehouse, tr: "Lojistik", en: "Logistics" },
  { icon: Wrench, tr: "Teknik Servis", en: "Technical Service" },
];

export default function SectorsMarquee() {
  const locale = useLocale();
  const items = [...SECTORS, ...SECTORS];

  return (
    <div
      className="relative w-full overflow-hidden border-y border-primary/30 py-4 backdrop-blur-sm"
      style={{
        background:
          "linear-gradient(90deg, rgba(14,165,233,0.35), rgba(99,102,241,0.35), rgba(14,165,233,0.35))",
      }}
    >
      {/* Edge fade gradients — mavi tonu sonlarına yumuşak geçiş */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{
          background:
            "linear-gradient(90deg, rgba(14,165,233,0.6), rgba(14,165,233,0))",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{
          background:
            "linear-gradient(270deg, rgba(14,165,233,0.6), rgba(14,165,233,0))",
        }}
      />

      <div
        className="flex w-max items-center gap-4"
        style={{ animation: "marqueeScroll 40s linear infinite" }}
      >
        {items.map((sector, i) => {
          const Icon = sector.icon;
          const label = locale === "tr" ? sector.tr : sector.en;
          return (
            <div
              key={`${sector.tr}-${i}`}
              className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/40 bg-white/20 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:border-white hover:bg-white hover:text-primary-dark"
            >
              <Icon className="h-4 w-4 text-white" />
              <span>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
