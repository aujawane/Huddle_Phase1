import type { Metadata } from "next";
import { ClubFinder } from "@/components/club-finder";

export const metadata: Metadata = {
  title: "Find your club | Huddle",
  description: "Choose your university, interests, and availability to start discovering your campus community with Huddle.",
};

export default function FindClubsPage() {
  return (
    <main className="finder-page">
      <h1 className="sr-only">Find your club</h1>
      <ClubFinder />
    </main>
  );
}
