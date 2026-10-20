"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { interestGroups } from "@/lib/mock-data";
import type { University } from "@/lib/types";

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

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Weekend"];
const times = ["Any time", "Morning", "Afternoon", "Evening"];

export function HuddleSite() {
  const [finderOpen, setFinderOpen] = useState(false);
  const [universityQuery, setUniversityQuery] = useState("");
  const [university, setUniversity] = useState<University | null>(null);
  const [universityResults, setUniversityResults] = useState<University[]>([]);
  const [universityLoading, setUniversityLoading] = useState(false);
  const [interestQuery, setInterestQuery] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("Any time");
  const [keyword, setKeyword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("modal-open", finderOpen);
    return () => document.body.classList.remove("modal-open");
  }, [finderOpen]);

  useEffect(() => {
    if (university || universityQuery.trim().length < 2) {
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setUniversityLoading(true);
      try {
        const response = await fetch(`/api/universities?q=${encodeURIComponent(universityQuery)}`, {
          signal: controller.signal,
        });
        setUniversityResults(response.ok ? await response.json() : []);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) setUniversityResults([]);
      } finally {
        setUniversityLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [universityQuery, university]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFinderOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const visibleInterestGroups = useMemo(() => {
    const query = interestQuery.trim().toLowerCase();
    return interestGroups
      .map((group) => ({
        ...group,
        interests: group.interests.filter((interest) => interest.toLowerCase().includes(query)),
      }))
      .filter((group) => group.interests.length > 0);
  }, [interestQuery]);

  function toggleValue(value: string, values: string[], setValues: (next: string[]) => void) {
    setValues(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  function selectUniversity(result: University) {
    setUniversity(result);
    setUniversityQuery(result.name);
    setUniversityResults([]);
  }

  function submitFinder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!university) return;
    setSubmitted(true);
  }

  return (
    <>
      <nav className="site-nav">
        <a className="logo" href="#home">huddle<span>.</span></a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#how">How it works</a>
          <a href="#explore">Explore</a>
          <button className="nav-button" onClick={() => setFinderOpen(true)}>Find your club →</button>
        </div>
        <button className="mobile-menu" aria-label="Find your club" onClick={() => setFinderOpen(true)}>⌕</button>
      </nav>

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
                <button className="primary-button" onClick={() => setFinderOpen(true)}>Find your club →</button>
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
            <button className="primary-button" onClick={() => setFinderOpen(true)}>Find my club →</button>
          </div>
        </section>
      </main>

      <footer>
        <a className="logo" href="#home">huddle<span>.</span></a>
        <span>Find your people. Find your place.</span>
        <span>Huddle · Built for every campus</span>
      </footer>

      {finderOpen && (
        <div className="modal open" role="dialog" aria-modal="true" aria-labelledby="finder-title" onMouseDown={(event) => event.target === event.currentTarget && setFinderOpen(false)}>
          <div className="form-panel">
            <button className="close-button" aria-label="Close form" onClick={() => setFinderOpen(false)}>×</button>
            <div className="form-scroll">
              <h2 id="finder-title">Let&apos;s find your club.</h2>
              <p className="form-intro">Tell us where you study and what you enjoy. Your major does not matter, and only your university is required.</p>

              <form className="club-form" onSubmit={submitFinder}>
                <div className="field">
                  <div className="field-header"><label htmlFor="university">Which university do you attend?</label><span className="optional">Required</span></div>
                  <p className="helper-text">Start typing and select a university from the results.</p>
                  <div className="autocomplete">
                    <input
                      className="text-input"
                      id="university"
                      value={universityQuery}
                      onChange={(event) => {
                        setUniversityQuery(event.target.value);
                        setUniversity(null);
                        setUniversityResults([]);
                        setSubmitted(false);
                      }}
                      placeholder="Start typing a university name..."
                      autoComplete="off"
                    />
                    {university && <span className="university-status">✓</span>}
                    {!university && universityQuery.trim().length >= 2 && (
                      <div className="suggestions visible">
                        {universityLoading ? <div className="no-results">Searching universities...</div> :
                          universityResults.length ? universityResults.map((result) => (
                            <button className="suggestion" type="button" key={result.university_id} onClick={() => selectUniversity(result)}>
                              <span><strong>{result.name}</strong><small>{result.domain}</small></span><span>→</span>
                            </button>
                          )) : <div className="no-results">No matching university was found. Your university may not be available yet.</div>}
                      </div>
                    )}
                  </div>
                </div>

                <div className="field">
                  <div className="field-header"><span className="field-title">What are you interested in?</span><span className="optional">Optional · Choose multiple</span></div>
                  <p className="helper-text">Choose activities, communities, causes, hobbies, or academic interests.</p>
                  <div className="interest-search"><input className="text-input" value={interestQuery} onChange={(event) => setInterestQuery(event.target.value)} placeholder="Search interests..." /></div>
                  <div className="interest-groups">
                    {visibleInterestGroups.map((group) => (
                      <div className="interest-group" key={group.name}>
                        <div className="group-name">{group.name}</div>
                        <div className="chip-row">
                          {group.interests.map((interest) => (
                            <button
                              type="button"
                              className={`choice-chip ${selectedInterests.includes(interest) ? 'selected' : ''}`}
                              onClick={() => toggleValue(interest, selectedInterests, setSelectedInterests)}
                              key={interest}
                            >{interest}</button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedInterests.length > 0 && <div className="selected-summary visible">{selectedInterests.map((interest) => <span className="selected-tag" key={interest}>{interest}</span>)}</div>}
                </div>

                <div className="field">
                  <div className="field-header"><span className="field-title">When are you usually available?</span><span className="optional">Optional</span></div>
                  <div className="availability-grid">
                    <div className="availability-block"><span className="availability-label">Preferred days</span><div className="day-row">
                      {days.map((day) => <button type="button" className={`day-choice ${selectedDays.includes(day) ? 'selected' : ''}`} onClick={() => toggleValue(day, selectedDays, setSelectedDays)} key={day}>{day}</button>)}
                    </div></div>
                    <div className="availability-block"><span className="availability-label">Preferred time</span><div className="time-row">
                      {times.map((time) => <button type="button" className={`time-choice ${selectedTime === time ? 'selected' : ''}`} onClick={() => setSelectedTime(time)} key={time}>{time}</button>)}
                    </div></div>
                  </div>
                </div>

                <div className="field">
                  <div className="field-header"><label htmlFor="keyword">Anything specific?</label><span className="optional">Optional</span></div>
                  <input className="text-input" id="keyword" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Search by club name, activity, cause, or keyword..." />
                </div>

                {submitted && <div className="form-message visible">Your preferences are ready. Matching club results will appear here once the results query is connected.</div>}
                <button className="form-submit" type="submit" disabled={!university}>Show matching clubs →</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
