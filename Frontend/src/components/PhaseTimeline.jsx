import { useState } from "react";

export default function PhaseTimeline({ phases, onSelect }) {
    const [active, setActive] = useState(0);

    const handleSelect = (index) => {
        setActive(index);
        onSelect?.(index);
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center mb-5">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">
                    Phase Overview
                </h3>
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-between relative overflow-x-auto pb-4 pt-2">
                {phases.map((p, i) => (
                    <div
                        key={i}
                        className="relative flex flex-col items-center flex-shrink-0 mx-2 first:ml-0 last:mr-0 min-w-0"
                    >
                        {/* Step Circle */}
                        <button
                            onClick={() => handleSelect(i)}
                            className={`w-12 h-12 rounded-full border-4 transition-all z-10 ${active === i
                                    ? "bg-cyan-500 border-cyan-400 shadow-lg shadow-cyan-500/40"
                                    : "bg-slate-700 border-slate-600 hover:border-slate-500 w-11 h-11"
                                }`}
                        >
                            <span className="text-white font-bold text-sm">
                                {i + 1}
                            </span>
                        </button>
                        {/* Label */}
                        <div
                            className={`mt-3 text-center text-sm font-medium transition ${active === i
                                    ? "text-cyan-400"
                                    : "text-slate-400"
                                }`}
                        >
                            {p.name}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
