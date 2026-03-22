"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type StatsData = {
  customers: number;
  experience: number;
  products: number;
  support: number;
};

function AnimatedNumber({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <span
      ref={ref}
      className="text-4xl font-extrabold tracking-tight text-white lg:text-5xl xl:text-6xl"
    >
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsCounter({ stats }: { stats: StatsData }) {
  const t = useTranslations("stats");

  const items = [
    { key: "customers" as const, value: stats.customers, suffix: "+" },
    { key: "experience" as const, value: stats.experience, suffix: "+" },
    { key: "products" as const, value: stats.products, suffix: "+" },
    { key: "support" as const, value: stats.support, suffix: "+" },
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Dark background with gradient mesh */}
      <div className="absolute inset-0 bg-dark" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, var(--color-primary) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, var(--color-accent) 0%, transparent 50%), radial-gradient(ellipse at 50% 0%, var(--color-primary-dark) 0%, transparent 40%)",
        }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {items.map((item, index) => (
            <div key={item.key} className="relative text-center">
              {/* Glass card */}
              <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-8 sm:px-6 sm:py-10">
                {/* Decorative top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <AnimatedNumber
                  target={item.value}
                  suffix={item.suffix}
                />
                <p className="mt-3 text-sm font-medium text-white/60 sm:text-base lg:text-lg">
                  {t(item.key)}
                </p>
              </div>

              {/* Vertical divider between items (desktop) */}
              {index < items.length - 1 && (
                <div className="absolute top-1/2 -right-4 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
