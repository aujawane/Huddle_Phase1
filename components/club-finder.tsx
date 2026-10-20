"use client";

import { useMemo, useRef, useState } from "react";
import { interestGroups, interestSearchAliases, mockUniversities } from "@/lib/mock-data";
import type { University } from "@/lib/types";

const campusAliases: Record<number, string> = { 1: "sdsu", 2: "ucsd", 3: "usd", 4: "csusm", 5: "ucla", 6: "usc", 7: "ucb berkeley", 8: "stanford", 9: "csulb", 10: "uci" };

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
type WeekDay = typeof weekDays[number];
type AvailabilitySlot = { id: number; days: WeekDay[]; start: string; end: string };

function getSlotError(slot: AvailabilitySlot): string | null {
  if (Boolean(slot.start) !== Boolean(slot.end)) return "Enter both a start and end time.";
  if (slot.start && slot.end <= slot.start) return "End time must be later than start time.";
  return null;
}

function formatTime(value: string): string {
  const [hour, minute] = value.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
}

const emptySlot = (id: number): AvailabilitySlot => ({ id, days: [], start: "", end: "" });

export function ClubFinder() {
  const [universityQuery, setUniversityQuery] = useState("");
  const [university, setUniversity] = useState<University | null>(null);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [highlightedUniversity, setHighlightedUniversity] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [interestQuery, setInterestQuery] = useState("");
  const [interestCategory, setInterestCategory] = useState(interestGroups[0].name);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([emptySlot(1)]);
  const nextSlotId = useRef(2);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const universityResults = mockUniversities.filter((campus) =>
    `${campus.name} ${campus.domain} ${campusAliases[campus.university_id] ?? ""}`.toLowerCase().includes(universityQuery.trim().toLowerCase()),
  );
  const showSuggestions = suggestionsOpen && !university && universityQuery.trim().length >= 2;
  const activeSlots = slots.filter((slot) => slot.days.length || slot.start || slot.end);
  const filterCount = selectedInterests.length + activeSlots.length + Number(Boolean(keyword.trim()));
  const invalidSlots = slots.some((slot) => getSlotError(slot));

  const visibleInterestGroups = useMemo(() => {
    const query = interestQuery.trim().toLowerCase();
    return interestGroups
      .filter((group) => query || group.name === interestCategory)
      .map((group) => ({
        ...group,
        interests: group.interests.filter((interest) =>
          `${group.name} ${interest} ${interestSearchAliases[interest] ?? ""}`.toLowerCase().includes(query),
        ),
      }))
      .filter((group) => group.interests.length > 0);
  }, [interestQuery, interestCategory]);

  function resetFilters() {
    setKeyword("");
    setSelectedInterests([]);
    setInterestQuery("");
    setSlots([emptySlot(nextSlotId.current++)]);
  }

  function selectUniversity(campus: University) {
    setUniversity(campus);
    setUniversityQuery(campus.name);
    setSuggestionsOpen(false);
    resetFilters();
  }

  function toggleInterest(interest: string) {
    setSelectedInterests((current) => current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest]);
  }

  function updateSlot(id: number, patch: Partial<AvailabilitySlot>) {
    setSlots((current) => current.map((slot) => slot.id === id ? { ...slot, ...patch } : slot));
  }

  function toggleDay(slot: AvailabilitySlot, day: WeekDay) {
    updateSlot(slot.id, { days: slot.days.includes(day) ? slot.days.filter((item) => item !== day) : [...slot.days, day] });
  }

  function removeSlot(id: number) {
    const replacement = emptySlot(nextSlotId.current++);
    setSlots((current) => current.length === 1 ? [replacement] : current.filter((slot) => slot.id !== id));
  }

  function addSlot() {
    const newSlot = emptySlot(nextSlotId.current++);
    setSlots((current) => [...current, newSlot]);
  }

  return (
    <div className="club-catalog">
      <section className="catalog-search-bar" aria-label="Campus and club search">
        <div className="field">
          <label htmlFor="university">Your university</label>
          <div className="autocomplete" onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setSuggestionsOpen(false);
          }}>
            <input
              id="university"
              className="text-input"
              placeholder="Search your university…"
              autoComplete="off"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={showSuggestions}
              aria-controls="university-options"
              aria-activedescendant={showSuggestions && universityResults.length ? `university-option-${highlightedUniversity}` : undefined}
              value={universityQuery}
              onFocus={() => setSuggestionsOpen(true)}
              onChange={(event) => {
                setUniversityQuery(event.target.value);
                setUniversity(null);
                setSuggestionsOpen(true);
                setHighlightedUniversity(0);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") setSuggestionsOpen(false);
                if (!showSuggestions || !universityResults.length) return;
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                  event.preventDefault();
                  setHighlightedUniversity((index) => (index + (event.key === "ArrowDown" ? 1 : -1) + universityResults.length) % universityResults.length);
                }
                if (event.key === "Enter") {
                  event.preventDefault();
                  selectUniversity(universityResults[highlightedUniversity]);
                }
              }}
            />
            {university && <span className="university-status" aria-label="University selected">✓</span>}
            {showSuggestions && (
              <div className="suggestions visible" id="university-options" role="listbox" aria-label="Universities">
                {universityResults.length ? universityResults.map((campus, index) => (
                  <button type="button" role="option" aria-selected={index === highlightedUniversity} className="suggestion" id={`university-option-${index}`} key={campus.university_id} onClick={() => selectUniversity(campus)}>
                    <span><strong>{campus.name}</strong><small>{campus.domain}</small></span><span aria-hidden="true">→</span>
                  </button>
                )) : <div className="no-results" role="status">No demo campus matches. Try San Diego, UCLA, or Stanford.</div>}
              </div>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="club-search">Search for a specific club</label>
          <input id="club-search" type="search" className="text-input" placeholder="Club name, activity, or keyword…" value={keyword} disabled={!university} onChange={(event) => setKeyword(event.target.value)} />
        </div>
      </section>

      <div className="catalog-utility-row">

      </div>

      <div className="catalog-layout">
        <div>
          <button type="button" className="secondary-button catalog-filter-toggle" aria-expanded={filtersOpen} aria-controls="catalog-filters" onClick={() => setFiltersOpen(!filtersOpen)}>Filters{filterCount ? ` (${filterCount})` : ""} <span aria-hidden="true">{filtersOpen ? "−" : "+"}</span></button>
          <aside id="catalog-filters" className="catalog-sidebar" data-expanded={filtersOpen} aria-label="Filter clubs">
            <div className="field-header catalog-filter-heading"><h2>Filters</h2><button type="button" className="catalog-text-button" onClick={resetFilters} disabled={!filterCount}>Reset all</button></div>
            <fieldset className="catalog-filter-fields" disabled={!university}>
              <legend className="sr-only">Club preferences</legend>
              <section className="catalog-filter-section" aria-labelledby="interests-title">
                <h3 id="interests-title">What are you interested in?</h3>
                <p className="helper-text">Choose one or more interests from any category.</p>
                <label className="sr-only" htmlFor="interest-search">Search interests</label>
                <input id="interest-search" type="search" className="text-input" placeholder="Try coding, hiking, volunteering…" value={interestQuery} onChange={(event) => setInterestQuery(event.target.value)} />
                {selectedInterests.length > 0 && <div className="interest-selection">
                  <div className="field-header"><span className="helper-text">{selectedInterests.length} selected</span><button type="button" className="catalog-text-button" onClick={() => setSelectedInterests([])}>Clear</button></div>
                  <div className="chip-row">{selectedInterests.map((interest) => <button type="button" className="selected-tag" aria-label={`Remove ${interest} filter`} key={interest} onClick={() => toggleInterest(interest)}>{interest} <span aria-hidden="true">×</span></button>)}</div>
                </div>}
                <div className="interest-category-list" role="group" aria-label="Interest categories">
                  {interestGroups.map((group) => <button type="button" className="interest-category-button" aria-pressed={!interestQuery.trim() && interestCategory === group.name} key={group.name} onClick={() => { setInterestCategory(group.name); setInterestQuery(""); }}>{group.name}</button>)}
                </div>
                <div className="catalog-interest-options">
                  {visibleInterestGroups.map((group) => <fieldset className="catalog-interest-group" key={group.name}>
                    <legend>{group.name}</legend>
                    <div className="chip-row">{group.interests.map((interest) => <button type="button" className={`choice-chip ${selectedInterests.includes(interest) ? "selected" : ""}`} aria-pressed={selectedInterests.includes(interest)} key={interest} onClick={() => toggleInterest(interest)}>{selectedInterests.includes(interest) && <span aria-hidden="true">✓ </span>}{interest}</button>)}</div>
                  </fieldset>)}
                  {!visibleInterestGroups.length && <p className="helper-text" role="status">No interests match. Try another term or use the club search above.</p>}
                </div>
              </section>

              <section className="catalog-filter-section" aria-labelledby="availability-title">
                <h3 id="availability-title">When are you free?</h3>
                <p className="helper-text">Choose your preferred days and time ranges. Add another slot for a different part of your week.</p>
                {slots.map((slot, index) => {
                  const error = getSlotError(slot);
                  return <fieldset className="catalog-time-slot" key={slot.id}>
                    <legend className="sr-only">Time slot {index + 1}</legend>
                    <div className="catalog-slot-header">
                      <span className="catalog-slot-title" aria-hidden="true">Time slot {index + 1}</span>
                      <button type="button" className="catalog-slot-delete" aria-label={`Remove time slot ${index + 1}`} title={`Remove time slot ${index + 1}`} onClick={() => removeSlot(slot.id)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                          <path d="M3 6h18M9 6V4h6v2M5 6l1 14h12l1-14M10 10v6M14 10v6" />
                        </svg>
                      </button>
                    </div>
                    <span className="sr-only" id={`slot-${slot.id}-days`}>Preferred days</span>
                    <div className="catalog-days" role="group" aria-labelledby={`slot-${slot.id}-days`}>
                      {weekDays.map((day) => <button type="button" className={`day-choice ${slot.days.includes(day) ? "selected" : ""}`} aria-pressed={slot.days.includes(day)} aria-label={`${day}, time slot ${index + 1}`} key={day} onClick={() => toggleDay(slot, day)}>{day.slice(0, 3)}</button>)}
                    </div>
                    <div className="catalog-time-range">
                      <div className="field"><label htmlFor={`start-${slot.id}`}>From</label><input type="time" id={`start-${slot.id}`} className="text-input" value={slot.start} aria-invalid={Boolean(error)} aria-describedby={error ? `slot-error-${slot.id}` : undefined} onChange={(event) => updateSlot(slot.id, { start: event.target.value })} /></div>
                      <div className="field"><label htmlFor={`end-${slot.id}`}>To</label><input type="time" id={`end-${slot.id}`} className="text-input" value={slot.end} aria-invalid={Boolean(error)} aria-describedby={error ? `slot-error-${slot.id}` : undefined} onChange={(event) => updateSlot(slot.id, { end: event.target.value })} /></div>
                    </div>
                    {error && <p className="catalog-error" id={`slot-error-${slot.id}`} role="status">{error}</p>}
                  </fieldset>;
                })}
                <button type="button" className="secondary-button catalog-add-slot" onClick={addSlot}>+ Add another time slot</button>
              </section>
            </fieldset>
          </aside>
        </div>

        <section className="catalog-results" aria-labelledby="catalog-results-title">
          <div className="catalog-results-header">
            <div><h2 id="catalog-results-title">Club results</h2><p>{university ? university.name : "Select your university to set up your preferences."}</p></div>
          </div>
          {university && filterCount > 0 && <div className="catalog-active-filters" aria-label="Selected preferences">
            {keyword.trim() && <button type="button" className="selected-tag" aria-label="Clear club search" onClick={() => setKeyword("")}>Search: {keyword} <span aria-hidden="true">×</span></button>}
            {selectedInterests.map((interest) => <button type="button" className="selected-tag" aria-label={`Clear ${interest} preference`} key={interest} onClick={() => toggleInterest(interest)}>{interest} <span aria-hidden="true">×</span></button>)}
            {activeSlots.map((slot) => <button type="button" className="selected-tag" key={slot.id} onClick={() => removeSlot(slot.id)} aria-label={`Clear availability slot ${slots.indexOf(slot) + 1}`}>{slot.days.length ? slot.days.map((day) => day.slice(0, 3)).join(", ") : "Any day"}{slot.start && slot.end ? ` · ${formatTime(slot.start)}–${formatTime(slot.end)}` : ""}{getSlotError(slot) ? " · Incomplete" : ""} <span aria-hidden="true">×</span></button>)}
          </div>}
          {invalidSlots && <p className="catalog-error">Complete or correct the highlighted time slots.</p>}
          <div className="catalog-empty">
            <span className="catalog-empty-symbol" aria-hidden="true">⌕</span>
            <h3>Club listings will appear here.</h3>
            <p>For now, you can choose a university and set your preferences. Searching and matching clubs will be added later.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
