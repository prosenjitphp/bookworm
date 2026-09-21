"use client";

import React from "react";

interface BookIllustrationBackgroundProps {
  children: React.ReactNode;
}

export default function BookIllustrationBackground({
  children,
}: BookIllustrationBackgroundProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0d3349] flex items-center justify-center p-4">
      {/* Background decorative illustrations */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Subtle radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d3349] via-[#092535] to-[#051722] opacity-90" />

        {/* Floating Book 1 - Top Left (Orange) */}
        <div
          className="absolute top-[8%] left-[5%] transform -rotate-12 opacity-40 hover:opacity-70 transition-opacity"
          aria-hidden="true"
        >
          <div className="w-28 h-36 bg-orange-500 rounded-r-md border-l-8 border-orange-700 shadow-2xl relative flex items-center justify-center">
            <div className="w-16 h-20 border border-orange-300/40 rounded flex flex-col justify-center items-center gap-1">
              <div className="w-8 h-1 bg-orange-200/60 rounded" />
              <div className="w-12 h-1 bg-orange-200/40 rounded" />
              <div className="w-6 h-1 bg-orange-200/30 rounded" />
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-orange-300/30" />
          </div>
        </div>

        {/* Floating Book 2 - Top Right (Amber / Yellow) */}
        <div
          className="absolute top-[12%] right-[8%] transform rotate-15 opacity-40 hover:opacity-70 transition-opacity"
          aria-hidden="true"
        >
          <div className="w-32 h-40 bg-amber-500 rounded-l-md border-r-8 border-amber-700 shadow-2xl relative flex items-center justify-center">
            <div className="w-20 h-24 border border-amber-300/40 rounded flex flex-col justify-center items-center gap-1.5">
              <div className="w-10 h-1 bg-amber-100/60 rounded" />
              <div className="w-14 h-1 bg-amber-100/40 rounded" />
            </div>
          </div>
        </div>

        {/* Floating Book 3 - Bottom Left (Teal / Cyan) */}
        <div
          className="absolute bottom-[10%] left-[8%] transform rotate-6 opacity-40 hover:opacity-70 transition-opacity"
          aria-hidden="true"
        >
          <div className="w-36 h-44 bg-teal-600 rounded-r-md border-l-8 border-teal-800 shadow-2xl relative flex items-center justify-center">
            <div className="w-20 h-28 border border-teal-300/40 rounded flex flex-col justify-center items-center gap-1.5">
              <div className="w-12 h-1 bg-teal-100/60 rounded" />
              <div className="w-16 h-1 bg-teal-100/40 rounded" />
              <div className="w-8 h-1 bg-teal-100/30 rounded" />
            </div>
          </div>
        </div>

        {/* Floating Book 4 - Bottom Right (Brown / Rust) */}
        <div
          className="absolute bottom-[15%] right-[6%] transform -rotate-12 opacity-40 hover:opacity-70 transition-opacity"
          aria-hidden="true"
        >
          <div className="w-28 h-36 bg-amber-800 rounded-l-md border-r-8 border-amber-950 shadow-2xl relative flex items-center justify-center">
            <div className="w-16 h-20 border border-amber-400/40 rounded flex flex-col justify-center items-center gap-1">
              <div className="w-8 h-1 bg-amber-200/60 rounded" />
              <div className="w-10 h-1 bg-amber-200/40 rounded" />
            </div>
          </div>
        </div>

        {/* Floating Book 5 - Mid Left Edge (Indigo) */}
        <div
          className="absolute top-[48%] left-[-20px] transform -rotate-45 opacity-25 hidden md:block"
          aria-hidden="true"
        >
          <div className="w-24 h-32 bg-indigo-700 rounded-r-md border-l-6 border-indigo-900 shadow-xl" />
        </div>

        {/* Floating Book 6 - Mid Right Edge (Rose) */}
        <div
          className="absolute top-[52%] right-[-15px] transform rotate-45 opacity-25 hidden md:block"
          aria-hidden="true"
        >
          <div className="w-24 h-32 bg-rose-700 rounded-l-md border-r-6 border-rose-900 shadow-xl" />
        </div>

        {/* Diamond Geometric Shapes (Amber/Gold) */}
        <div
          className="absolute top-[20%] left-[25%] w-4 h-4 bg-amber-400 rotate-45 opacity-60 shadow-lg shadow-amber-400/30"
          aria-hidden="true"
        />
        <div
          className="absolute top-[35%] right-[22%] w-3 h-3 bg-amber-300 rotate-45 opacity-50 shadow-md shadow-amber-300/30"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[28%] left-[20%] w-3.5 h-3.5 bg-amber-400 rotate-45 opacity-60 shadow-md shadow-amber-400/30"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[22%] right-[28%] w-4 h-4 bg-amber-400 rotate-45 opacity-55 shadow-lg shadow-amber-400/30"
          aria-hidden="true"
        />
        <div
          className="absolute top-[8%] left-[60%] w-2.5 h-2.5 bg-amber-200 rotate-45 opacity-40"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[8%] right-[50%] w-3 h-3 bg-amber-300 rotate-45 opacity-50"
          aria-hidden="true"
        />

        {/* Decorative Wave / Squiggle Lines */}
        <div
          className="absolute top-[28%] left-[12%] w-32 h-6 border-b-2 border-amber-400/30 rounded-full rotate-[-8deg]"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[35%] right-[14%] w-36 h-6 border-b-2 border-amber-400/30 rounded-full rotate-[12deg]"
          aria-hidden="true"
        />
        <div
          className="absolute top-[75%] left-[30%] w-24 h-4 border-b-2 border-teal-300/20 rounded-full rotate-[-4deg]"
          aria-hidden="true"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
