import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { phaseOneResourceUrls } from "@/lib/phase-one-resources";

export const metadata: Metadata = {
  title: "About Huddle",
  description: "Meet the Huddle team and explore our mission, Phase 1 prototype, and campus club discovery database design.",
};

const team = [
  {
    name: "Gershom",
    role: "University and Club Database Lead",
    responsibilities: "UNIVERSITY and CLUB tables, university relationships, and core club information.",
    post: "I focus on the university and club data that gives Huddle its foundation. By connecting each club to its university and keeping core information in a consistent structure, I want students to spend less time figuring out whether a club belongs to their campus. Huddle is useful because it brings those essential details together before students explore their interests. As we move toward database matching, a clear relationship between universities and clubs will help keep discovery relevant.",
  },
  {
    name: "Aditya",
    role: "Categories and Discovery Lead",
    responsibilities: "CATEGORY_TYPE, CATEGORY, and CLUB_CATEGORY tables, interest filtering, website development, and club discovery experience.",
    post: "I work on categories, interest filtering, and the website experience that brings our database concept to students. A club can represent more than one interest, so the category relationships should reflect how students actually explore campus life. I want Huddle to make it easy to combine interests rather than force someone into one category. Building the finder around university, interests, and availability gives us a practical starting point for a more personal discovery experience in the next phase.",
  },
  {
    name: "Melanie",
    role: "Meetings and Locations Lead",
    responsibilities: "MEETING and LOCATION tables, club schedules, availability matching, and campus location information.",
    post: "I focus on meeting schedules and locations because finding an interesting club is only useful if a student can attend. Organizing when and where clubs meet gives our future matching query a way to consider real availability alongside interests. I believe Huddle can stand out by treating schedules as part of discovery from the beginning. Clear meeting and campus location information should help students decide whether a community fits into their week and plan their next step with more confidence.",
  },
  {
    name: "Akshaya",
    role: "Club Management and Links Lead",
    responsibilities: "MANAGER, CLUB_MANAGER, and CLUB_LINK tables, manager relationships, external resources, and future authentication planning.",
    post: "I work on club manager relationships, external links, and planning for future manager accounts. Discovering a club should lead somewhere useful, whether that is an official website, a contact, or another resource maintained by the organization. Separating manager and link information into related tables gives us room to support clubs with multiple managers and resources. I see Huddle as a bridge between discovering a community and reaching it, with future authentication helping managers maintain the information students depend on.",
  },
];

const usageSteps = [
  ["Select your university", "Select your university using autocomplete."],
  ["Choose your interests", "Choose one or more interests."],
  ["Add your availability", "Enter your available days, preferred time, and an optional keyword."],
  ["Find your community", "Submit the form to begin finding relevant campus clubs."],
];

const resources = [
  { title: "Live Huddle Prototype", description: "Open the club finder and enter your campus, interests, and availability.", url: phaseOneResourceUrls.livePrototype },
  { title: "GitHub Source Code", description: "Review the website implementation and database migration.", url: phaseOneResourceUrls.githubSource },
  { title: "Phase 1 Presentation", description: "Walk through the team's concept, scope, and design.", url: phaseOneResourceUrls.presentation },
  { title: "Draft Database Product Document", description: "Explore the planned data model and product requirements.", url: phaseOneResourceUrls.databaseProductDocument },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="about-page" id="top">
        <section className="section about-hero" aria-labelledby="about-title">
          <div className="section-inner">
            <h1 id="about-title">Meet the team behind <em>Huddle</em></h1>
            <p className="hero-copy">Huddle is a hypothetical software company and campus discovery platform designed to help students find university clubs based on their university, interests, schedule, and preferences.</p>
            <div className="hero-actions">
              <Link className="primary-button" href="/find-clubs">Return to the club finder →</Link>
              <a className="secondary-button" href="#team">Meet the team</a>
            </div>
          </div>
        </section>

        <section className="section about-mission" aria-labelledby="mission-title">
          <div className="section-inner">
            <h2 id="mission-title">A community for every student.</h2>
            <blockquote>Our mission is to make campus involvement easier to discover, more inclusive, and more personal. Huddle brings scattered club information into one searchable platform so every student can find a community where they belong.</blockquote>
          </div>
        </section>

        <section className="section" aria-labelledby="problem-title">
          <div className="section-inner problem-grid">
            <div><h2 id="problem-title">Less searching. More belonging.</h2></div>
            <div className="about-prose">
              <p>Students search through university websites, social media pages, flyers, and group chats to find clubs. Details are difficult to compare across these sources, and meeting times, contacts, or descriptions may be outdated.</p>
              <p>Huddle is designed to bring that scattered information into one organized experience. Students can discover relevant clubs, compare their options, and find communities that fit their interests and campus life.</p>
            </div>
          </div>
        </section>

        <section className="section about-team" id="team" aria-labelledby="team-title">
          <div className="section-inner">
            <h2 id="team-title">Meet the Team</h2>
            <div className="about-card-grid">
              {team.map((member, index) => (
                <article className="about-card team-card" key={member.name}>
                  <span className="about-card-marker" aria-hidden="true">0{index + 1}</span>
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p>{member.responsibilities}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="product-title">
          <div className="section-inner problem-grid">
            <div><h2 id="product-title">Discovery that starts with you.</h2></div>
            <div className="about-prose">
              <p>Choose your university, select multiple interests, specify your available days and preferred time, and enter an optional keyword. The planned database query will return clubs that best match those preferences.</p>
              <div className="about-phase-note"><strong>Where we are: Phase 1 prototype</strong><p>The current interface captures the required information. Complete database matching and result ranking will be implemented in the next phase; submitting the finder currently confirms your preferences rather than returning matched clubs.</p></div>
            </div>
          </div>
        </section>

        <section className="section steps-section" aria-labelledby="usage-title">
          <div className="section-inner">
            <h2 id="usage-title">Your first steps toward belonging.</h2>
            <ol className="steps-grid about-steps">
              {usageSteps.map(([title, description], index) => (
                <li className="step" key={title}>
                  <span className="step-number" aria-label={`Step ${index + 1}`}>{index + 1}</span>
                  <h3>{title}</h3><p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" aria-labelledby="blog-title">
          <div className="section-inner">
            <h2 id="blog-title">From Our Team</h2>
            <p className="about-section-copy">Draft reflections for each team member to review and personalize before submission.</p>
            <div className="about-card-grid">
              {team.map((member) => (
                <article className="about-card team-post" key={member.name}>
                  <h3>{member.name}</h3>
                  <p>{member.post}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-technology" aria-labelledby="technology-title">
          <div className="section-inner">
            <h2 id="technology-title">Built on connected information.</h2>
            <ul className="about-stack" aria-label="Technology stack">
              <li>Next.js App Router</li><li>TypeScript</li><li>Supabase PostgreSQL</li><li>Supabase Auth · future manager accounts</li><li>Vercel · deployment</li>
            </ul>
            <div className="about-card-grid">
              <article className="about-card"><h3>A relational foundation</h3><p>Our database design uses primary keys to identify records and foreign keys to connect them. Normalized tables keep universities, clubs, categories, meetings, locations, managers, and links organized without duplicating shared information.</p></article>
              <article className="about-card"><h3>CLUB brings it together</h3><p>The CLUB table connects the main database feature areas. One to many relationships connect a university to its clubs and a club to its meetings and links. Many to many relationships use junction tables: CLUB_CATEGORY connects clubs and categories, while CLUB_MANAGER connects clubs and managers.</p></article>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="resources-title">
          <div className="section-inner">
            <h2 id="resources-title">Phase 1 Resources</h2>
            <div className="about-card-grid">
              {resources.map((resource) => (
                <article className="about-card resource-card" key={resource.title}>
                  <h3>{resource.title}</h3><p>{resource.description}</p>
                  {resource.url?.startsWith("/") ? (
                    <Link className="secondary-button" href={resource.url}>Open club finder <span aria-hidden="true">→</span></Link>
                  ) : resource.url ? (
                    <a className="secondary-button" href={resource.url} target="_blank" rel="noopener noreferrer">Open resource <span className="sr-only">: {resource.title} (opens in a new tab)</span><span aria-hidden="true"> ↗</span></a>
                  ) : (
                    <button className="secondary-button" disabled aria-label={`${resource.title}: Link coming soon`}>Link coming soon</button>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-disclosure" aria-labelledby="disclosure-title">
          <div className="section-inner about-prose">
            <h2 id="disclosure-title">Designed and reviewed by our team.</h2>
            <p>The team designed the database structure, relationships, product concept, user flow, and project implementation. AI tools were used for brainstorming, starter code, writing assistance, and debugging. The team reviewed, tested, modified, and extended all AI assisted work and is prepared to explain the final implementation.</p>
            <Link className="primary-button" href="/find-clubs">Find your club →</Link>
          </div>
        </section>
      </main>
      <footer>
        <Link className="logo" href="/">huddle<span>.</span></Link>
        <span>Find your people. Find your place.</span>
        <span>Huddle · Phase 1 prototype</span>
      </footer>
    </>
  );
}
