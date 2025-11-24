"use client";

import { useState, FormEvent } from "react";

type Listing = {
  id: number;
  title: string;
  tubeType: string;
  condition: string;
  location: string;
  description: string;
  email: string;
  createdAt: string;
};

const initialListings: Listing[] = [
  {
    id: 1,
    title: "EL34 Röhrenpaar, gematcht",
    tubeType: "EL34",
    condition: "gebraucht, getestet",
    location: "Berlin",
    description:
      "Gematchtes Paar EL34, noch ca. 80% Emission. Suche im Tausch 6L6GC oder verkaufe.",
    email: "example1@example.com",
    createdAt: new Date().toLocaleDateString("de-DE"),
  },
  {
    id: 2,
    title: "Fender Röhrenamp 50W",
    tubeType: "6L6",
    condition: "gebraucht",
    location: "Hamburg",
    description:
      "50W Röhrencombo, super Clean-Sound. Mit frischen 6L6. Tausch gegen kleineren Amp möglich.",
    email: "example2@example.com",
    createdAt: new Date().toLocaleDateString("de-DE"),
  },
];

export default function HomePage() {
  const [listings, setListings] = useState<Listing[]>(initialListings);

  const [title, setTitle] = useState("");
  const [tubeType, setTubeType] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [filterTube, setFilterTube] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !tubeType || !location || !email) {
      alert("Bitte mindestens Titel, Röhrentyp, Ort und E-Mail ausfüllen.");
      return;
    }

    const newListing: Listing = {
      id: Date.now(),
      title,
      tubeType,
      condition: condition || "nicht angegeben",
      location,
      description,
      email,
      createdAt: new Date().toLocaleDateString("de-DE"),
    };

    setListings((prev) => [newListing, ...prev]);

    // Formular leeren
    setTitle("");
    setTubeType("");
    setCondition("");
    setLocation("");
    setDescription("");
    setEmail("");
  };

  const filteredListings = listings.filter((l) => {
    const matchesTube =
      !filterTube ||
      l.tubeType.toLowerCase().includes(filterTube.toLowerCase());
    const searchable =
      (l.title + l.description + l.location + l.tubeType).toLowerCase();
    const matchesSearch = !search || searchable.includes(search.toLowerCase());
    return matchesTube && matchesSearch;
  });

  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Röhrenverstärker Tauschbörse
          </h1>
          <p className="text-sm text-slate-300">
            Angebote und Gesuche für Röhren & Amps
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
        {/* linke Spalte: Inserate */}
        <section>
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
            <input
              type="text"
              placeholder="Suche nach Amp, Röhrentyp, Ort..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-400"
            />
            <input
              type="text"
              placeholder="Filter nach Röhrentyp (z.B. EL34)"
              value={filterTube}
              onChange={(e) => setFilterTube(e.target.value)}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-400"
            />
          </div>

          {filteredListings.length === 0 ? (
            <p className="text-sm text-slate-300">
              Keine Inserate gefunden. Erstelle das erste Angebot!
            </p>
          ) : (
            <ul className="space-y-4">
              {filteredListings.map((listing) => (
                <li
                  key={listing.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {listing.title}
                      </h2>
                      <p className="text-xs text-slate-400">
                        Eingestellt am {listing.createdAt}
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1 text-xs">
                      {listing.tubeType}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-300">
                    <span className="rounded-full bg-slate-800 px-2 py-1">
                      Zustand: {listing.condition}
                    </span>
                    <span className="rounded-full bg-slate-800 px-2 py-1">
                      Ort: {listing.location}
                    </span>
                  </div>

                  {listing.description && (
                    <p className="mt-3 text-sm text-slate-100 whitespace-pre-line">
                      {listing.description}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    <a
                      href={`mailto:${listing.email}?subject=${encodeURIComponent(
                        "Anfrage zu: " + listing.title
                      )}`}
                      className="text-sm font-medium text-emerald-400 hover:underline"
                    >
                      Kontakt aufnehmen
                    </a>
                    <span className="text-xs text-slate-400">
                      Kontakt: {listing.email}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* rechte Spalte: Formular */}
        <aside className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">
            Neues Angebot / Gesuch
          </h2>
          <p className="mb-4 text-xs text-slate-300">
            Trage hier dein Röhren- oder Amp-Angebot ein. Interessenten können
            dich per E-Mail kontaktieren.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            <div>
              <label className="block mb-1 text-xs text-slate-300">
                Titel *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-emerald-400"
                placeholder="z.B. Marshall 50W Topteil mit EL34"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs text-slate-300">
                Röhrentyp(e) *
              </label>
              <input
                type="text"
                value={tubeType}
                onChange={(e) => setTubeType(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-emerald-400"
                placeholder="z.B. EL34, 12AX7"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs text-slate-300">
                Zustand
              </label>
              <input
                type="text"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-emerald-400"
                placeholder="z.B. neuwertig, gebraucht, NOS"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs text-slate-300">
                Ort / PLZ *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-emerald-400"
                placeholder="z.B. München, 80331"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs text-slate-300">
                Beschreibung
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-emerald-400"
                rows={4}
                placeholder="Details, gesuchter Tausch, Versand, Preisvorstellung..."
              />
            </div>

            <div>
              <label className="block mb-1 text-xs text-slate-300">
                Deine E-Mail *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-emerald-400"
                placeholder="du@example.com"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              Inserat veröffentlichen (lokal)
            </button>

            <p className="text-[11px] text-slate-400 mt-1">
              Hinweis: In dieser einfachen Version werden die Inserate nur im
              Browser gespeichert (nicht in einer Datenbank). Für eine echte
              Live-Tauschbörse solltest du später eine Datenbank (z.B. Supabase,
              PlanetScale, PostgreSQL etc.) anbinden.
            </p>
          </form>
        </aside>
      </div>

      <footer className="border-t border-slate-800 bg-slate-900/80 mt-4">
        <div className="mx-auto max-w-5xl px-4 py-3 text-xs text-slate-400 flex flex-col md:flex-row md:items-center md:justify-between gap-1">
          <span>Röhrenverstärker Tauschbörse – Demo</span>
          <span>Erstellt mit Next.js &amp; Vercel</span>
        </div>
      </footer>
    </main>
  );
}

