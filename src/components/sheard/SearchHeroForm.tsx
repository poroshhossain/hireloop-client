"use client";

import { MapPin, Search } from "lucide-react"
import { useState } from "react";
const trendingPositions = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

const SearchHeroForm = () => {
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");
    return (
        <>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="mx-auto mt-8 flex max-w-2xl items-center gap-1 rounded-2xl border border-border-color/30 bg-dark-secoundary/90 p-2 shadow-xl backdrop-blur-md transition-colors focus-within:border-primary-color/60 animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
                {/* Job Search */}
                <label className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-light/5">
                    <Search className="size-4 shrink-0 text-light/50" />

                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Job title, skill or company"
                        className="w-full bg-transparent text-sm text-light outline-none placeholder:text-light/40"
                    />
                </label>

                <span
                    aria-hidden="true"
                    className="hidden h-6 w-px bg-border-color/30 sm:block"
                />

                {/* Location Search */}
                <label className="hidden min-w-0 flex-1 items-center gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-light/5 sm:flex">
                    <MapPin className="size-4 shrink-0 text-light/50" />

                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location or Remote"
                        className="w-full bg-transparent text-sm text-light outline-none placeholder:text-light/40"
                    />
                </label>

                {/* Search Button */}
                <button
                    type="submit"
                    aria-label="Search jobs"
                    className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-color text-light shadow-lg transition-all hover:brightness-110 active:translate-y-px"
                >
                    <Search className="size-4.5" />
                </button>
            </form>
            {/* Trending Positions */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="mr-1 text-light/50">
                    Trending Position
                </span>

                {trendingPositions.map((position) => (
                    <button
                        key={position}
                        type="button"
                        onClick={() => setQuery(position)}
                        className="rounded-full border border-border-color/30 bg-light/5 px-3 py-1.5 text-light/80 transition-colors hover:border-primary-color/60 hover:bg-primary-color/10 hover:text-light"
                    >
                        {position}
                    </button>
                ))}
            </div>
        </>
    )
}
export default SearchHeroForm