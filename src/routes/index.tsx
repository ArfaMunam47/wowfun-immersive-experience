import { createFileRoute } from "@tanstack/react-router";
import { WowSite } from "@/components/wow/WowSite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WOW FUN — Chill & Fun Sparkling Drinks" },
      { name: "description", content: "WOW FUN makes playful sparkling botanical drinks with real fruit and zero sugar." },
      { property: "og:title", content: "WOW FUN — Chill & Fun Sparkling Drinks" },
      { property: "og:description", content: "Playful sparkling botanical drinks with real fruit and zero sugar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WowSite,
});
