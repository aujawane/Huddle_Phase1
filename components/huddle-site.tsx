"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";

const featuredClubs = [
  { icon: "♫", name: "Campus Dance Collective", meta: "Arts · Recreation", meeting: "Tuesday at 6:00 PM" },
  { icon: "♻", name: "Students for Sustainability", meta: "Community · Environment", meeting: "Wednesday at 4:00 PM" },
  { icon: "☀", name: "Campus Outdoors", meta: "Adventure · Wellness", meeting: "Saturday at 9:00 AM" },
];

const problems = [
  ["Scattered information", "Students jump between multiple platforms just to find basic club details."],
  ["Outdated details", "Meeting times, locations, and contacts are often inconsistent or incomplete."],
  ["Missed connections", "Great communities remain invisible to the students who would value them most."],
];

const steps = [
  ["Select your campus", "Start with your university and see communities that are actually relevant to you."],
  ["Explore communities", "Browse academic, cultural, creative, social, recreational, and service organizations."],
  ["Choose your interests", "Filter by the activities, causes, hobbies, and communities that matter to you."],
  ["Join the huddle", "See when and where a group meets, then take the next step toward joining."],
];

const categories = [
  ["◎", "Academic & Career", "Major based organizations, professional societies, research, and career development."],
  ["♫", "Arts & Culture", "Music, dance, film, theater, design, cultural organizations, and creative expression."],
  ["♡", "Service & Causes", "Volunteering, sustainability, advocacy, fundraising, and community outreach."],
  ["⚑", "Sports & Wellness", "Recreational teams, fitness, outdoor adventures, mindfulness, and healthy living."],
  ["✦", "Identity & Belonging", "Identity based groups, international communities, faith, and student support."],
  ["☀", "Hobbies & Social", "Gaming, food, books, travel, crafts, special interests, and casual social groups."],
];

export function HuddleSite() {
  const router = useRouter();

  // Preserve previously shared finder links now that discovery has its own page.
  useEffect(() => {
    const redirectLegacyFinder = () => {
      if (window.location.hash === "#finder") router.replace("/find-clubs");
    };
    redirectLegacyFinder();
    window.addEventListener("hashchange", redirectLegacyFinder);
    return () => window.removeEventListener("hashchange", redirectLegacyFinder);
  }, [router]);

  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero" id="home">
          <div className="shape shape-one" />
          <div className="shape shape-two" />
          <div className="hero-grid">
            <div>
              <h1>Find your <em>people.</em></h1>
              <p className="hero-copy">
                Huddle brings every campus community into one simple place. Discover new interests,
                meet people who share them, and find the organizations that make campus feel like home.
              </p>
              <div className="hero-actions">
                <Link className="primary-button" href="/find-clubs">Find your club →</Link>
                <a className="secondary-button" href="#about">See how it works</a>
              </div>
              <div className="hero-note">
                <div className="student-stack"><span>A</span><span>M</span><span>G</span></div>
                Every student. Hundreds of ways to belong.
              </div>
            </div>

            <div className="app-shell">
              <div className="app-window">
                <div className="window-top"><div className="mini-logo">huddle.</div><div className="avatar">AU</div></div>
                <div className="search-preview">⌕ &nbsp; Search clubs and communities...</div>
                <div className="filter-row">
                  {['All clubs', 'Culture', 'Creative', 'Wellness'].map((filter, index) => (
                    <span className={`filter ${index === 0 ? 'active' : ''}`} key={filter}>{filter}</span>
                  ))}
                </div>
                {featuredClubs.map((club) => (
                  <article className="club-card" key={club.name}>
                    <div className="club-art">{club.icon}</div>
                    <div><div className="club-name">{club.name}</div><div className="club-meta">{club.meta}<br />{club.meeting}</div></div>
                    <div className="arrow">→</div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="section-inner problem-grid">
            <h2>Campus life should not be this hard to discover.</h2>
            <div>
              <p className="problem-copy">
                Club information is scattered across social media, flyers, old websites, and word of mouth.
                Huddle creates one reliable home for every student to find activities, friendships, and communities.
              </p>
              <div className="problem-list">
                {problems.map(([title, description], index) => (
                  <article className="problem-item" key={title}>
                    <div className="problem-number">0{index + 1}</div>
                    <div><strong>{title}</strong><p>{description}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section steps-section" id="how">
          <div className="section-inner">
            <h2>From searching to belonging in four simple steps.</h2>
            <div className="steps-grid">
              {steps.map(([title, description], index) => (
                <article className="step" key={title}>
                  <div className="step-number">{index + 1}</div>
                  <h3>{title}</h3><p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="explore">
          <div className="section-inner">
            <div className="categories-header">
              <h2>There is a community for everyone.</h2>
              <p>Whether you want to create, compete, volunteer, celebrate your culture, grow professionally, or try something new, Huddle helps you find where you belong.</p>
            </div>
            <div className="category-grid">
              {categories.map(([icon, title, description]) => (
                <article className="category" key={title}>
                  <div className="category-icon">{icon}</div><h3>{title}</h3><p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="cta-inner">
            <h2>Your next community is closer than you think.</h2>
            <p>Tell us what you enjoy and when you are free. Huddle will help you discover organizations that fit your campus life.</p>
            <Link className="primary-button" href="/find-clubs">Find my club →</Link>
          </div>
        </section>
      </main>

      <footer>
        <a className="logo" href="#home">huddle<span>.</span></a>
        <span>Find your people. Find your place.</span>
        <span>Huddle · Built for every campus</span>
      </footer>


    </>
  );
}
