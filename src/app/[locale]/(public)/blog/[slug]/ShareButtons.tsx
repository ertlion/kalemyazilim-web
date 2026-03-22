"use client";

import { Twitter, Facebook, Linkedin } from "lucide-react";

export default function ShareButtons({ title }: { title: string }) {
  const url = typeof window !== "undefined" ? window.location.href : "";

  const shareLinks = [
    {
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      label: "Twitter",
    },
    {
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      label: "Facebook",
    },
    {
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      label: "LinkedIn",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {shareLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-muted-foreground hover:bg-primary hover:text-white transition-colors"
            aria-label={link.label}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
